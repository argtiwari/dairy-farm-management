import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type {
  CreateVaccinationRecordInput,
  VaccinationRecord,
  VaccinationStatus,
} from "@/types/vaccination";

export async function createVaccinationRecord(input: CreateVaccinationRecordInput) {
  const vaccinationRecordsCollection = collection(db, "cows", input.cowId, "vaccinationRecords");

  return addDoc(vaccinationRecordsCollection, {
    vaccineName: input.vaccineName.trim(),
    dueDate: input.dueDate,
    status: input.status,
    givenDate: input.givenDate || null,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getRecentVaccinationRecords(cowId: string): Promise<VaccinationRecord[]> {
  const vaccinationRecordsCollection = collection(db, "cows", cowId, "vaccinationRecords");
  const vaccinationRecordsQuery = query(
    vaccinationRecordsCollection,
    orderBy("dueDate", "asc"),
    limit(10),
  );
  const snapshot = await getDocs(vaccinationRecordsQuery);

  return snapshot.docs.map((vaccinationDoc) => {
    const data = vaccinationDoc.data();

    return {
      id: vaccinationDoc.id,
      cowId,
      vaccineName: String(data.vaccineName ?? ""),
      dueDate: String(data.dueDate ?? ""),
      status: isVaccinationStatus(data.status) ? data.status : "pending",
      givenDate: data.givenDate ? String(data.givenDate) : undefined,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function isVaccinationStatus(value: unknown): value is VaccinationStatus {
  return value === "pending" || value === "done" || value === "missed";
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
