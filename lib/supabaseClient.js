import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// أضف هذا السطر ليصبح المتغير معرّفاً داخل Console المتصفح:
if (typeof window !== 'undefined') { window.supabase = supabase; }
