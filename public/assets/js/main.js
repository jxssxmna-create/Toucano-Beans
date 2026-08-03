// public/assets/js/main.js

// 1. Import official Supabase module directly from CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2. Base Supabase URL (NO trailing slash, NO /rest/v1/)
const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';

// 3. Your Supabase anon/publishable key
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc';

// 4. Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// 5. Fetch and render products
async function fetchAndDisplayProducts() {
    const grid = document.getElementById('products-grid');

    if (!grid) {
        console.error('Target element #products-grid was not found in the DOM.');
        return;
    }

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        grid.innerHTML = '';

        if (!products || products.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500">لا توجد منتجات حالياً.</p>';
            return;
        }

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
        console.error('Error fetching products:', error);
        grid.innerHTML = `<p class="text-center col-span-full text-red-500">حدث خطأ أثناء تحميل المنتجات: ${error.message}</p>`;
    }
}

window.addToCart = function(productId) {
    console.log(`Product ID ${productId} added to cart.`);
};

document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
