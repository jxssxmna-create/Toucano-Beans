// public/assets/js/main.js
import { supabase } from '../../../backend/config/supabaseClient.js'; // أو الاتصال المباشر عبر السيرفر

// دالة جلب المنتجات وعرضها في الصفحة
async function fetchAndDisplayProducts() {
    try {
        // استعلام جلب المنتجات من جدول products في Supabase
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        const grid = document.getElementById('products-grid');
        grid.innerHTML = ''; // تفريغ رسالة التحميل

        if (products.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-full text-gray-500">لا توجد منتجات حالياً.</p>';
            return;
        }

        // بناء عناصر المنتجات وعرضها
        products.forEach(product => {
            const productCard = `
                glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                    <img src="${product.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'}" alt="${product.name}" class="w-full h-48 object-cover rounded-xl mb-4">
                    <h3 class="font-display text-xl font-bold mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description || 'محصود وعولج بعناية فائقة لضمان أفضل نكهة.'}</p>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-lg font-bold text-[color:var(--copper-700)]">${product.price} ر.س</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary text-[color:var(--espresso-950)] px-4 py-2 rounded-xl text-sm font-bold">إضافة للسلة</button>
                </div>
            `;
            grid.innerHTML += `<div class="${productCard}</div>`;
        });

    } catch (error) {
        console.error('خطأ في جلب المنتجات:', error.message);
        document.getElementById('products-grid').innerHTML = '<p class="text-center col-span-full text-red-500">حدث خطأ أثناء تحميل المنتجات.</p>';
    }
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
