// Cart Alert
window.showCart = function() {
    alert('Cart is currently empty!');
};

// Drawer Toggle
window.toggleMenu = function() {
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

// Submenu Accordion Toggle
window.toggleSubmenu = function(id) {
    const el = document.getElementById(id);
    const arrow = document.getElementById(id === 'categories-submenu' ? 'arrow-categories' : 'arrow-language');
    if (el) {
        el.classList.toggle('hidden');
        if (arrow) arrow.classList.toggle('rotate-180');
    }
};

// Page Navigation
window.navigateTo = function(page) {
    document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));

    const subheader = document.getElementById('subpage-header');
    if (subheader) {
        if (page === 'home') {
            subheader.classList.add('hidden');
        } else {
            subheader.classList.remove('hidden');
        }
    }

    // Close menu drawer if open
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && !drawer.classList.contains('translate-x-full')) {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    if (page === 'home') {
        document.getElementById('page-home').classList.remove('hidden');
    } else if (['coffee-beans', 'drip-coffee', 'essentials'].includes(page)) {
        document.getElementById('page-category').classList.remove('hidden');
        document.getElementById('category-title').innerText = page.replace('-', ' ');
        loadCategoryProducts(page);
    } else if (page === 'story') {
        document.getElementById('page-story').classList.remove('hidden');
    } else if (page === 'contact') {
        document.getElementById('page-contact').classList.remove('hidden');
    } else if (page === 'account') {
        document.getElementById('page-account').classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Language Switcher
window.setLanguage = function(lang) {
    document.documentElement.lang = lang;
    const t = {
        en: {
            menuHeading: "Menu", main: "Main", story: "Our Story", categories: "Categories",
            beans: "Coffee Beans", drip: "Drip Coffee", essentials: "Coffee Essentials",
            language: "Language", contact: "Contact Us", account: "Account"
        },
        ar: {
            menuHeading: "القائمة", main: "الرئيسية", story: "قصتنا", categories: "الفئات",
            beans: "حبوب القهوة", drip: "القهوة المقطرة", essentials: "مستلزمات القهوة",
            language: "اللغة", contact: "اتصل بنا", account: "الحساب"
        }
    }[lang];

    document.getElementById('menu-heading').innerText = t.menuHeading;
    document.getElementById('nav-main').innerText = t.main;
    document.getElementById('nav-story').innerText = t.story;
    document.getElementById('nav-categories').innerText = t.categories;
    document.getElementById('nav-beans').innerText = t.beans;
    document.getElementById('nav-drip').innerText = t.drip;
    document.getElementById('nav-essentials').innerText = t.essentials;
    document.getElementById('nav-language').innerText = t.language;
    document.getElementById('nav-contact').innerText = t.contact;
    document.getElementById('nav-account').innerText = t.account;

    document.getElementById('lbl-beans').innerText = t.beans;
    document.getElementById('lbl-drip').innerText = t.drip;
    document.getElementById('lbl-essentials').innerText = t.essentials;

    window.toggleMenu();
};

function loadCategoryProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = `
        <div class="bg-white p-5 rounded-2xl shadow border border-slate-200 text-center">
            <div class="h-40 bg-orange-100/60 rounded-xl mb-4 flex items-center justify-center font-bold text-orange-900">
                ${category.replace('-', ' ').toUpperCase()}
            </div>
            <h3 class="font-bold text-slate-800 text-lg">Specialty ${category.replace('-', ' ')}</h3>
            <p class="text-brandorange font-bold mt-1 text-base">$18.00</p>
        </div>
    `;
}
