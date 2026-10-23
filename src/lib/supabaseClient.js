import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(supabaseUrl || "http://localhost", supabaseAnonKey || "missing", {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export const MAIN_SITE = "https://nxx315.top";
