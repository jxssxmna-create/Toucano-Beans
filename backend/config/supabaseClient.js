// backend/config/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your actual project URL and Anon Key from Supabase Dashboard
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-actual-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseKey);
