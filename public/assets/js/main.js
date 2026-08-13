// Toggle Drawer Menu
window.toggleMenu = function() {
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

// Router Function to control pages & subpage branding header
window.navigateTo = function(page) {
    // Hide all main page views
    document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));

    // Handle Sub-page Header (Logo & Name visible on non-home pages)
    const subheader = document.getElementById('subpage-header');
    if (page === 'home') {
        subheader.classList.add('hidden');
    } else {
        subheader.classList.remove('hidden');
    }

    // Close slide-out drawer
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && !drawer.classList.contains('translate-x-full')) {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    // Navigate to target view
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
    } else if (page === 'contact') {
        document.getElementById('page-contact').classList.remove('hidden');
    } else if (page === 'account') {
        document.getElementById('page-account').classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Switch Log In / Sign Up tab on Account page
window.switchAccountTab = function(mode) {
    const title = document.getElementById('account-page-title');
    const submitBtn = document.getElementById('account-submit-btn');
    const nameField = document.getElementById('signup-name-field');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (mode === 'signup') {
        title.innerText = 'Sign Up';
        submitBtn.innerText = 'Create Account';
        nameField.classList.remove('hidden');

        tabSignup.className = 'flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center';
        tabLogin.className = 'flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center';
    } else {
        title.innerText = 'Log In';
        submitBtn.innerText = 'Log In';
        nameField.classList.add('hidden');

        tabLogin.className = 'flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center';
        tabSignup.className = 'flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center';
    }
};

// Sample product loader for category view
function loadCategoryProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div class="bg-white p-5 rounded-2xl shadow border border-slate-200 text-center">
            <div class="h-40 bg-orange-100/60 rounded-xl mb-4 flex items-center justify-center font-bold text-orange-900">
                ${category.replace('-', ' ').toUpperCase()} Sample
            </div>
            <h3 class="font-bold text-slate-800 text-lg">Specialty ${category.replace('-', ' ')}</h3>
            <p class="text-brandorange font-bold mt-1 text-base">$18.00</p>
        </div>
    `;
}

window.setLanguage = function(lang) {
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    alert('Language set to: ' + (lang === 'ar' ? 'العربية' : 'English'));
};
