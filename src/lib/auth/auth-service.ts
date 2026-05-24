import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createViewerProfileIfMissing, getUserProfile } from "@/lib/auth/user-service";
import type { AuthUser } from "@/types/auth";

export function loginWithEmailPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function listenToAuthChanges(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    callback(firebaseUser ? await mapFirebaseUser(firebaseUser) : null);
  });
}

async function mapFirebaseUser(user: User): Promise<AuthUser> {
  await createViewerProfileIfMissing({
    uid: user.uid,
    email: user.email,
    name: user.displayName ?? undefined,
  });

  const profile = await getUserProfile(user.uid);

  return {
    uid: user.uid,
    email: profile?.email ?? user.email,
    name: profile?.name ?? user.displayName ?? undefined,
    role: profile?.role ?? "viewer",
  };
}
