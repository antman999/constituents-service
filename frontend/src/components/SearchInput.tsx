import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchInput = ({
  searchTerm,
  setSearchTerm,
}: SearchInputProps) => {
  return (
    <div className="relative w-full sm:max-w-xs group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search
          className="h-4 w-4 text-purple-800/40 group-focus-within:text-purple-800"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-lg border-0 caret-purple-500 bg-white py-1.5 pl-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-purple-800/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text-sm sm:leading-6"
        placeholder="Search by name, email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
