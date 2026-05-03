import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut as fbSignOut, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export interface Profile {
  uid: string;
  email?: string | null;
  username?: string | null;
  photoURL?: string | null;
  about?: string | null;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      setLoading(false);

      if (!fbUser) {
        setProfile(null);
        return;
      }

      try {
        const ref = doc(db, "profiles", fbUser.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          const initial: Profile = {
            uid: fbUser.uid,
            email: fbUser.email ?? null,
            username: fbUser.displayName ?? null,
            photoURL: fbUser.photoURL ?? null,
            about: "",
          };
          await setDoc(ref, { ...initial, createdAt: serverTimestamp() });
          setProfile(initial);
        } else {
          setProfile({ uid: fbUser.uid, ...(snap.data() as Omit<Profile, "uid">) });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    });
    return () => unsub();
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      // Optimistic local update
      setProfile((prev) => ({ ...(prev ?? { uid }), ...patch, uid }));
      await updateDoc(doc(db, "profiles", uid), patch as Record<string, unknown>);
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut: async () => {
          await fbSignOut(auth);
        },
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
