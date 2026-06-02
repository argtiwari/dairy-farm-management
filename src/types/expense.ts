export type ExpenseCategory = "feed" | "medicine" | "worker" | "vet" | "maintenance" | "other";

export type Expense = {
  id: string;
  expenseDate: string;
  category: ExpenseCategory;
  amount: number;
  title: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateExpenseInput = {
  expenseDate: string;
  category: ExpenseCategory;
  amount: number;
  title: string;
  notes?: string;
};

export type UpdateExpenseInput = CreateExpenseInput;
