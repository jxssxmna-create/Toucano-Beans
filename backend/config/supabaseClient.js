// backend/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// سنقوم لاحقاً بتخزين هذه المفاتيح بشكل آمن في ملف .env
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
