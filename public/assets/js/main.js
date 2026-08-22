// Toggle Drawer
window.toggleMenu = function() {
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

// Toggle Inline Accordion Submenus (Categories & Language)
window.toggleSubmenu = function(id) {
    const el = document.getElementById(id);
    const arrow = document.getElementById(id === 'categories-submenu' ? 'arrow-categories' : 'arrow-language');
    if (el) {
        el.classList.toggle('hidden');
        if (arrow) arrow.classList.toggle('rotate-180');
    }
};

// Router
window.navigateTo = function(page) {
    document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));

    const subheader = document.getElementById('subpage-header');
    if (page === 'home') {
        subheader.classList.add('hidden');
    } else {
        subheader.classList.remove('hidden');
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

// Account Tab Switcher
window.switchAccountTab = function(mode) {
    const title = document.getElementById('account-page-title');
    const submitBtn = document.getElementById('account-submit-btn');
    const nameField = document.getElementById('signup-name-field');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    if (mode === 'signup') {
        title.innerText = document.documentElement.lang === 'ar' ? 'إنشاء حساب' : 'Sign Up';
        submitBtn.innerText = document.documentElement.lang === 'ar' ? 'إنشاء الحساب' : 'Create Account';
        nameField.classList.remove('hidden');
        tabSignup.className = 'flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center';
        tabLogin.className = 'flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center';
    } else {
        title.innerText = document.documentElement.lang === 'ar' ? 'تسجيل الدخول' : 'Log In';
        submitBtn.innerText = document.documentElement.lang === 'ar' ? 'تسجيل الدخول' : 'Log In';
        nameField.classList.add('hidden');
        tabLogin.className = 'flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center';
        tabSignup.className = 'flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center';
    }
};

// In-Place Language Switcher (Keeps Layout identical)
window.setLanguage = function(lang) {
    document.documentElement.lang = lang;

    const translations = {
        en: {
            menuHeading: "Menu",
            main: "Main",
            story: "Our Story",
            categories: "Categories",
            beans: "Coffee Beans",
            drip: "Drip Coffee",
            essentials: "Coffee Essentials",
            language: "Language",
            contact: "Contact Us",
            account: "Account",
            storyTitle: "Our Story",
            storyBody: "Toucano Beans brings you handcrafted coffee sourced responsibly from premium beans around the world. Our mission is to make exceptional specialty coffee accessible, simple, and enjoyable every single day.",
            contactTitle: "Contact Us",
            officialEmail: "Official Email",
            login: "Log In",
            signup: "Sign Up"
        },
        ar: {
            menuHeading: "القائمة",
            main: "الرئيسية",
            story: "قصتنا",
            categories: "الفئات",
            beans: "حبوب القهوة",
            drip: "القهوة المقطرة",
            essentials: "مستلزمات القهوة",
            language: "اللغة",
            contact: "اتصل بنا",
            account: "الحساب",
            storyTitle: "قصتنا",
            storyBody: "يقدم لك توكانو بينز قهوة مصنوعة يدويًا ومستوردة بمسؤولية من أجود حبوب القهوة حول العالم. مهمتنا هي جعل القهوة المختصة الممتازة سهلة وبسيطة وممتعة كل يوم.",
            contactTitle: "اتصل بنا",
            officialEmail: "البريد الإلكتروني الرسمي",
            login: "تسجيل الدخول",
            signup: "إنشاء حساب"
        }
    };

    const t = translations[lang];

    // Nav Drawer Labels
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

    // Home Page Card Labels
    document.getElementById('lbl-beans').innerText = t.beans;
    document.getElementById('lbl-drip').innerText = t.drip;
    document.getElementById('lbl-essentials').innerText = t.essentials;

    // Page Content Labels
    document.getElementById('story-title').innerText = t.storyTitle;
    document.getElementById('story-body').innerText = t.storyBody;
    document.getElementById('contact-title').innerText = t.contactTitle;
    document.getElementById('contact-email-lbl').innerText = t.officialEmail;
    document.getElementById('tab-login').innerText = t.login;
    document.getElementById('tab-signup').innerText = t.signup;

    // Close menu after selection
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
