import { createClient } from '@supabase/supabase-js';

// Read variables safely from environment variables (.env.local or Vercel settings)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Warning: Supabase environment variables were not loaded successfully.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
