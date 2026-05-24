export type HealthSeverity = "low" | "medium" | "high";

export type HealthRecord = {
  id: string;
  cowId: string;
  recordDate: string;
  issue: string;
  severity: HealthSeverity;
  treatment?: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateHealthRecordInput = {
  cowId: string;
  recordDate: string;
  issue: string;
  severity: HealthSeverity;
  treatment?: string;
  followUpDate?: string;
  notes?: string;
};
