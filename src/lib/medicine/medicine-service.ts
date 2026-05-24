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
import type { CreateMedicineRecordInput, MedicineRecord } from "@/types/medicine";

export async function createMedicineRecord(input: CreateMedicineRecordInput) {
  const medicineRecordsCollection = collection(db, "cows", input.cowId, "medicineRecords");

  return addDoc(medicineRecordsCollection, {
    medicineName: input.medicineName.trim(),
    dosage: input.dosage.trim(),
    reason: input.reason.trim(),
    startDate: input.startDate,
    endDate: input.endDate || null,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getRecentMedicineRecords(cowId: string): Promise<MedicineRecord[]> {
  const medicineRecordsCollection = collection(db, "cows", cowId, "medicineRecords");
  const medicineRecordsQuery = query(
    medicineRecordsCollection,
    orderBy("startDate", "desc"),
    limit(10),
  );
  const snapshot = await getDocs(medicineRecordsQuery);

  return snapshot.docs.map((medicineDoc) => {
    const data = medicineDoc.data();

    return {
      id: medicineDoc.id,
      cowId,
      medicineName: String(data.medicineName ?? ""),
      dosage: String(data.dosage ?? ""),
      reason: String(data.reason ?? ""),
      startDate: String(data.startDate ?? ""),
      endDate: data.endDate ? String(data.endDate) : undefined,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
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
