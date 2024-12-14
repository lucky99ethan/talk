import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider = SupabaseContext.Provider;

export const useSupabase = (env: { SUPABASE_URL: string; SUPABASE_ANON_KEY: string }, serverSession: any) => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    setSupabase(supabaseClient);
  }, [env]);

  return supabase;
};

export const useSupabaseClient = () => {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error("useSupabaseClient must be used within a SupabaseProvider");
  }
  return context;
};