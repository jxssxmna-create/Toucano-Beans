import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc';

const supabase = createClient(supabaseUrl, supabaseKey);

let allProducts = [];

async function loadProducts() {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        allProducts = data || [];
    } catch (err) {
        console.error('Failed to load products from Supabase:', err);
    }
}

window.filterCategory = function(category) {
    const productsSection = document.getElementById('products-section');
    const categoryTitle = document.getElementById('category-title');
    const grid = document.getElementById('products-grid');

    productsSection.classList.remove('hidden');
    
    // Smooth scroll down to products
    productsSection.scrollIntoView({ behavior: 'smooth' });

    if (category === 'beans') {
        categoryTitle.innerText = 'Coffee Beans';
    } else {
        categoryTitle.innerText = 'Coffee Essentials';
    }

    // Filter products (matches product category or displays all if no category column exists)
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
                    <button class="bg-brandorange text-white px-4 py-2 rounded-xl font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
};

window.resetCategory = function() {
    document.getElementById('products-section').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', loadProducts);
