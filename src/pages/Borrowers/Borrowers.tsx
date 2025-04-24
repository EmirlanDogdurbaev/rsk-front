import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { useBorrowersStore } from "../../features/Borrowers/model/store";
import { BorrowersFilter } from "../../features/Borrowers/model/types/types";
import { BorrowersFilters } from "../../features/Borrowers/ui/BorrowersFilters";
import { BorrowersHeader } from "../../features/Borrowers/ui/BorrowersHeader";
import { BorrowersPagination } from "../../features/Borrowers/ui/BorrowersPagination";
import { BorrowersTable } from "../../features/Borrowers/ui/BorrowersTable";

export function Borrowers() {
  const {
    borrowers, // Use filtered and paginated borrowers
    allBorrowers,
    total,
    currentPage,
    itemsPerPage,
    filters,
    isLoading,
    error,
    setCurrentPage,
    setFilters,
    fetchBorrowers,
  } = useBorrowersStore();

  useEffect(() => {
    fetchBorrowers();
  }, [fetchBorrowers]);

  console.log("All borrowers:", allBorrowers);
  console.log("Filtered borrowers:", borrowers);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: Partial<BorrowersFilter>) => {
        console.log("Applying filters:", newFilters);
        setFilters(newFilters);
      }, 10),
    [setFilters]
  );

  useEffect(() => {
    return () => {
      debouncedSetFilters.cancel();
    };
  }, [debouncedSetFilters]);

  if (error) {
    return <div className="p-6 text-red-600">Ошибка: {error}</div>;
  }

  return (
    <div className="p-6">
      <BorrowersHeader />
      <BorrowersFilters
        period={filters.period}
        searchFio={filters.searchFio}
        type={filters.type}
        onPeriodChange={(value) => debouncedSetFilters({ period: value })}
        onSearchFioChange={(value) => debouncedSetFilters({ searchFio: value })}
        onTypeChange={(value) => debouncedSetFilters({ type: value })}
      />
      {isLoading ? (
        <div className="p-6 text-gray-600">Загрузка...</div>
      ) : (
        <>
          <BorrowersTable borrowers={borrowers} />{" "}
          {/* Use borrowers instead of allBorrowers */}
          {borrowers.length > 0 && ( // Use borrowers.length for pagination
            <BorrowersPagination
              currentPage={currentPage}
              totalItems={total}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
