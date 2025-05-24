import type { SortOrder } from "../hooks/useConstituents";

export interface Constituent {
  id: string;
  email: string;
  name: string;
  address: string;
  signUpTime: string;
}

export interface ConstituentListProps {
  constituents: Constituent[];
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export interface PaginatedConstituents {
  data: Constituent[];
  total: number;
  page: number;
  limit: number;
}

export type CreateConstituentData = Omit<Constituent, "id" | "signUpTime">;
