import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as api from "../lib/api";
import { supabase } from "../lib/supabaseClient";
import type { OffererRoleTitle, User } from "../lib/types";

interface RegisterStudentInput {
  email: string;
  name: string;
  password: string;
}

interface RegisterOffererInput {
  email: string;
  name: string;
  password: string;
  roleTitle: OffererRoleTitle;
  university: string;
  siape: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  registerStudent: (input: RegisterStudentInput) => Promise<void>;
  registerOfferer: (input: RegisterOffererInput) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<User>;
  resendCode: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadUser(userId: string): Promise<User | null> {
  const profile = await api.getUserById(userId);
  return profile ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!active) return;
      if (session?.user) setUser(await loadUser(session.user.id));
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      if (session?.user) setUser(await loadUser(session.user.id));
      else setUser(null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error("E-mail ou senha incorretos.");
    const profile = await loadUser(data.user.id);
    if (!profile) throw new Error("Não foi possível carregar seu perfil.");
    setUser(profile);
    return profile;
  };

  const registerStudent = async ({ email, name, password }: RegisterStudentInput) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: "student", name } },
    });
    if (error) throw new Error(error.message);
  };

  const registerOfferer = async ({ email, name, password, roleTitle, university, siape }: RegisterOffererInput) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: "offerer", name, roleTitle, university, siape } },
    });
    if (error) throw new Error(error.message);
  };

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (error || !data.user) throw new Error("Código incorreto ou expirado. Verifique e tente novamente.");
    const profile = await loadUser(data.user.id);
    if (!profile) throw new Error("Não foi possível carregar seu perfil.");
    setUser(profile);
    return profile;
  };

  const resendCode = async (email: string) => {
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const completeOnboardingFn = async () => {
    if (!user) return;
    await api.completeOnboarding(user.id);
    setUser((prev) => (prev ? { ...prev, onboardingCompleted: true } : prev));
  };

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...patch };
      const { name, avatar } = patch;
      if (name !== undefined || avatar !== undefined) {
        api.updateProfile(prev.id, { name, avatar }).catch((err) => console.error("Failed to persist profile update", err));
      }
      return updated;
    });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      login,
      registerStudent,
      registerOfferer,
      verifyOtp,
      resendCode,
      logout,
      completeOnboarding: completeOnboardingFn,
      updateUser,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
