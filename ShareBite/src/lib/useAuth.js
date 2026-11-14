import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Who is logged in right now?
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // 2. Tell me whenever someone logs in or out
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user };
}