// backend/config/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Correct Project URL (without /rest/v1/) and your actual Anon Key
const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseKey = 'sb_publishable_bD9xCPEeOw3XtfKH8Y-9NA_itmOXqqc';

export const supabase = createClient(supabaseUrl, supabaseKey);
