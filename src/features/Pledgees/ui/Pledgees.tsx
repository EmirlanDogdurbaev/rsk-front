import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { PledgeesFilter } from "../model/types/types";
import { PledgeesFilters } from "./PledgeesFilters";
import { PledgeesHeader } from "./PledgeesHeader";
import { PledgeesTable } from "./PledgeesTable";
import { PledgeesPagination } from "./PledgeesPagination";
import { usePledgeesStore } from "../model/store";

export function Pledgees() {
  const {
    pledgees,
    total,
    currentPage,
    itemsPerPage,
    filters,
    isLoading,
    error,
    setCurrentPage,
    setFilters,
    fetchPledgees,
  } = usePledgeesStore();

  useEffect(() => {
    fetchPledgees();
  }, [fetchPledgees]);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: Partial<PledgeesFilter>) => {
        setFilters(newFilters);
      }, 150),
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
      <PledgeesHeader />
      <PledgeesFilters
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
          <PledgeesTable pledgees={pledgees} />
          {pledgees.length > 0 && (
            <PledgeesPagination
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
