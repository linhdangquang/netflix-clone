import { useRouter } from "next/router";
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
interface IAuth {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth | null>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
          router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        }
      );
    } catch (error: any) {
      console.error(error.error);

      setError(error.message);
    }
    setLoading(false);
  };
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
          router.push("/");
        }
      );
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth).then(() => {
        setUser(null);
      });
    } catch (error) { 
      console.error(error);
    }
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logout,
      loading,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
