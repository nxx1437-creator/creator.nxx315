import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function useSession() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const loadProfile = async (userId) => {
      const { data } = await supabase
        .from("profiles")
        .select("username, is_admin")
        .eq("id", userId)
        .maybeSingle();
      if (alive) setProfile(data || null);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!alive) return;
      setSession(session);
      if (session?.user) {
        loadProfile(session.user.id).finally(() => alive && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        // Không await trong callback để tránh treo
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, profile, isAdmin: !!profile?.is_admin, loading };
            }
