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
import type {
  CreatePregnancyRecordInput,
  PregnancyRecord,
  PregnancyStatus,
} from "@/types/pregnancy";

export async function createPregnancyRecord(input: CreatePregnancyRecordInput) {
  const pregnancyRecordsCollection = collection(db, "cows", input.cowId, "pregnancyRecords");
  const pregnancyRecordRef = doc(pregnancyRecordsCollection);
  const cowRef = doc(db, "cows", input.cowId);
  const batch = writeBatch(db);

  batch.set(pregnancyRecordRef, {
    breedingDate: input.breedingDate,
    expectedDeliveryDate: input.expectedDeliveryDate || null,
    status: input.status,
    bullName: input.bullName?.trim() || null,
    checkupDate: input.checkupDate || null,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.update(cowRef, {
    status: input.status === "bred" || input.status === "confirmed" ? "pregnant" : "active",
    lastPregnancyStatus: input.status,
    expectedDeliveryDate: input.expectedDeliveryDate || null,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();

  return pregnancyRecordRef;
}

export async function getRecentPregnancyRecords(cowId: string): Promise<PregnancyRecord[]> {
  const pregnancyRecordsCollection = collection(db, "cows", cowId, "pregnancyRecords");
  const pregnancyRecordsQuery = query(
    pregnancyRecordsCollection,
    orderBy("breedingDate", "desc"),
    limit(10),
  );
  const snapshot = await getDocs(pregnancyRecordsQuery);

  return snapshot.docs.map((pregnancyDoc) => {
    const data = pregnancyDoc.data();

    return {
      id: pregnancyDoc.id,
      cowId,
      breedingDate: String(data.breedingDate ?? ""),
      expectedDeliveryDate: data.expectedDeliveryDate
        ? String(data.expectedDeliveryDate)
        : undefined,
      status: isPregnancyStatus(data.status) ? data.status : "bred",
      bullName: data.bullName ? String(data.bullName) : undefined,
      checkupDate: data.checkupDate ? String(data.checkupDate) : undefined,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function isPregnancyStatus(value: unknown): value is PregnancyStatus {
  return value === "bred" || value === "confirmed" || value === "delivered" || value === "failed";
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
