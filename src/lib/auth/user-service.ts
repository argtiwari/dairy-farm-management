import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { UserProfile, UserRole } from "@/types/auth";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    uid,
    email: data.email ? String(data.email) : null,
    name: data.name ? String(data.name) : undefined,
    role: isUserRole(data.role) ? data.role : "viewer",
  };
}

export async function createViewerProfileIfMissing(input: {
  uid: string;
  email: string | null;
  name?: string;
}) {
  const userRef = doc(db, "users", input.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return;
  }

  await setDoc(userRef, {
    email: input.email,
    name: input.name ?? null,
    role: "viewer",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "viewer";
}
