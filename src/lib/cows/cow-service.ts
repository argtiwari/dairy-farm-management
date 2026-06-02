import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Cow, CowStatus, CreateCowInput, UpdateCowInput } from "@/types/cow";

const cowsCollection = collection(db, "cows");

export async function createCowProfile(input: CreateCowInput) {
  const cowData = {
    cowNumber: input.cowNumber.trim(),
    name: input.name?.trim() || null,
    breed: input.breed.trim(),
    birthDate: input.birthDate || null,
    status: input.status,
    notes: input.notes?.trim() || null,
    profileImageUrl: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return addDoc(cowsCollection, cowData);
}

export async function getCowProfiles(): Promise<Cow[]> {
  const cowsQuery = query(cowsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(cowsQuery);

  return snapshot.docs.map((cowDoc) => mapCowDocument(cowDoc.id, cowDoc.data()));
}

export async function getCowProfileById(cowId: string): Promise<Cow | null> {
  const cowRef = doc(db, "cows", cowId);
  const snapshot = await getDoc(cowRef);

  if (!snapshot.exists()) {
    return null;
  }

  return mapCowDocument(snapshot.id, snapshot.data());
}

export async function updateCowProfile(cowId: string, input: UpdateCowInput) {
  const cowRef = doc(db, "cows", cowId);

  return updateDoc(cowRef, {
    cowNumber: input.cowNumber.trim(),
    name: input.name?.trim() || null,
    breed: input.breed.trim(),
    birthDate: input.birthDate || null,
    status: input.status,
    notes: input.notes?.trim() || null,
    updatedAt: serverTimestamp(),
  });
}

export async function updateCowStatus(cowId: string, status: CowStatus) {
  const cowRef = doc(db, "cows", cowId);

  return updateDoc(cowRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

function mapCowDocument(id: string, data: Record<string, unknown>): Cow {
  return {
    id,
    cowNumber: String(data.cowNumber ?? ""),
    name: data.name ? String(data.name) : undefined,
    breed: String(data.breed ?? ""),
    birthDate: data.birthDate ? String(data.birthDate) : undefined,
    profileImageUrl: data.profileImageUrl ? String(data.profileImageUrl) : undefined,
    status: isCowStatus(data.status) ? data.status : "active",
    lastMilkLiters: typeof data.lastMilkLiters === "number" ? data.lastMilkLiters : undefined,
    lastMilkRecordDate: data.lastMilkRecordDate ? String(data.lastMilkRecordDate) : undefined,
    lastHealthNote: data.lastHealthNote ? String(data.lastHealthNote) : undefined,
    lastPregnancyStatus: data.lastPregnancyStatus ? String(data.lastPregnancyStatus) : undefined,
    expectedDeliveryDate: data.expectedDeliveryDate ? String(data.expectedDeliveryDate) : undefined,
    notes: data.notes ? String(data.notes) : undefined,
    createdAt: formatFirestoreDate(data.createdAt),
    updatedAt: formatFirestoreDate(data.updatedAt),
  };
}

function formatFirestoreDate(value: unknown) {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return new Date().toISOString();
}

function isCowStatus(value: unknown): value is CowStatus {
  return (
    value === "active" ||
    value === "pregnant" ||
    value === "sick" ||
    value === "sold" ||
    value === "inactive"
  );
}
