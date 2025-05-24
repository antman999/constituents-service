import type { SortOrder } from "../hooks/useConstituents";
import type {
  Constituent,
  CreateConstituentData,
  PaginatedConstituents,
} from "../types/constituent";
import { API_BASE_URL } from "../utils/constants";

export const getConstituents = async (
  page: number,
  limit: number,
  searchTerm?: string,
  sortOrder?: SortOrder
): Promise<PaginatedConstituents> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (searchTerm) {
    params.append("search", searchTerm);
  }

  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}, Failed to fetch constituents`);
  }
  return response.json();
};

export const createConstituent = async (
  data: CreateConstituentData
): Promise<Constituent> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create constituent");

  return response.json();
};

export const exportConstituentsCsv = async (
  startDate?: string,
  endDate?: string
): Promise<Blob> => {
  const params = new URLSearchParams();
  if (startDate) params.append("startTime", startDate);
  if (endDate) params.append("endTime", endDate);
  const url = `${API_BASE_URL}/export?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to export CSV data.");
  }

  return response.blob();
};
