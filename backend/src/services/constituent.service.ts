import {
  AddConstituentResult,
  Constituent,
  PaginatedConstituents,
} from "../interfaces/constituent.interface";
import { v4 as uuidv4 } from "uuid";

let constituents: Constituent[] = [
  {
    id: uuidv4(),
    name: "Anthony Mendoza",
    email: "anthonymendoza@me.com",
    address: "3465 rd, New York, USA",
    signUpTime: new Date("2025-01-15T10:00:00Z"),
  },
];

export const getAllConstituents = (): Constituent[] => {
  return [...constituents];
};

export const getAllConstituentsPaginated = (
  page: number,
  limit: number,
  searchQuery?: string,
  sortOrder?: "asc" | "desc"
): PaginatedConstituents => {
  let filteredConstituents = [...constituents];

  if (searchQuery) {
    const lowercasedQuery = searchQuery.toLowerCase();
    const sourceForFiltering = [...constituents];
    filteredConstituents = sourceForFiltering.filter(
      (c) =>
        c.name.toLowerCase().includes(lowercasedQuery) ||
        c.email.toLowerCase().includes(lowercasedQuery) ||
        c.address.toLowerCase().includes(lowercasedQuery)
    );
  }

  if (sortOrder === "asc") {
    filteredConstituents.sort(
      (a, b) =>
        new Date(a.signUpTime).getTime() - new Date(b.signUpTime).getTime()
    );
  } else if (sortOrder === "desc") {
    filteredConstituents.sort(
      (a, b) =>
        new Date(b.signUpTime).getTime() - new Date(a.signUpTime).getTime()
    );
  }

  const total = filteredConstituents.length;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = filteredConstituents.slice(startIndex, endIndex);

  return {
    data: data,
    total: total,
    page: page,
    limit: limit,
  };
};

export const addConstituent = (
  data: Omit<Constituent, "id" | "signUpTime">
): AddConstituentResult => {
  const existingConstituentIndex = constituents.findIndex(
    (c) => c.email.toLowerCase() === data.email.toLowerCase()
  );

  if (existingConstituentIndex > -1) {
    const existingConstituent = constituents[existingConstituentIndex];
    const updatedConstituent = {
      ...existingConstituent,
      name: data.name || existingConstituent.name,
      address: data.address || existingConstituent.address,
    };
    constituents[existingConstituentIndex] = updatedConstituent;
    return { constituent: updatedConstituent, wasCreated: false };
  } else {
    const newConstituent: Constituent = {
      id: uuidv4(),
      email: data.email,
      name: data.name,
      address: data.address,
      signUpTime: new Date(),
    };
    constituents.push(newConstituent);
    return { constituent: newConstituent, wasCreated: true };
  }
};
