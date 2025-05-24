import React from "react";
import type { ConstituentListProps } from "../types/constituent";
import { format, parseISO } from "date-fns";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export const ConstituentList = ({
  constituents,
  isLoading,
  error,
  page,
  setPage,
  total,
  limit,
  sortOrder,
  setSortOrder,
}: ConstituentListProps) => {
  const totalPages = React.useMemo(
    () => Math.ceil(total / limit),
    [total, limit]
  );

  const buttonPageStyles =
    "bg-white hover:bg-purple-800 border-purple-800 text-purple-800 hover:text-white border transition-colors text-sm font-medium py-1.5 px-6 rounded-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-purple-800 disabled:transition-none";

  const tableHeadingStyles =
    "px-3 py-3.5 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider";
  if (isLoading) {
    return (
      <div className="text-center p-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800 mx-auto"></div>
        <p className="mt-4">Loading Constituents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg">
        <h3 className="font-semibold">An Error Occurred</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder(null);
    }
  };

  const SortIcon = () => {
    if (sortOrder === "asc")
      return <ArrowUp className="w-4 h-4 text-purple-800" />;
    if (sortOrder === "desc")
      return <ArrowDown className="w-4 h-4 text-purple-800" />;
    return <ChevronsUpDown className="w-4 h-4 text-purple-800" />;
  };

  return (
    <div className="rounded-lg shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className={tableHeadingStyles}>
                Name
              </th>
              <th scope="col" className={tableHeadingStyles}>
                Email
              </th>
              <th scope="col" className={tableHeadingStyles}>
                Address
              </th>
              <th scope="col" className={tableHeadingStyles}>
                <button
                  onClick={handleSortClick}
                  className="flex items-center gap-1 text-xs font-semibold text-purple-900 uppercase tracking-wider hover:text-purple-700 focus:outline-none"
                >
                  Date Joined
                  <SortIcon />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {constituents.map((constituent) => (
              <tr key={constituent.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {constituent.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {constituent.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {constituent.address}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {format(parseISO(constituent.signUpTime), "MMM d, yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-3 bg-white border-t border-gray-200">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className={buttonPageStyles}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page <span className="text-purple-800 font-semibold">{page}</span> of{" "}
          {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className={buttonPageStyles}
        >
          Next
        </button>
      </div>
    </div>
  );
};
