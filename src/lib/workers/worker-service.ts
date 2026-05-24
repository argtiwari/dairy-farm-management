import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { CreateWorkerInput, Worker, WorkerStatus } from "@/types/worker";

const workersCollection = collection(db, "workers");

export async function createWorker(input: CreateWorkerInput) {
  return addDoc(workersCollection, {
    name: input.name.trim(),
    phone: input.phone?.trim() || null,
    role: input.role.trim(),
    monthlySalary: input.monthlySalary ?? null,
    status: input.status,
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getWorkers(): Promise<Worker[]> {
  const workersQuery = query(workersCollection, orderBy("name", "asc"));
  const snapshot = await getDocs(workersQuery);

  return snapshot.docs.map((workerDoc) => {
    const data = workerDoc.data();

    return {
      id: workerDoc.id,
      name: String(data.name ?? ""),
      phone: data.phone ? String(data.phone) : undefined,
      role: String(data.role ?? ""),
      monthlySalary: typeof data.monthlySalary === "number" ? data.monthlySalary : undefined,
      status: isWorkerStatus(data.status) ? data.status : "active",
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function isWorkerStatus(value: unknown): value is WorkerStatus {
  return value === "active" || value === "inactive";
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
