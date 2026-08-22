import { createClient } from '@supabase/supabase-js';

// تم تصحيح الرابط بحذف /rest/v1/ من آخره
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gfcdmiodzphziwtvfsxj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmY2RtaW9kenBoeml3dHZmc3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5OTgzMzgsImV4cCI6MjEwMDU3NDMzOH0.e1WnGZZg6qiWAIWmwM7hAaHuXuQAP-qlTsk4g7a1qNY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
