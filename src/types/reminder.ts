export type ReminderCategory = "vaccination" | "pregnancy" | "health";
export type ReminderPriority = "overdue" | "due-soon" | "upcoming";

export type FarmReminder = {
  id: string;
  cowId: string;
  cowLabel: string;
  category: ReminderCategory;
  title: string;
  dueDate: string;
  priority: ReminderPriority;
  note?: string;
};
