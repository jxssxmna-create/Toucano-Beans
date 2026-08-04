import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc';

const supabase = createClient(supabaseUrl, supabaseKey);

let allProducts = [];
let cart = [];

async function loadProducts() {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        allProducts = data || [];
    } catch (err) {
        console.error('Failed to load products from Supabase:', err);
    }
}

// Filter Products by Category
window.filterCategory = function(category) {
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById('categories-section').classList.remove('hidden');
    
    const productsSection = document.getElementById('products-section');
    const categoryTitle = document.getElementById('category-title');
    const grid = document.getElementById('products-grid');

    productsSection.classList.remove('hidden');
    productsSection.scrollIntoView({ behavior: 'smooth' });

    categoryTitle.innerText = category === 'beans' ? 'Coffee Beans' : 'Coffee Essentials';

    const filtered = allProducts.filter(p => !p.category || p.category.toLowerCase() === category);
    grid.innerHTML = '';

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center py-12 text-gray-500 font-medium">No items found in this category.</p>`;
        return;
    }

    filtered.forEach(product => {
        const card = `
            <div class="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                    <img src="${product.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'}" 
                         alt="${product.name}" 
                         class="w-full h-52 object-cover border-b-2 border-black">
                    <div class="p-6">
                        <h3 class="text-xl font-black mb-2 text-black">${product.name}</h3>
                        <p class="text-gray-700 text-sm mb-4">${product.description || 'Premium grade roasted with care.'}</p>
                    </div>
                </div>
                <div class="p-6 pt-0 flex items-center justify-between">
                    <span class="text-xl font-black text-black">${product.price} QAR</span>
                    <button onclick="addToCart(${product.id})" class="bg-brandorange text-white px-4 py-2 rounded-xl font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
};

// Add Product to Cart
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

// Update Cart Badge and Render Cart Content
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
                    <img src="${item.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-black">
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

// Remove Item from Cart
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

// Toggle Cart View
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

document.addEventListener('DOMContentLoaded', loadProducts);
