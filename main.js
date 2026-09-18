// Complete Translation Dictionary
const translations = {
  en: {
    menuHeading: "Menu", main: "Home", story: "Our Story", categories: "Categories",
    beans: "Coffee Beans", drip: "Drip Coffee", essentials: "Coffee Essentials",
    language: "Language", contact: "Contact Us", account: "Account",
    storyTitle: "Our Story",
    storyBody: "Toucano Beans brings you handcrafted coffee sourced responsibly from premium beans around the world.",
    contactTitle: "Contact Us", officialEmail: "Official Email", login: "Sign In", signup: "Sign Up"
  },
  ar: {
    menuHeading: "القائمة", main: "الرئيسية", story: "قصتنا", categories: "الفئات",
    beans: "حبوب القهوة", drip: "القهوة المقطرة", essentials: "مستلزمات القهوة",
    language: "اللغة", contact: "اتصل بنا", account: "الحساب",
    storyTitle: "قصتنا",
    storyBody: "يقدم لك توكانو بينز قهوة مصنوعة يدويًا ومستوردة بمسؤولية من أجود حبوب القهوة حول العالم.",
    contactTitle: "اتصل بنا", officialEmail: "البريد الإلكتروني الرسمي", login: "تسجيل الدخول", signup: "إنشاء حساب"
  }
};

let currentLang = 'en';

// 1. Open and Close Side Drawer
window.toggleMenu = function() {
  const drawer = document.getElementById('side-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!drawer || !overlay) return;

  const isHidden = drawer.classList.contains('-translate-x-full') || drawer.classList.contains('translate-x-full');

  if (isHidden) {
    drawer.classList.remove('-translate-x-full', 'translate-x-full');
    overlay.classList.remove('hidden');
  } else {
    const hideClass = document.documentElement.dir === 'rtl' ? 'translate-x-full' : '-translate-x-full';
    drawer.classList.add(hideClass);
    overlay.classList.add('hidden');
  }
};

// 2. Control Accordions inside Side Drawer
window.toggleSubmenu = function(id) {
  const submenu = document.getElementById(id);
  if (submenu) {
    submenu.classList.toggle('hidden');
  }
};

// 3. Page View Navigation
window.navigateTo = function(page) {
  // Hide all views
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(p => p.classList.add('hidden'));

  const header = document.getElementById('subpage-header');
  
  if (page === 'home') {
    document.getElementById('page-home')?.classList.remove('hidden');
    if (header) header.classList.add('hidden');
  } else {
    if (header) header.classList.remove('hidden');

    if (['coffee-beans', 'drip-coffee', 'essentials'].includes(page)) {
      const catView = document.getElementById('page-category');
      const catTitle = document.getElementById('category-title');
      const t = translations[currentLang];

      if (catTitle) {
        if (page === 'coffee-beans') catTitle.innerText = t.beans;
        else if (page === 'drip-coffee') catTitle.innerText = t.drip;
        else if (page === 'essentials') catTitle.innerText = t.essentials;
      }
      if (catView) catView.classList.remove('hidden');
    } else {
      const targetPage = document.getElementById(`page-${page}`);
      if (targetPage) targetPage.classList.remove('hidden');
    }
  }

  // Close side menu if open
  const drawer = document.getElementById('side-drawer');
  if (drawer && !drawer.classList.contains('-translate-x-full') && !drawer.classList.contains('translate-x-full')) {
    window.toggleMenu();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 4. Switch Between Login and Sign Up Tabs
window.switchAccountTab = function(mode) {
  const nameField = document.getElementById('signup-name-field');
  const submitBtn = document.getElementById('account-submit-btn');
  const title = document.getElementById('account-page-title');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const t = translations[currentLang];

  if (mode === 'signup') {
    nameField?.classList.remove('hidden');
    if (submitBtn) submitBtn.innerText = t.signup;
    if (title) title.innerText = t.signup;
    tabSignup?.classList.add('text-brandorange', 'border-brandorange');
    tabSignup?.classList.remove('text-slate-400', 'border-transparent');
    tabLogin?.classList.remove('text-brandorange', 'border-brandorange');
    tabLogin?.classList.add('text-slate-400', 'border-transparent');
  } else {
    nameField?.classList.add('hidden');
    if (submitBtn) submitBtn.innerText = t.login;
    if (title) title.innerText = t.login;
    tabLogin?.classList.add('text-brandorange', 'border-brandorange');
    tabLogin?.classList.remove('text-slate-400', 'border-transparent');
    tabSignup?.classList.remove('text-brandorange', 'border-brandorange');
    tabSignup?.classList.add('text-slate-400', 'border-transparent');
  }
};

// 5. Change Language & Direction Dynamic Handler
window.setLanguage = function(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update Drawer Position Classes for LTR/RTL
  const drawer = document.getElementById('side-drawer');
  if (drawer) {
    drawer.classList.remove('left-0', 'right-0', '-translate-x-full', 'translate-x-full');
    if (lang === 'ar') {
      drawer.classList.add('right-0', 'translate-x-full');
    } else {
      drawer.classList.add('left-0', '-translate-x-full');
    }
  }

  // Helper for Safely Updating Text
  const updateText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  // Update UI Text Content
  updateText('menu-heading', t.menuHeading);
  updateText('nav-main', t.main);
  updateText('nav-story', t.story);
  updateText('nav-categories', t.categories);
  updateText('nav-beans', t.beans);
  updateText('nav-drip', t.drip);
  updateText('nav-essentials', t.essentials);
  updateText('nav-language', t.language);
  updateText('nav-contact', t.contact);
  updateText('nav-account', t.account);

  updateText('lbl-beans', t.beans);
  updateText('lbl-drip', t.drip);
  updateText('lbl-essentials', t.essentials);

  updateText('story-title', t.storyTitle);
  updateText('story-body', t.storyBody);
  updateText('contact-title', t.contactTitle);
  updateText('contact-email-lbl', t.officialEmail);

  // Update Account Tab Text
  const isSignUp = !document.getElementById('signup-name-field')?.classList.contains('hidden');
  window.switchAccountTab(isSignUp ? 'signup' : 'login');

  window.navigateTo('home');
};
