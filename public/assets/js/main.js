import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc';

const supabase = createClient(supabaseUrl, supabaseKey);

let allProducts = [];
let cart = [];
let currentAuthMode = 'login'; // 'login' or 'signup'

// Fallback Mock Products if database is empty
const mockProducts = [
    { id: 101, name: 'Ethiopia Yirgacheffe', price: 65, category: 'beans', description: 'Notes of jasmine, bergamot, and floral citrus.', image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600' },
    { id: 102, name: 'Colombia Huila Roast', price: 60, category: 'beans', description: 'Rich caramel, red apple, and milk chocolate finish.', image_url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=600' },
    { id: 103, name: 'Signature Drip Box (10 Packs)', price: 45, category: 'drip', description: 'Convenient single-serve pour-over filter bags.', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600' },
    { id: 104, name: 'Dark Roast Drip Box', price: 45, category: 'drip', description: 'Deep smoky cocoa notes in convenient drip pouches.', image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
    { id: 105, name: 'Gooseneck Pour-Over Kettle', price: 180, category: 'essentials', description: 'Precision flow spout for perfectly balanced extraction.', image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600' },
    { id: 106, name: 'Manual Coffee Grinder', price: 140, category: 'essentials', description: 'Stainless steel burr grinder with adjustable settings.', image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&q=80&w=600' }
];

// 1. Fetch Products from Supabase
async function loadProducts() {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error || !data || data.length === 0) {
            allProducts = mockProducts;
        } else {
            allProducts = data;
        }
    } catch (err) {
        allProducts = mockProducts;
    }
}

// 2. Filter Category
window.filterCategory = function(category) {
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById('categories-section').classList.remove('hidden');
    
    const productsSection = document.getElementById('products-section');
    const categoryTitle = document.getElementById('category-title');
    const grid = document.getElementById('products-grid');

    productsSection.classList.remove('hidden');
    productsSection.scrollIntoView({ behavior: 'smooth' });

    if (category === 'beans') {
        categoryTitle.innerText = 'Coffee Beans';
    } else if (category === 'drip') {
        categoryTitle.innerText = 'Drip Coffee';
    } else {
        categoryTitle.innerText = 'Coffee Essentials';
    }

    const filtered = allProducts.filter(p => p.category && p.category.toLowerCase() === category);
    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center py-12 text-gray-500 font-medium">No items found in this category.</p>`;
        return;
    }

    filtered.forEach(product => {
        const fallbackImg = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600';
        const card = `
            <div class="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                    <img src="${product.image_url || fallbackImg}" 
                         alt="${product.name}" 
                         class="w-full h-52 object-cover border-b-2 border-black">
                    <div class="p-6">
                        <h3 class="text-xl font-black mb-2 text-black">${product.name}</h3>
                        <p class="text-gray-700 text-sm mb-4">${product.description || ''}</p>
                    </div>
                </div>
                <div class="p-6 pt-0 flex items-center justify-between">
                    <span class="text-xl font-black text-black">${product.price} QAR</span>
                    <button onclick="addToCart(${product.id})" class="bg-brandorange text-white px-4 py-2 rounded-xl font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:brightness-105 active:translate-x-[1px] active:translate-y-[1px] transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
};

// 3. Cart Management
window.addToCart = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
};

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    const cartList = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-center py-12 text-gray-500 font-medium">Your cart is currently empty.</p>`;
        summary.classList.add('hidden');
        return;
    }

    summary.classList.remove('hidden');
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartList.innerHTML += `
            <div class="bg-white border-2 border-black rounded-2xl p-4 flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div class="flex items-center gap-4">
                    <img src="${item.image_url || 'https://via.placeholder.com/64'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-black">
                    <div>
                        <h4 class="font-black text-black">${item.name}</h4>
                        <p class="text-sm font-bold text-gray-600">${item.price} QAR x ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-black text-black mr-2">${itemTotal} QAR</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 font-bold px-2">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById('cart-total-price').innerText = `${totalPrice} QAR`;
}

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

window.showCart = function() {
    document.getElementById('categories-section').classList.add('hidden');
    document.getElementById('products-section').classList.add('hidden');
    document.getElementById('cart-section').classList.remove('hidden');
    updateCartUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.hideCart = function() {
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById('categories-section').classList.remove('hidden');
};

window.resetCategory = function() {
    document.getElementById('products-section').classList.add('hidden');
    document.getElementById('categories-section').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 4. Slide-over Navigation Menu Functions
window.toggleMenu = function() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');

    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        menu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }
};

window.toggleLanguage = function() {
    const currentLang = document.documentElement.lang;
    if (currentLang === 'ar') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        alert('Switched to English');
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        alert('تم التحويل إلى اللغة العربية');
    }
};

// 5. Authentication Modal & Logic
window.openAuthModal = function(mode = 'login') {
    currentAuthMode = mode;
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('auth-modal-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const nameGroup = document.getElementById('name-field-group');

    if (mode === 'signup') {
        title.innerText = 'Create Account';
        submitBtn.innerText = 'Sign Up';
        nameGroup.classList.remove('hidden');
    } else {
        title.innerText = 'Log In';
        submitBtn.innerText = 'Log In';
        nameGroup.classList.add('hidden');
    }

    modal.classList.remove('hidden');
};

window.closeAuthModal = function() {
    document.getElementById('auth-modal').classList.add('hidden');
};

window.handleAuthSubmit = async function(event) {
    event.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const fullName = document.getElementById('auth-name').value;

    if (currentAuthMode === 'signup') {
        await signUpUser(email, password, fullName);
    } else {
        await logInUser(email, password);
    }
};

window.signUpUser = async function(email, password, fullName, role = 'buyer') {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                role: role
            }
        }
    });

    if (error) {
        alert('Sign-up error: ' + error.message);
        return;
    }
    alert('Account created successfully!');
    closeAuthModal();
};

window.logInUser = async function(email, password) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (authError) {
        alert('Login error: ' + authError.message);
        return;
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', authData.user.id)
        .single();

    if (profileError) {
        console.error('Error fetching profile:', profileError);
        closeAuthModal();
        return;
    }

    alert(`Welcome back, ${profile.full_name || 'User'}!`);
    closeAuthModal();
    routeUserByRole(profile.role);
};

function routeUserByRole(role) {
    if (role === 'admin') {
        window.location.href = '/admin-dashboard.html';
    } else if (role === 'delivery') {
        window.location.href = '/delivery-orders.html';
    } else {
        window.location.href = '/index.html';
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
