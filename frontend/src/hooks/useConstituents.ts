import { useState, useEffect, useCallback } from "react";
import type { Constituent } from "../types/constituent";
import { getConstituents } from "../api/constituents";
import { useDebounce } from "./useDebounce";

export type SortOrder = "asc" | "desc" | null;

export const useConstituents = () => {
  const [constituents, setConstituents] = useState<Constituent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const fetchConstituents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getConstituents(
        page,
        limit,
        debouncedSearchTerm,
        sortOrder || undefined
      );
      setConstituents(result.data);
      setTotal(result.total);
    } catch {
      setError("An unknown error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearchTerm, sortOrder]);

  useEffect(() => {
    fetchConstituents();
  }, [fetchConstituents]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, sortOrder]);

  return {
    constituents,
    isLoading,
    error,
    page,
    setPage,
    total,
    limit,
    setLimit,
    refetch: fetchConstituents,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
  };
};
