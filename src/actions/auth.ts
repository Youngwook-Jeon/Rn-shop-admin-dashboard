"use server";

import { createClient } from "@/supabase/server";

export const authenticate = async (email: string, password: string) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error) {
    console.log("AUTHENTICATION ERROR", error);
    throw error;
  }
};
