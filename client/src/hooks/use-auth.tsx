import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type User = {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  provider?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isSupabaseConfigured: boolean;
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function buildUser(sessionUser: SupabaseUser): User | null {
  if (!sessionUser.email) {
    return null;
  }

  return {
    id: sessionUser.id,
    email: sessionUser.email,
    fullName: sessionUser.user_metadata.full_name,
    avatarUrl: sessionUser.user_metadata.avatar_url || sessionUser.user_metadata.picture,
    provider: sessionUser.app_metadata.provider,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function syncSession(session: Session | null) {
      if (!isSupabaseConfigured || !supabase) {
        if (!cancelled) {
          setUser(null);
          setIsAuthLoading(false);
        }
        return;
      }

      if (!session?.user) {
        if (!cancelled) {
          setUser(null);
          setAccessToken(null);
          setIsAuthLoading(false);
        }
        return;
      }

      const nextUser = buildUser(session.user);
      if (!cancelled) {
        setUser(nextUser);
        setAccessToken(session.access_token ?? null);
        setIsAuthLoading(false);
      }
    }

    if (!isSupabaseConfigured || !supabase) {
      setIsAuthLoading(false);
      return;
    }

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) throw error;
        syncSession(data.session);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          setUser(null);
          setIsAuthLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthLoading(true);
      syncSession(session);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      isAuthenticated: Boolean(user),
      isAuthLoading,
      isSupabaseConfigured,
      user,
      accessToken,
      login: async (email: string, password: string) => {
        if (!isSupabaseConfigured || !supabase) {
          throw new Error("Supabase auth is not configured.");
        }
        if (!email.trim() || !password.trim()) {
          throw new Error("Please enter email and password.");
        }
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      },
      loginWithGoogle: async () => {
        if (!isSupabaseConfigured || !supabase) {
          throw new Error("Supabase auth is not configured.");
        }
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/login` },
        });
        if (error) throw error;
      },
      logout: async () => {
        if (supabase) {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
        }
        setUser(null);
        setAccessToken(null);
      },
    };
  }, [isAuthLoading, user, accessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
