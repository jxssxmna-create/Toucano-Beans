const fs = require('fs');
const path = require('path');

console.log("🔍 جاري فحص مشروع Toucano-Beans لتحديد سبب خطأ 404 في Vercel...\n");

const errors = [];
const warnings = [];

// 1. التحقق من وجود index.html في Root
if (!fs.existsSync('index.html')) {
    errors.push("❌ ملف index.html مفقود من المجلد الرئيسي (Root).");
} else {
    console.log("✅ ملف index.html موجود في المجلد الرئيسي.");
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // التحقق من استدعاء ملفات JSX مباشرة داخل HTML
    if (htmlContent.includes('.jsx')) {
        errors.push("❌ ملف index.html يستدعي ملفات (.jsx) مباشرة! المتصفحات وVercel لا يمكنهما قراءة JSX بدون عملية بناء (Build Step/Vite).");
    }
}

// 2. التحقق من التعارض بين React و Static Files
const hasSrcFolder = fs.existsSync('src');
const hasPackageJson = fs.existsSync('package.json');

if (hasSrcFolder && !hasPackageJson) {
    errors.push("❌ المجلد يحتوي على ملفات React داخل (src) لكن ملف package.json مفقود! Vercel يتعامل مع الموقع كموقع ثابت بينما هو يحتاج إلى Vite/React Build.");
}

// 3. التحقق من ملف vercel.json
if (fs.existsSync('vercel.json')) {
    warnings.push("⚠️ ملف vercel.json موجود في الجذر، قد يحتوي على قواعد إعادة توجيه (Rewrites) خاطئة تستهدف مجلدات غير موجودة.");
}

// 4. التحقق من مسارات الأصول Assets
if (fs.existsSync('public/assets')) {
    console.log("✅ مجلد public/assets موجود.");
} else {
    warnings.push("⚠️ مجلد public/assets غير موجود بالمسار المتوقع.");
}

// طباعة النتيجة النهائية
console.log("\n--------------------------------------------------");
if (errors.length === 0 && warnings.length === 0) {
    console.log("🎉 لم يتم العثور على أخطاء برمجية في الملفات الرئيسية. المشكلة في إعدادات الداشبورد لـ Vercel.");
} else {
    if (errors.length > 0) {
        console.log("🚨 الأخطاء المكتشفة التي تسبب خطأ 404:");
        errors.forEach(err => console.log(err));
    }
    if (warnings.length > 0) {
        console.log("\n⚠️ ملاحظات وتحذيرات:");
        warnings.forEach(warn => console.log(warn));
    }
}
