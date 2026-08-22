import { createClient } from '@supabase/supabase-js';

// قراءة البيانات بأمان من متغيرات البيئة (.env.local أو إعدادات Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ تنبيه: لم يتم قراءة متغيرات البيئة الخاصة بـ Supabase بنجاح.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
