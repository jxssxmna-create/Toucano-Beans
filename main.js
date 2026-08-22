// 1. القاموس الخاص بالترجمات
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

let currentLang = 'en';

// 2. دالة التنقل بين الصفحات
window.navigateTo = function(page) {
  const contentArea = document.getElementById('main-content') || document.querySelector('main');
  const t = translations[currentLang];

  if (contentArea) {
    if (page === 'home') {
      contentArea.innerHTML = '<h1>Home Page</h1>';
    } else if (page === 'story') {
      contentArea.innerHTML = `<h1>${t.storyTitle}</h1><p class="mt-2">${t.storyBody}</p>`;
    } else if (['coffee-beans', 'drip-coffee', 'essentials'].includes(page)) {
      const title = page.replace('-', ' ');
      contentArea.innerHTML = `<h1 class="capitalize">${title}</h1><div class="p-4 bg-white rounded shadow mt-4">Product List Here</div>`;
    } else if (page === 'contact') {
      contentArea.innerHTML = `<h1>${t.contactTitle}</h1><p class="mt-2">${t.officialEmail}: info@toucanobeans.com</p>`;
    } else if (page === 'account') {
      contentArea.innerHTML = `<h1>${t.account}</h1><div class="mt-4"><button class="px-4 py-2 bg-amber-800 text-white rounded">${t.login}</button></div>`;
    }
  }

  window.toggleMenu(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 3. دالة فتح وإغلاق القائمة الجانبية
window.toggleMenu = function(forceState) {
  const menu = document.querySelector('aside');
  if (!menu) return;

  if (typeof forceState === 'boolean') {
    if (forceState) {
      menu.classList.remove('translate-x-full');
      menu.classList.add('translate-x-0');
    } else {
      menu.classList.add('translate-x-full');
      menu.classList.remove('translate-x-0');
    }
  } else {
    menu.classList.toggle('translate-x-full');
    menu.classList.toggle('translate-x-0');
  }
};

// 4. دالة التحكم في القوائم المنسدلة
window.toggleSubmenu = function(menuName) {
  const submenu = document.getElementById(`submenu-${menuName}`);
  if (submenu) {
    submenu.classList.toggle('hidden');
  }
};

// 5. دالة تغيير اللغة اتجاهاً ونصاً
window.setLanguage = function(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  window.navigateTo('home');
};
