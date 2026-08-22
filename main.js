import React, { useState, useEffect } from 'react';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // 'categories' | 'language'
  const [lang, setLang] = useState('en');
  const [accountMode, setAccountMode] = useState('login');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <div className="bg-[#fdf0de] min-h-screen text-slate-900 font-sans">
      {/* Overlay & Side Drawer */}
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/40 z-30"></div>
      )}

      <aside className={`fixed top-0 right-0 h-full w-64 bg-[#fdf0de] shadow-2xl z-40 transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">{t.menuHeading}</h2>
          
          <nav className="space-y-4">
            <button onClick={() => navigateTo('home')} className="block w-full text-start">{t.main}</button>
            <button onClick={() => navigateTo('story')} className="block w-full text-start">{t.story}</button>
            
            {/* Categories Accordion */}
            <div>
              <button onClick={() => toggleSubmenu('categories')} className="flex justify-between w-full">
                <span>{t.categories}</span>
                <span className={`transform transition ${openSubmenu === 'categories' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openSubmenu === 'categories' && (
                <div className="pl-4 mt-2 space-y-2 text-sm">
                  <button onClick={() => navigateTo('coffee-beans')} className="block">{t.beans}</button>
                  <button onClick={() => navigateTo('drip-coffee')} className="block">{t.drip}</button>
                  <button onClick={() => navigateTo('essentials')} className="block">{t.essentials}</button>
                </div>
              )}
            </div>

            {/* Language Accordion */}
            <div>
              <button onClick={() => toggleSubmenu('language')} className="flex justify-between w-full">
                <span>{t.language}</span>
                <span className={`transform transition ${openSubmenu === 'language' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openSubmenu === 'language' && (
                <div className="pl-4 mt-2 space-y-2 text-sm">
                  <button onClick={() => { setLang('en'); setIsMenuOpen(false); }} className="block">English</button>
                  <button onClick={() => { setLang('ar'); setIsMenuOpen(false); }} className="block">العربية</button>
                </div>
              )}
            </div>

            <button onClick={() => navigateTo('contact')} className="block w-full text-start">{t.contact}</button>
            <button onClick={() => navigateTo('account')} className="block w-full text-start">{t.account}</button>
          </nav>
        </div>
      </aside>

      {/* Main View Display */}
      <main className="p-8">
        <button onClick={() => setIsMenuOpen(true)} className="fixed top-4 right-4 p-2 bg-orange-500 text-white rounded">☰ Menu</button>

        {currentPage === 'home' && <div><h1>Home Page</h1></div>}
        {currentPage === 'story' && <div><h1>{t.storyTitle}</h1><p>{t.storyBody}</p></div>}
        {['coffee-beans', 'drip-coffee', 'essentials'].includes(currentPage) && (
          <div>
            <h1 className="capitalize">{currentPage.replace('-', ' ')}</h1>
            <div className="p-4 bg-white rounded shadow mt-4">Product List Here</div>
          </div>
        )}
      </main>
    </div>
  );
}
