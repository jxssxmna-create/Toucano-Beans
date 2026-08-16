// Global Cart Toggle Trigger
window.showCart = function() {
    alert("Cart is empty!");
};

// Toggle Drawer
window.toggleMenu = function() {
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        if (drawer.classList.contains('drawer-closed')) {
            drawer.classList.remove('drawer-closed');
            drawer.classList.add('drawer-open');
            overlay.classList.remove('hidden');
        } else {
            drawer.classList.remove('drawer-open');
            drawer.classList.add('drawer-closed');
            overlay.classList.add('hidden');
        }
    }
};

// Toggle Inline Accordion Submenus
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
        if (subheader) subheader.classList.add('hidden');
    } else {
        if (subheader) subheader.classList.remove('hidden');
    }

    // Close menu drawer if open
    const drawer = document.getElementById('side-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && drawer.classList.contains('drawer-open')) {
        drawer.classList.remove('drawer-open');
        drawer.classList.add('drawer-closed');
        if (overlay) overlay.classList.add('hidden');
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

// Language Switcher
window.setLanguage = function(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

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

    document.getElementById('story-title').innerText = t.storyTitle;
    document.getElementById('story-body').innerText = t.storyBody;
    document.getElementById('contact-title').innerText = t.contactTitle;
    document.getElementById('contact-email-lbl').innerText = t.officialEmail;
    document.getElementById('tab-login').innerText = t.login;
    document.getElementById('tab-signup').innerText = t.signup;

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
}            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span id="cart-count" class="absolute -top-1 -right-1 bg-brandorange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
        </button>

        <!-- Top Right: Menu Button -->
        <button id="menu-btn" onclick="toggleMenu()" class="pointer-events-auto p-3 text-slate-800 hover:text-brandorange transition focus:outline-none">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>

    <!-- Slide-out Navigation Drawer -->
    <div id="side-drawer" class="fixed inset-y-0 w-64 bg-[#fdf0de] border-l border-slate-300/60 shadow-2xl z-40 drawer-closed transition-all duration-300 ease-in-out">
        <div class="p-6 flex flex-col h-full justify-between overflow-y-auto">
            <div>
                <div class="flex items-center justify-between mb-8">
                    <h2 id="menu-heading" class="text-xl font-bold text-slate-800">Menu</h2>
                    <button onclick="toggleMenu()" class="text-slate-500 hover:text-slate-800 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Menu Accordion Nav -->
                <nav class="space-y-4">
                    <!-- Main -->
                    <a href="javascript:void(0);" onclick="navigateTo('home')" id="nav-main" class="block text-slate-700 hover:text-brandorange font-medium">Main</a>

                    <!-- Our Story -->
                    <a href="javascript:void(0);" onclick="navigateTo('story')" id="nav-story" class="block text-slate-700 hover:text-brandorange font-medium">Our Story</a>

                    <!-- Categories (Expandable Accordion) -->
                    <div>
                        <button onclick="toggleSubmenu('categories-submenu')" class="w-full flex items-center justify-between text-slate-700 hover:text-brandorange font-medium focus:outline-none">
                            <span id="nav-categories">Categories</span>
                            <svg id="arrow-categories" class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div id="categories-submenu" class="hidden pl-4 mt-2 space-y-2 border-l-2 border-brandorange/30">
                            <a href="javascript:void(0);" onclick="navigateTo('coffee-beans')" id="nav-beans" class="block text-sm text-slate-600 hover:text-brandorange">Coffee Beans</a>
                            <a href="javascript:void(0);" onclick="navigateTo('drip-coffee')" id="nav-drip" class="block text-sm text-slate-600 hover:text-brandorange">Drip Coffee</a>
                            <a href="javascript:void(0);" onclick="navigateTo('essentials')" id="nav-essentials" class="block text-sm text-slate-600 hover:text-brandorange">Coffee Essentials</a>
                        </div>
                    </div>

                    <!-- Language (Expandable Accordion) -->
                    <div>
                        <button onclick="toggleSubmenu('language-submenu')" class="w-full flex items-center justify-between text-slate-700 hover:text-brandorange font-medium focus:outline-none">
                            <span id="nav-language">Language</span>
                            <svg id="arrow-language" class="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div id="language-submenu" class="hidden pl-4 mt-2 space-y-2 border-l-2 border-brandorange/30">
                            <button onclick="setLanguage('en')" class="block w-full text-left text-sm text-slate-600 hover:text-brandorange">English</button>
                            <button onclick="setLanguage('ar')" class="block w-full text-left text-sm text-slate-600 hover:text-brandorange">العربية (Arabic)</button>
                        </div>
                    </div>

                    <!-- Contact Us -->
                    <a href="javascript:void(0);" onclick="navigateTo('contact')" id="nav-contact" class="block text-slate-700 hover:text-brandorange font-medium">Contact Us</a>

                    <!-- Account -->
                    <a href="javascript:void(0);" onclick="navigateTo('account')" id="nav-account" class="block text-slate-700 hover:text-brandorange font-medium">Account</a>
                </nav>
            </div>
        </div>
    </div>

    <!-- Overlay backdrop for Drawer -->
    <div id="drawer-overlay" onclick="toggleMenu()" class="fixed inset-0 bg-black/40 z-30 hidden"></div>

    <!-- Sub-page Shared Header -->
    <header id="subpage-header" class="hidden text-center pt-10 pb-4 cursor-pointer" onclick="navigateTo('home')">
        <img src="public/assets/logo.png" alt="Toucano Beans Logo" class="h-20 mx-auto mb-2 object-contain" onerror="this.style.display='none'">
        <h1 class="text-xl font-extrabold tracking-wider text-slate-900 uppercase">TOUCANO BEANS</h1>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-12">

        <!-- HOME PAGE -->
        <section id="page-home" class="page-view w-full max-w-4xl flex flex-col items-center">
            <div class="text-center mb-16 cursor-pointer" onclick="navigateTo('home')">
                <img src="public/assets/logo.png" alt="Toucano Beans Logo" class="h-44 sm:h-52 mx-auto mb-4 object-contain" onerror="this.style.display='none'">
                <h1 class="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">TOUCANO BEANS</h1>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 w-full max-w-3xl px-4 text-center">
                <!-- Coffee Beans -->
                <a href="javascript:void(0);" onclick="navigateTo('coffee-beans')" class="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                    <div class="mb-3 text-slate-800 group-hover:text-brandorange transition flex items-center justify-center">
                        <svg class="w-14 h-14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 8.5 9 10.2 11 10.8V11H13V10.8C15 10.2 16.5 8.5 16.5 6.5C16.5 4 14.5 2 12 2ZM11.5 4.2C11.8 5.6 12 7.1 11.8 8.6C11.8 8.7 11.7 8.8 11.6 8.8C11.5 8.8 11.4 8.7 11.4 8.6C11.2 7.1 11 5.6 11.5 4.2Z"/>
                            <path d="M6.5 13C4 13 2 15 2 17.5C2 19.5 3.5 21.2 5.5 21.8V22H7.5V21.8C9.5 21.2 11 19.5 11 17.5C11 15 9 13 6.5 13ZM6 15.2C6.3 16.6 6.5 18.1 6.3 19.6C6.3 19.7 6.2 19.8 6.1 19.8C6 19.8 5.9 19.7 5.9 19.6C5.7 18.1 5.5 16.6 6 15.2Z"/>
                            <path d="M17.5 13C15 13 13 15 13 17.5C13 19.5 14.5 21.2 16.5 21.8V22H18.5V21.8C20.5 21.2 22 19.5 22 17.5C22 15 20 13 17.5 13ZM17 15.2C17.3 16.6 17.5 18.1 17.3 19.6C17.3 19.7 17.2 19.8 17.1 19.8C17 19.8 16.9 19.7 16.9 19.6C16.7 18.1 16.5 16.6 17 15.2Z"/>
                        </svg>
                    </div>
                    <span id="lbl-beans" class="text-lg font-bold text-slate-800 group-hover:text-brandorange transition">Coffee Beans</span>
                </a>

                <!-- Drip Coffee -->
                <a href="javascript:void(0);" onclick="navigateTo('drip-coffee')" class="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                    <div class="mb-3 text-slate-800 group-hover:text-brandorange transition flex items-center justify-center">
                        <svg class="w-14 h-14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                    </div>
                    <span id="lbl-drip" class="text-lg font-bold text-slate-800 group-hover:text-brandorange transition">Drip Coffee</span>
                </a>

                <!-- Coffee Essentials -->
                <a href="javascript:void(0);" onclick="navigateTo('essentials')" class="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                    <div class="mb-3 text-slate-800 group-hover:text-brandorange transition flex items-center justify-center">
                        <svg class="w-14 h-14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 19h18v2H2v-2zm18-14h-2V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a4 4 0 0 0 4 4 h6a4 4 0 0 0 4-4v-2h2a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm1 6a1 1 0 0 1-1 1h-2V7h2a1 1 0 0 1 1 1v3z"/>
                        </svg>
                    </div>
                    <span id="lbl-essentials" class="text-lg font-bold text-slate-800 group-hover:text-brandorange transition">Coffee Essentials</span>
                </a>
            </div>
        </section>

        <!-- PRODUCT CATEGORY PAGE -->
        <section id="page-category" class="page-view hidden w-full max-w-5xl">
            <h2 id="category-title" class="text-3xl font-extrabold text-slate-900 mb-8 capitalize text-center">Products</h2>
            <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </section>

        <!-- OUR STORY PAGE -->
        <section id="page-story" class="page-view hidden w-full max-w-2xl text-center">
            <h2 id="story-title" class="text-3xl font-bold mb-4 text-slate-900">Our Story</h2>
            <p id="story-body" class="text-slate-700 leading-relaxed">
                Toucano Beans brings you handcrafted coffee sourced responsibly from premium beans around the world. Our mission is to make exceptional specialty coffee accessible, simple, and enjoyable every single day.
            </p>
        </section>

        <!-- CONTACT US PAGE -->
        <section id="page-contact" class="page-view hidden w-full max-w-md text-center">
            <h2 id="contact-title" class="text-3xl font-bold mb-6 text-slate-900">Contact Us</h2>
            <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 space-y-6">
                <div>
                    <span id="contact-email-lbl" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Official Email</span>
                    <a href="mailto:toucanobeans@gmail.com" class="text-lg font-bold text-brandorange hover:underline break-all">
                        toucanobeans@gmail.com
                    </a>
                </div>
                <hr class="border-slate-200">
                <div>
                    <span id="contact-wa-lbl" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">WhatsApp</span>
                    <a href="https://wa.me/97466609060" target="_blank" class="inline-flex items-center gap-2 text-lg font-bold text-emerald-600 hover:underline">
                        <span>+974 6660 9060</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- ACCOUNT PAGE -->
        <section id="page-account" class="page-view hidden w-full max-w-md">
            <h2 id="account-page-title" class="text-3xl font-bold mb-6 text-slate-900 text-center">Log In</h2>
            <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80">
                <div class="flex border-b border-slate-200 mb-6">
                    <button id="tab-login" onclick="switchAccountTab('login')" class="flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center">Log In</button>
                    <button id="tab-signup" onclick="switchAccountTab('signup')" class="flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center">Sign Up</button>
                </div>

                <form onsubmit="event.preventDefault(); alert('Action submitted!');" class="space-y-4">
                    <div id="signup-name-field" class="hidden">
                        <label id="lbl-fullname" class="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                        <input type="text" placeholder="John Doe" class="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-brandorange">
                    </div>
                    <div>
                        <label id="lbl-email" class="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
                        <input type="email" required placeholder="you@example.com" class="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-brandorange">
                    </div>
                    <div>
                        <label id="lbl-password" class="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
                        <input type="password" required placeholder="••••••••" class="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-brandorange">
                    </div>
                    <button type="submit" id="account-submit-btn" class="w-full bg-brandorange text-white py-2.5 rounded-lg font-bold hover:bg-orange-600 transition">Log In</button>
                </form>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="text-center py-4 text-xs text-slate-500 border-t border-slate-300">
        © 2026 Toucano Beans. All rights reserved.
    </footer>

    <script type="module" src="public/assets/js/main.js"></script>
</body>
</html>
