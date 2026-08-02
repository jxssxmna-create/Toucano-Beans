// public/assets/js/main.js

// Relative path navigation:
// - From 'public/assets/js/' 
// - Up 3 levels '../../../' reaches the root directory
// - Down into 'backend/config/supabaseClient.js'
import { supabase } from '../../../backend/config/supabaseClient.js';

async function fetchAndDisplayProducts() {
    const grid = document.getElementById('products-grid');

    if (!grid) {
        console.error('Target element #products-grid was not found in the HTML.');
        return;
    }

    try {
        // Query rows from the 'products' table in Supabase
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        // Clear loading state
        grid.innerHTML = '';

        if (!products || products.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500">لا توجد منتجات حالياً.</p>';
            return;
        }

        // Render each product card
        products.forEach(product => {
            const productCardHtml = `
                <div class="glass-card p-6 rounded-2xl flex flex-col justify-between border border-amber-900/10 shadow-sm hover:shadow-md transition">
                    <div>
                        <img src="${product.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'}" 
                             alt="${product.name}" 
                             class="w-full h-48 object-cover rounded-xl mb-4">
                        <h3 class="font-display text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description || 'محصود وعولج بعناية فائقة لضمان أفضل نكهة.'}</p>
                    </div>
                    <div class="flex items-center justify-between mt-4">
                        <span class="text-lg font-bold text-[color:var(--copper-700)]">${product.price} ر.س</span>
                        <button onclick="addToCart(${product.id})" class="btn-primary text-[color:var(--espresso-950)] px-4 py-2 rounded-xl text-sm font-bold">إضافة للسلة</button>
                    </div>
                </div>
            `;
            grid.innerHTML += productCardHtml;
        });

    } catch (error) {
        console.error('Error fetching products:', error.message);
        grid.innerHTML = `<p class="text-center col-span-full text-red-500">حدث خطأ أثناء تحميل المنتجات: ${error.message}</p>`;
    }
}

// Global cart placeholder function
window.addToCart = function(productId) {
    console.log(`Product ${productId} added to cart.`);
};

// Execute once DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
