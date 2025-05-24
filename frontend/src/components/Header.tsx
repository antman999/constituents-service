import React from "react";
import { useCsvExport } from "../hooks/useCsvExport";
import { Download, X } from "lucide-react";

export const HeaderComponent = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoading,
    error,
    handleExport,
    clearFilters,
  } = useCsvExport();

  const hasFilters = startDate || endDate;
  const dateInputClasses =
    "text-sm px-2 py-1 border border-purple-200 rounded-md text-gray-500 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-700";
  const clearButtonClasses =
    "p-1 text-purple-800 hover:text-purple-900 rounded-full hover:bg-purple-200 transition-colors cursor-pointer";
  const exportButtonClasses =
    "flex cursor-pointer items-center gap-2 w-auto bg-white hover:bg-purple-800 border-purple-800 text-purple-800 hover:text-white border transition-colors text-sm font-medium py-1.5 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-purple-800 disabled:transition-none";

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <h1 className="text-xl text-center sm:text-left font-semibold text-gray-800 flex-shrink-0">
            Constituent Management
          </h1>
          <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2">
            <input
              type="date"
              aria-label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={dateInputClasses}
            />
            <span className="text-gray-300">-</span>
            <input
              type="date"
              aria-label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className={dateInputClasses}
            />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className={clearButtonClasses}
                title="Clear date filters"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <button
              onClick={handleExport}
              disabled={isLoading}
              className={exportButtonClasses}
            >
              <Download className="w-4 h-4" />
              {isLoading ? "..." : "Export"}
            </button>
          </div>
        </div>
      </header>
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-600 text-xs text-right mt-1">{error}</p>
        </div>
      )}
    </>
  );
};

export const Header = React.memo(HeaderComponent);
