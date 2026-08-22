import React, { useState, useEffect } from 'react';

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
    signup: "Sign Up",
    createAccount: "Create Account",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    cartAlert: "Cart opened!"
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
    signup: "إنشاء حساب",
    createAccount: "إنشاء الحساب",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    cartAlert: "تم فتح السلة!"
  }
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [accountTab, setAccountTab] = useState('login');
  const [cartCount, setCartCount] = useState(0);
  const [imgError, setImgError] = useState(false);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const navigateTo = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    alert('Submitted successfully!');
  };

  const LogoComponent = ({ className }) => {
    if (imgError) {
      return (
        <div className={`flex items-center justify-center bg-orange-500 text-white font-extrabold rounded-full mx-auto ${className}`}>
          TB
        </div>
      );
    }
    return (
      <img 
        src="/assets/logo.png" 
        alt="Toucano Beans Logo" 
        onError={() => setImgError(true)}
        className={`${className} object-contain mx-auto mb-2`} 
      />
    );
  };

  return (
    <div className="bg-[#fdf0de] text-slate-900 font-sans min-h-screen flex flex-col justify-between relative">
      
      {/* Top Header Icons */}
      <div className="fixed top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => alert(t.cartAlert)} 
          className="pointer-events-auto relative p-3 text-slate-800 hover:text-orange-500 transition focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="pointer-events-auto p-3 text-slate-800 hover:text-orange-500 transition focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation Drawer */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-[#fdf0de] border-l border-slate-300/60 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800">{t.menuHeading}</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-slate-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="space-y-4">
              <button onClick={() => navigateTo('home')} className="block w-full text-start text-slate-700 hover:text-orange-500 font-medium">{t.main}</button>
              <button onClick={() => navigateTo('story')} className="block w-full text-start text-slate-700 hover:text-orange-500 font-medium">{t.story}</button>
              
              <div>
                <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="w-full flex items-center justify-between text-slate-700 hover:text-orange-500 font-medium focus:outline-none">
                  <span>{t.categories}</span>
                  <svg className={`w-4 h-4 transform transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isCategoriesOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-orange-500/30">
                    <button onClick={() => navigateTo('coffee-beans')} className="block text-sm text-slate-600 hover:text-orange-500">{t.beans}</button>
                    <button onClick={() => navigateTo('drip-coffee')} className="block text-sm text-slate-600 hover:text-orange-500">{t.drip}</button>
                    <button onClick={() => navigateTo('essentials')} className="block text-sm text-slate-600 hover:text-orange-500">{t.essentials}</button>
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="w-full flex items-center justify-between text-slate-700 hover:text-orange-500 font-medium focus:outline-none">
                  <span>{t.language}</span>
                  <svg className={`w-4 h-4 transform transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isLanguageOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-orange-500/30">
                    <button onClick={() => { setLang('en'); setIsMenuOpen(false); }} className="block w-full text-start text-sm text-slate-600 hover:text-orange-500">English</button>
                    <button onClick={() => { setLang('ar'); setIsMenuOpen(false); }} className="block w-full text-start text-sm text-slate-600 hover:text-orange-500">العربية</button>
                  </div>
                )}
              </div>

              <button onClick={() => navigateTo('contact')} className="block w-full text-start text-slate-700 hover:text-orange-500 font-medium">{t.contact}</button>
              <button onClick={() => navigateTo('account')} className="block w-full text-start text-slate-700 hover:text-orange-500 font-medium">{t.account}</button>
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/40 z-30"></div>}

      {/* Header Subpages */}
      {activePage !== 'home' && (
        <header className="text-center pt-10 pb-4 cursor-pointer" onClick={() => navigateTo('home')}>
          <LogoComponent className="h-20 w-20" />
          <h1 className="text-xl font-extrabold tracking-wider text-slate-900 uppercase mt-2">TOUCANO BEANS</h1>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-12">
        {activePage === 'home' && (
          <section className="w-full max-w-4xl flex flex-col items-center">
            <div className="text-center mb-16 cursor-pointer" onClick={() => navigateTo('home')}>
              <LogoComponent className="h-44 sm:h-52 w-44 sm:w-52" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase mt-2">TOUCANO BEANS</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 w-full max-w-3xl px-4 text-center">
              <button onClick={() => navigateTo('coffee-beans')} className="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                <div className="mb-3 text-slate-800 group-hover:text-orange-500 transition flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 8.5 9 10.2 11 10.8V11H13V10.8C15 10.2 16.5 8.5 16.5 6.5C16.5 4 14.5 2 12 2ZM11.5 4.2C11.8 5.6 12 7.1 11.8 8.6C11.8 8.7 11.7 8.8 11.6 8.8C11.5 8.8 11.4 8.7 11.4 8.6C11.2 7.1 11 5.6 11.5 4.2Z"/>
                    <path d="M6.5 13C4 13 2 15 2 17.5C2 19.5 3.5 21.2 5.5 21.8V22H7.5V21.8C9.5 21.2 11 19.5 11 17.5C11 15 9 13 6.5 13ZM6 15.2C6.3 16.6 6.5 18.1 6.3 19.6C6.3 19.7 6.2 19.8 6.1 19.8C6 19.8 5.9 19.7 5.9 19.6C5.7 18.1 5.5 16.6 6 15.2Z"/>
                    <path d="M17.5 13C15 13 13 15 13 17.5C13 19.5 14.5 21.2 16.5 21.8V22H18.5V21.8C20.5 21.2 22 19.5 22 17.5C22 15 20 13 17.5 13ZM17 15.2C17.3 16.6 17.5 18.1 17.3 19.6C17.3 19.7 17.2 19.8 17.1 19.8C17 19.8 16.9 19.7 16.9 19.6C16.7 18.1 16.5 16.6 17 15.2Z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-800 group-hover:text-orange-500 transition">{t.beans}</span>
              </button>

              <button onClick={() => navigateTo('drip-coffee')} className="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                <div className="mb-3 text-slate-800 group-hover:text-orange-500 transition flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-800 group-hover:text-orange-500 transition">{t.drip}</span>
              </button>

              <button onClick={() => navigateTo('essentials')} className="group flex flex-col items-center justify-center transition transform hover:-translate-y-1">
                <div className="mb-3 text-slate-800 group-hover:text-orange-500 transition flex items-center justify-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 19h18v2H2v-2zm18-14h-2V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a4 4 0 0 0 4 4 h6a4 4 0 0 0 4-4v-2h2a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm1 6a1 1 0 0 1-1 1h-2V7h2a1 1 0 0 1 1 1v3z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-slate-800 group-hover:text-orange-500 transition">{t.essentials}</span>
              </button>
            </div>
          </section>
        )}

        {['coffee-beans', 'drip-coffee', 'essentials'].includes(activePage) && (
          <section className="w-full max-w-5xl">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 capitalize text-center">
              {activePage.replace('-', ' ')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl shadow border border-slate-200 text-center">
                <div className="h-40 bg-orange-100/60 rounded-xl mb-4 flex items-center justify-center font-bold text-orange-900 uppercase">
                  {activePage.replace('-', ' ')}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Specialty {activePage.replace('-', ' ')}</h3>
                <p className="text-orange-500 font-bold mt-1 text-base">$18.00</p>
              </div>
            </div>
          </section>
        )}

        {activePage === 'story' && (
          <section className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">{t.storyTitle}</h2>
            <p className="text-slate-700 leading-relaxed">{t.storyBody}</p>
          </section>
        )}

        {activePage === 'contact' && (
          <section className="w-full max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">{t.contactTitle}</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 space-y-6">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{t.officialEmail}</span>
                <a href="mailto:toucanobeans@gmail.com" className="text-lg font-bold text-orange-500 hover:underline break-all">
                  toucanobeans@gmail.com
                </a>
              </div>
              <hr className="border-slate-200" />
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">WhatsApp</span>
                <a href="https://wa.me/97466609060" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-lg font-bold text-emerald-600 hover:underline">
                  <span>+974 6660 9060</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {activePage === 'account' && (
          <section className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 text-center">
              {accountTab === 'signup' ? t.signup : t.login}
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80">
              <div className="flex border-b border-slate-200 mb-6">
                <button 
                  onClick={() => setAccountTab('login')} 
                  className={`flex-1 pb-3 font-bold text-center border-b-2 ${accountTab === 'login' ? 'text-orange-500 border-orange-500' : 'text-slate-400 border-transparent'}`}
                >
                  {t.login}
                </button>
                <button 
                  onClick={() => setAccountTab('signup')} 
                  className={`flex-1 pb-3 font-bold text-center border-b-2 ${accountTab === 'signup' ? 'text-orange-500 border-orange-500' : 'text-slate-400 border-transparent'}`}
                >
                  {t.signup}
                </button>
              </div>

              <form onSubmit={handleAccountSubmit} className="space-y-4">
                {accountTab === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.fullName}</label>
                    <input type="text" placeholder="John Doe" className="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-orange-500" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.email}</label>
                  <input type="email" required placeholder="you@example.com" className="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">{t.password}</label>
                  <input type="password" required placeholder="••••••••" className="w-full border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-orange-500" />
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-bold hover:bg-orange-600 transition">
                  {accountTab === 'signup' ? t.createAccount : t.login}
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-300">
        © 2026 Toucano Beans. All rights reserved.
      </footer>
    </div>
  );
}
