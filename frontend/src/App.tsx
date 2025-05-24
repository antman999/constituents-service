import { ConstituentList } from "./components/ConstituentList";
import { ConstituentForm } from "./components/ConstituentForm";
import { useConstituents } from "./hooks/useConstituents";
import { Header } from "./components/Header";
import { SearchInput } from "./components/SearchInput";

function App() {
  const {
    constituents,
    isLoading,
    error,
    page,
    setPage,
    total,
    limit,
    refetch,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
  } = useConstituents();

  return (
    <div className="bg-[#FFF9F4] min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ConstituentForm onSuccess={refetch} />
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Constituents
            </h2>
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <ConstituentList
            constituents={constituents}
            isLoading={isLoading}
            error={error}
            page={page}
            setPage={setPage}
            total={total}
            limit={limit}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
