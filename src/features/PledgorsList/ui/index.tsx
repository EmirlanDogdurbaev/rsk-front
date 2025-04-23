import { useEffect, useMemo } from "react";

import { PledgorsFilters } from "./PledgorsFilters";
import { PledgorsTable } from "./PledgorsTable";
import { PledgorsPagination } from "./PledgorsPagination";

import { usePledgorsStore } from "../model/store";
import { debounce } from "lodash";
import { PledgorsFilter } from "../types";
import { PledgorsHeader } from "./PledgorsHeader";

export function PledgorsList() {
  const {
    pledgors,
    total,
    currentPage,
    itemsPerPage,
    filters,
    isLoading,
    error,
    setCurrentPage,
    setFilters,
    fetchPledgors,
  } = usePledgorsStore();

  useEffect(() => {
    fetchPledgors();
  }, [fetchPledgors]);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: Partial<PledgorsFilter>) => {
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
    <div className=" p-6 pt-3">
      <div className="flex items-center justify-between bg-white/70 pr-5 mb-5 p-5 rounded-[5px]">
        <PledgorsFilters
          period={filters.period}
          searchFio={filters.searchFio}
          searchPowerOfAttorney={filters.searchPowerOfAttorney}
          onPeriodChange={(value) => debouncedSetFilters({ period: value })}
          onSearchFioChange={(value) =>
            debouncedSetFilters({ searchFio: value })
          }
          onSearchPowerOfAttorneyChange={(value) =>
            debouncedSetFilters({ searchPowerOfAttorney: value })
          }
        />
        <PledgorsHeader />
      </div>
      {isLoading ? (
        <div className="p-6 text-gray-600">Загрузка...</div>
      ) : pledgors.length === 0 ? (
        <div className="p-6 text-gray-600">Залогодатели не найдены</div>
      ) : (
        <>
          <PledgorsTable pledgors={pledgors} />
          <PledgorsPagination
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
