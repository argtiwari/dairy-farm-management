export type CowStatus = "active" | "pregnant" | "sick" | "sold" | "inactive";

export type Cow = {
  id: string;
  cowNumber: string;
  name?: string;
  breed: string;
  birthDate?: string;
  profileImageUrl?: string;
  status: CowStatus;
  lastMilkLiters?: number;
  lastMilkRecordDate?: string;
  lastHealthNote?: string;
  lastPregnancyStatus?: string;
  expectedDeliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCowInput = {
  cowNumber: string;
  name?: string;
  breed: string;
  birthDate?: string;
  status: CowStatus;
  notes?: string;
};
