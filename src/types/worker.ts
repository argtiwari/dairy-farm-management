export type WorkerStatus = "active" | "inactive";

export type Worker = {
  id: string;
  name: string;
  phone?: string;
  role: string;
  monthlySalary?: number;
  status: WorkerStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkerInput = {
  name: string;
  phone?: string;
  role: string;
  monthlySalary?: number;
  status: WorkerStatus;
  notes?: string;
};
