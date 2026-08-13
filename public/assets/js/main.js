// Toggle Drawer Menu
window.toggleMenu = function() {
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

// Simple Navigation Router
window.navigateTo = function(page) {
    // Hide all pages
    document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));

    // Close menu if open
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && !drawer.classList.contains('translate-x-full')) {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    // Route handling
    if (page === 'home' || page === 'categories') {
        document.getElementById('page-home').classList.remove('hidden');
    } else if (['coffee-beans', 'drip-coffee', 'essentials'].includes(page)) {
        document.getElementById('page-category').classList.remove('hidden');
        document.getElementById('category-title').innerText = page.replace('-', ' ');
        loadCategoryProducts(page);
    } else if (page === 'story') {
        document.getElementById('page-story').classList.remove('hidden');
    } else if (page === 'language') {
        document.getElementById('page-language').classList.remove('hidden');
    } else if (page === 'account') {
        document.getElementById('page-account').classList.remove('hidden');
    }
};

// Placeholder category product loader
function loadCategoryProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    // Sample mock products per category
    grid.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow border border-slate-200 text-center">
            <div class="h-40 bg-amber-100 rounded-lg mb-3 flex items-center justify-center font-bold text-amber-800">
                ${category.toUpperCase()} Sample Item 1
            </div>
            <h3 class="font-bold text-slate-800">Premium ${category.replace('-', ' ')}</h3>
            <p class="text-brandorange font-bold mt-1">$15.00</p>
        </div>
    `;
}

window.setLanguage = function(lang) {
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    alert('Language set to: ' + lang.toUpperCase());
};
