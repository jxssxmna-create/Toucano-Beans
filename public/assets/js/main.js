import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAndDisplayProducts() {
    const grid = document.getElementById('products-grid');

    if (!grid) {
        console.error('Target container #products-grid not found.');
        return;
    }

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;

        grid.innerHTML = '';

        if (!products || products.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500">لا توجد منتجات حالياً.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = `
                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <img src="${product.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'}" 
                         alt="${product.name}" 
                         class="w-full h-48 object-cover rounded-xl mb-4">
                    <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description || 'محصود وعولج بعناية فائقة لضمان أفضل نكهة.'}</p>
                    <div class="flex items-center justify-between mt-4">
                        <span class="text-lg font-bold text-amber-900">${product.price} ر.س</span>
                        <button onclick="addToCart(${product.id})" class="bg-amber-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-800 transition">إضافة للسلة</button>
                    </div>
                </div>
            `;
            grid.innerHTML += productCard;
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        grid.innerHTML = `<p class="text-center col-span-full text-red-500">حدث خطأ أثناء تحميل المنتجات: ${error.message}</p>`;
    }
}

window.addToCart = function(productId) {
    console.log(`Product ${productId} added to cart.`);
};

document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
