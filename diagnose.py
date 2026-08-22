import os

print("🔍 جاري فحص ملفات Toucano-Beans...\n")

# 1. التحقق من index.html
if os.path.exists("index.html"):
    print("✅ ملف index.html موجود في الجذر (Root).")
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
        if ".jsx" in content:
            print("🚨 خطأ: index.html يستدعي ملفات .jsx مباشرة، وهذا يتطلب محرك بناء (Vite) ولا يعمل كموقع ثابت!")
else:
    print("❌ خطأ: ملف index.html غير موجود في الجذر!")

# 2. التحقق من التعارض بين React و Static
has_src = os.path.exists("src")
has_package = os.path.exists("package.json")

if has_src and not has_package:
    print("🚨 السبب المباشر لـ 404: المستودع يحتوي على مجلد src (React) ولكن ملف package.json مفقود! Vercel يفشل في بناء المشروع.")

print("\n--------------------------------------------------")
