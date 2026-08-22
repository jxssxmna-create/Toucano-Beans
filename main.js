// القاموس الكامل للترجمات
const translations = {
  en: {
    menuHeading: "Menu", main: "Main", story: "Our Story", categories: "Categories",
    beans: "Coffee Beans", drip: "Drip Coffee", essentials: "Coffee Essentials",
    language: "Language", contact: "Contact Us", account: "Account",
    storyTitle: "Our Story",
    storyBody: "Toucano Beans brings you handcrafted coffee sourced responsibly from premium beans around the world.",
    contactTitle: "Contact Us", officialEmail: "Official Email", login: "Log In", signup: "Sign Up"
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

let currentLang = 'ar';

// 1. فتح وإغلاق القائمة الجانبية
window.toggleMenu = function() {
  const drawer = document.getElementById('side-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!drawer || !overlay) return;

  const isOpen = !drawer.classList.contains('translate-x-full');
  if (isOpen) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  } else {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
  }
};

// 2. التحكم بالقوائم المنسدلة داخل Side Drawer
window.toggleSubmenu = function(id) {
  const submenu = document.getElementById(id);
  if (submenu) {
    submenu.classList.toggle('hidden');
  }
};

// 3. التنقل بين الواجهات المختلفة (Pages View)
window.navigateTo = function(page) {
  // إخفاء جميع الصفحات
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
      if (catTitle) {
        catTitle.innerText = translations[currentLang][page.replace('coffee-', '').replace('-', '')] || page.replace('-', ' ');
      }
      if (catView) catView.classList.remove('hidden');
    } else {
      const targetPage = document.getElementById(`page-${page}`);
      if (targetPage) targetPage.classList.remove('hidden');
    }
  }

  window.toggleMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 4. التبديل بين تسجيل الدخول وإنشاء الحساب
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

// 5. دالة تغيير اللغة اتجاهاً ونصوصاً
window.setLanguage = function(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // تحديث النصوص
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

  window.navigateTo('home');
};
