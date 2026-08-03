// backend/config/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// IMPORTANT: Do NOT add /rest/v1/ or a trailing slash / at the end
const supabaseUrl = 'https://gfcdmiodzphziwtvfsxj.supabase.co'; 
const supabaseKey = 'sb_publishable_bD9xCPEe0W3XtfKH8Y-9NA_itmOXqqc'; // Replace with your complete API key

export const supabase = createClient(supabaseUrl, supabaseKey);
