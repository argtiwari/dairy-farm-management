import { getCowProfiles } from "@/lib/cows/cow-service";
import { getRecentHealthRecords } from "@/lib/health/health-service";
import { getRecentPregnancyRecords } from "@/lib/pregnancy/pregnancy-service";
import { getRecentVaccinationRecords } from "@/lib/vaccination/vaccination-service";
import type { Cow } from "@/types/cow";
import type { FarmReminder, ReminderPriority } from "@/types/reminder";

const REMINDER_WINDOW_DAYS = 30;

export async function getFarmReminders(): Promise<FarmReminder[]> {
  const cows = await getCowProfiles();
  const reminderGroups = await Promise.all(cows.map(getCowReminders));

  return reminderGroups
    .flat()
    .sort((first, second) => new Date(first.dueDate).getTime() - new Date(second.dueDate).getTime());
}

async function getCowReminders(cow: Cow): Promise<FarmReminder[]> {
  const cowLabel = cow.name ? `${cow.name} (${cow.cowNumber})` : cow.cowNumber;
  const [vaccinations, pregnancies, healthRecords] = await Promise.all([
    getRecentVaccinationRecords(cow.id),
    getRecentPregnancyRecords(cow.id),
    getRecentHealthRecords(cow.id),
  ]);

  const vaccinationReminders: FarmReminder[] = vaccinations
    .filter((record) => record.status === "pending")
    .filter((record) => shouldShowReminder(record.dueDate))
    .map((record) => ({
      id: `vaccination-${record.id}`,
      cowId: cow.id,
      cowLabel,
      category: "vaccination",
      title: record.vaccineName,
      dueDate: record.dueDate,
      priority: getReminderPriority(record.dueDate),
      note: record.notes,
    }));

  const pregnancyReminders: FarmReminder[] = pregnancies
    .filter((record) => record.status === "bred" || record.status === "confirmed")
    .filter((record) => Boolean(record.expectedDeliveryDate))
    .filter((record) => shouldShowReminder(record.expectedDeliveryDate))
    .map((record) => ({
      id: `pregnancy-${record.id}`,
      cowId: cow.id,
      cowLabel,
      category: "pregnancy",
      title: "Expected delivery",
      dueDate: record.expectedDeliveryDate ?? "",
      priority: getReminderPriority(record.expectedDeliveryDate ?? ""),
      note: record.notes,
    }));

  const healthReminders: FarmReminder[] = healthRecords
    .filter((record) => Boolean(record.followUpDate))
    .filter((record) => shouldShowReminder(record.followUpDate))
    .map((record) => ({
      id: `health-${record.id}`,
      cowId: cow.id,
      cowLabel,
      category: "health",
      title: `Follow-up: ${record.issue}`,
      dueDate: record.followUpDate ?? "",
      priority: getReminderPriority(record.followUpDate ?? ""),
      note: record.notes,
    }));

  return [...vaccinationReminders, ...pregnancyReminders, ...healthReminders];
}

function shouldShowReminder(value?: string) {
  if (!value) {
    return false;
  }

  const priority = getReminderPriority(value);
  return priority === "overdue" || priority === "due-soon";
}

function getReminderPriority(value: string): ReminderPriority {
  const today = startOfToday();
  const date = new Date(value);
  const dueSoonLimit = new Date(today);
  dueSoonLimit.setDate(today.getDate() + REMINDER_WINDOW_DAYS);

  if (date < today) {
    return "overdue";
  }

  if (date <= dueSoonLimit) {
    return "due-soon";
  }

  return "upcoming";
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
