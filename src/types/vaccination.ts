export type VaccinationStatus = "pending" | "done" | "missed";

export type VaccinationRecord = {
  id: string;
  cowId: string;
  vaccineName: string;
  dueDate: string;
  status: VaccinationStatus;
  givenDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateVaccinationRecordInput = {
  cowId: string;
  vaccineName: string;
  dueDate: string;
  status: VaccinationStatus;
  givenDate?: string;
  notes?: string;
};
