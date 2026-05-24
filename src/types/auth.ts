export type UserRole = "admin" | "viewer";

export type AuthUser = {
  uid: string;
  email: string | null;
  name?: string;
  role: UserRole;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  name?: string;
  role: UserRole;
};
