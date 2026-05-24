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
import type { CreateExpenseInput, Expense, ExpenseCategory } from "@/types/expense";

const expensesCollection = collection(db, "expenses");

export async function createExpense(input: CreateExpenseInput) {
  return addDoc(expensesCollection, {
    expenseDate: input.expenseDate,
    category: input.category,
    amount: Number(input.amount),
    title: input.title.trim(),
    notes: input.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getRecentExpenses(): Promise<Expense[]> {
  const expensesQuery = query(expensesCollection, orderBy("expenseDate", "desc"), limit(30));
  const snapshot = await getDocs(expensesQuery);

  return snapshot.docs.map((expenseDoc) => {
    const data = expenseDoc.data();

    return {
      id: expenseDoc.id,
      expenseDate: String(data.expenseDate ?? ""),
      category: isExpenseCategory(data.category) ? data.category : "other",
      amount: typeof data.amount === "number" ? data.amount : 0,
      title: String(data.title ?? ""),
      notes: data.notes ? String(data.notes) : undefined,
      createdAt: formatFirestoreDate(data.createdAt),
      updatedAt: formatFirestoreDate(data.updatedAt),
    };
  });
}

function isExpenseCategory(value: unknown): value is ExpenseCategory {
  return (
    value === "feed" ||
    value === "medicine" ||
    value === "worker" ||
    value === "vet" ||
    value === "maintenance" ||
    value === "other"
  );
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
