export type PregnancyStatus = "bred" | "confirmed" | "delivered" | "failed";

export type PregnancyRecord = {
  id: string;
  cowId: string;
  breedingDate: string;
  expectedDeliveryDate?: string;
  status: PregnancyStatus;
  bullName?: string;
  checkupDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePregnancyRecordInput = {
  cowId: string;
  breedingDate: string;
  expectedDeliveryDate?: string;
  status: PregnancyStatus;
  bullName?: string;
  checkupDate?: string;
  notes?: string;
};
