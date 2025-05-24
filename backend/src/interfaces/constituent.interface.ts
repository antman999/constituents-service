export interface Constituent {
  id: string;
  email: string;
  name: string;
  address: string;
  signUpTime: Date;
}

export interface PaginatedConstituents {
  data: Constituent[];
  total: number;
  page: number;
  limit: number;
}

export type AddConstituentResult = {
  constituent: Constituent;
  wasCreated: boolean;
};
