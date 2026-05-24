import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const testDocumentRef = doc(db, "connectionTests", "firestoreConnectionTest");

export type FirestoreConnectionTestResult = {
  id: string;
  message: string;
  status: string;
};

export async function runFirestoreConnectionTest(): Promise<FirestoreConnectionTestResult> {
  const testData = {
    message: "Firestore connection is working.",
    status: "success",
    createdAt: serverTimestamp(),
  };

  await setDoc(testDocumentRef, testData);

  const snapshot = await getDoc(testDocumentRef);

  if (!snapshot.exists()) {
    throw new Error("Test document was created but could not be fetched back.");
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    message: String(data.message ?? ""),
    status: String(data.status ?? ""),
  };
}
