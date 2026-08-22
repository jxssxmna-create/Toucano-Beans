import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// طباعة تحذير في حال نسيان إعداد المتغيرات
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ تذكرة: لم يتم العثور على متغيرات البيئة الخاصة بـ Supabase!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
