import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { CreateMilkRecordInput, MilkRecord } from "@/types/milk";

export async function createMilkRecord(input: CreateMilkRecordInput) {
  const milkRecordsCollection = collection(db, "cows", input.cowId, "milkRecords");
  const milkRecordRef = doc(milkRecordsCollection);
  const cowRef = doc(db, "cows", input.cowId);
  const morningLiters = Number(input.morningLiters);
  const eveningLiters = Number(input.eveningLiters);
  const totalLiters = morningLiters + eveningLiters;
  const batch = writeBatch(db);

  batch.set(milkRecordRef, {
    recordDate: input.recordDate,
    morningLiters,
    eveningLiters,
    totalLiters,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.update(cowRef, {
    lastMilkLiters: totalLiters,
    lastMilkRecordDate: input.recordDate,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();

  return milkRecordRef;
}

export async function getRecentMilkRecords(cowId: string): Promise<MilkRecord[]> {
  const milkRecordsCollection = collection(db, "cows", cowId, "milkRecords");
  const milkRecordsQuery = query(milkRecordsCollection, orderBy("recordDate", "desc"), limit(10));
  const snapshot = await getDocs(milkRecordsQuery);

  return snapshot.docs.map((milkDoc) => {
    const data = milkDoc.data();
    const morningLiters = toNumber(data.morningLiters);
    const eveningLiters = toNumber(data.eveningLiters);

    return {
      id: milkDoc.id,
      cowId,
      recordDate: String(data.recordDate ?? ""),
      morningLiters,
      eveningLiters,
      totalLiters: toNumber(data.totalLiters) || morningLiters + eveningLiters,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function toNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
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
