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
import type { CreateHealthRecordInput, HealthRecord, HealthSeverity } from "@/types/health";

export async function createHealthRecord(input: CreateHealthRecordInput) {
  const healthRecordsCollection = collection(db, "cows", input.cowId, "healthRecords");
  const healthRecordRef = doc(healthRecordsCollection);
  const cowRef = doc(db, "cows", input.cowId);
  const batch = writeBatch(db);
  const healthSummary = `${input.issue.trim()} (${input.severity})`;

  batch.set(healthRecordRef, {
    recordDate: input.recordDate,
    issue: input.issue.trim(),
    severity: input.severity,
    treatment: input.treatment?.trim() || null,
    followUpDate: input.followUpDate || null,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.update(cowRef, {
    lastHealthNote: healthSummary,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();

  return healthRecordRef;
}

export async function getRecentHealthRecords(cowId: string): Promise<HealthRecord[]> {
  const healthRecordsCollection = collection(db, "cows", cowId, "healthRecords");
  const healthRecordsQuery = query(
    healthRecordsCollection,
    orderBy("recordDate", "desc"),
    limit(10),
  );
  const snapshot = await getDocs(healthRecordsQuery);

  return snapshot.docs.map((healthDoc) => {
    const data = healthDoc.data();

    return {
      id: healthDoc.id,
      cowId,
      recordDate: String(data.recordDate ?? ""),
      issue: String(data.issue ?? ""),
      severity: isHealthSeverity(data.severity) ? data.severity : "low",
      treatment: data.treatment ? String(data.treatment) : undefined,
      followUpDate: data.followUpDate ? String(data.followUpDate) : undefined,
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function isHealthSeverity(value: unknown): value is HealthSeverity {
  return value === "low" || value === "medium" || value === "high";
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
