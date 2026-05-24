export type MilkRecord = {
  id: string;
  cowId: string;
  recordDate: string;
  morningLiters: number;
  eveningLiters: number;
  totalLiters: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMilkRecordInput = {
  cowId: string;
  recordDate: string;
  morningLiters: number;
  eveningLiters: number;
  notes?: string;
};
