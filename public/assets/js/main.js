<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Toucano Beans</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandorange: '#f97316',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#fdf0de] text-slate-900 font-sans min-h-screen flex flex-col justify-between relative">

  <!-- Header Icons (Cart & Menu Button) -->
  <div class="fixed top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
    <button onclick="alert('Cart opened!')" class="pointer-events-auto relative p-3 text-slate-800 hover:text-brandorange transition">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    </button>
    <button onclick="toggleMenu()" class="pointer-events-auto p-3 text-slate-800 hover:text-brandorange transition">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>

  <!-- Overlay & Drawer -->
  <div id="drawer-overlay" onclick="toggleMenu()" class="fixed inset-0 bg-black/40 z-30 hidden"></div>
  
  <aside id="side-drawer" class="fixed top-0 right-0 h-full w-64 bg-[#fdf0de] border-l border-slate-300 shadow-2xl z-40 transform translate-x-full transition-transform duration-300 overflow-y-auto">
    <div class="p-6">
      <div class="flex items-center justify-between mb-8">
        <h2 id="menu-heading" class="text-xl font-bold text-slate-800">Menu</h2>
        <button onclick="toggleMenu()" class="text-slate-500 hover:text-slate-800">✕</button>
      </div>

      <nav class="space-y-4">
        <button id="nav-main" onclick="navigateTo('home')" class="block w-full text-start text-slate-700 hover:text-brandorange font-medium">Main</button>
        <button id="nav-story" onclick="navigateTo('story')" class="block w-full text-start text-slate-700 hover:text-brandorange font-medium">Our Story</button>

        <!-- Submenu Categories -->
        <div>
          <button onclick="toggleSubmenu('categories-submenu')" class="w-full flex items-center justify-between text-slate-700 hover:text-brandorange font-medium">
            <span id="nav-categories">Categories</span>
            <svg id="arrow-categories" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="categories-submenu" class="hidden pl-4 mt-2 space-y-2 border-l-2 border-brandorange/30">
            <button id="nav-beans" onclick="navigateTo('coffee-beans')" class="block text-sm text-slate-600 hover:text-brandorange">Coffee Beans</button>
            <button id="nav-drip" onclick="navigateTo('drip-coffee')" class="block text-sm text-slate-600 hover:text-brandorange">Drip Coffee</button>
            <button id="nav-essentials" onclick="navigateTo('essentials')" class="block text-sm text-slate-600 hover:text-brandorange">Coffee Essentials</button>
          </div>
        </div>

        <!-- Submenu Language -->
        <div>
          <button onclick="toggleSubmenu('language-submenu')" class="w-full flex items-center justify-between text-slate-700 hover:text-brandorange font-medium">
            <span id="nav-language">Language</span>
            <svg id="arrow-language" class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="language-submenu" class="hidden pl-4 mt-2 space-y-2 border-l-2 border-brandorange/30">
            <button onclick="setLanguage('en')" class="block text-sm text-slate-600 hover:text-brandorange">English</button>
            <button onclick="setLanguage('ar')" class="block text-sm text-slate-600 hover:text-brandorange">العربية</button>
          </div>
        </div>

        <button id="nav-contact" onclick="navigateTo('contact')" class="block w-full text-start text-slate-700 hover:text-brandorange font-medium">Contact Us</button>
        <button id="nav-account" onclick="navigateTo('account')" class="block w-full text-start text-slate-700 hover:text-brandorange font-medium">Account</button>
      </nav>
    </div>
  </aside>

  <!-- Subpage Header -->
  <header id="subpage-header" class="hidden text-center pt-10 pb-4 cursor-pointer" onclick="navigateTo('home')">
    <img src="/assets/logo.png" alt="Logo" class="h-20 w-20 mx-auto object-contain" onerror="this.style.display='none'" />
    <h1 class="text-xl font-extrabold tracking-wider text-slate-900 uppercase mt-2">TOUCANO BEANS</h1>
  </header>

  <!-- Main Views Container -->
  <main class="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-12">
    
    <!-- Page Home -->
    <div id="page-home" class="page-view w-full max-w-4xl flex flex-col items-center">
      <div class="text-center mb-16 cursor-pointer" onclick="navigateTo('home')">
        <img src="/assets/logo.png" alt="Logo" class="h-44 w-44 mx-auto object-contain mb-2" onerror="this.src='https://via.placeholder.com/150?text=TB'" />
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-wider text-slate-900 uppercase">TOUCANO BEANS</h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl text-center">
        <button onclick="navigateTo('coffee-beans')" class="group flex flex-col items-center">
          <span id="lbl-beans" class="text-lg font-bold text-slate-800 group-hover:text-brandorange">Coffee Beans</span>
        </button>
        <button onclick="navigateTo('drip-coffee')" class="group flex flex-col items-center">
          <span id="lbl-drip" class="text-lg font-bold text-slate-800 group-hover:text-brandorange">Drip Coffee</span>
        </button>
        <button onclick="navigateTo('essentials')" class="group flex flex-col items-center">
          <span id="lbl-essentials" class="text-lg font-bold text-slate-800 group-hover:text-brandorange">Coffee Essentials</span>
        </button>
      </div>
    </div>

    <!-- Page Category -->
    <div id="page-category" class="page-view hidden w-full max-w-5xl">
      <h2 id="category-title" class="text-3xl font-extrabold text-slate-900 mb-8 capitalize text-center"></h2>
      <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-3 gap-6"></div>
    </div>

    <!-- Page Story -->
    <div id="page-story" class="page-view hidden w-full max-w-2xl text-center">
      <h2 id="story-title" class="text-3xl font-bold mb-4 text-slate-900">Our Story</h2>
      <p id="story-body" class="text-slate-700 leading-relaxed">Toucano Beans brings you handcrafted coffee sourced responsibly from premium beans around the world.</p>
    </div>

    <!-- Page Contact -->
    <div id="page-contact" class="page-view hidden w-full max-w-md text-center">
      <h2 id="contact-title" class="text-3xl font-bold mb-6 text-slate-900">Contact Us</h2>
      <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <span id="contact-email-lbl" class="block text-xs font-semibold text-slate-500 uppercase mb-1">Official Email</span>
        <a href="mailto:toucanobeans@gmail.com" class="text-lg font-bold text-brandorange break-all">toucanobeans@gmail.com</a>
      </div>
    </div>

    <!-- Page Account -->
    <div id="page-account" class="page-view hidden w-full max-w-md">
      <h2 id="account-page-title" class="text-3xl font-bold mb-6 text-slate-900 text-center">Log In</h2>
      <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <div class="flex border-b border-slate-200 mb-6">
          <button id="tab-login" onclick="switchAccountTab('login')" class="flex-1 pb-3 font-bold text-brandorange border-b-2 border-brandorange text-center">Log In</button>
          <button id="tab-signup" onclick="switchAccountTab('signup')" class="flex-1 pb-3 font-bold text-slate-400 border-b-2 border-transparent text-center">Sign Up</button>
        </div>
        <form onsubmit="event.preventDefault(); alert('Success!');" class="space-y-4">
          <div id="signup-name-field" class="hidden">
            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" class="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Email</label>
            <input type="email" required placeholder="you@example.com" class="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <input type="password" required placeholder="••••••••" class="w-full border rounded-lg px-3 py-2" />
          </div>
          <button id="account-submit-btn" type="submit" class="w-full bg-brandorange text-white py-2.5 rounded-lg font-bold">Log In</button>
        </form>
      </div>
    </div>

  </main>

  <footer class="text-center py-4 text-xs text-slate-500 border-t border-slate-300">
    © 2026 Toucano Beans. All rights reserved.
  </footer>

  <!-- Link your JS file -->
  <script src="main.js"></script>
</body>
</html>
