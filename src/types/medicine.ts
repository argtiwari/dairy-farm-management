export type MedicineRecord = {
  id: string;
  cowId: string;
  medicineName: string;
  dosage: string;
  reason: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMedicineRecordInput = {
  cowId: string;
  medicineName: string;
  dosage: string;
  reason: string;
  startDate: string;
  endDate?: string;
  notes?: string;
};
