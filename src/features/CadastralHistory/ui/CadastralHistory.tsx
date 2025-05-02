import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { useCadastralHistoryStore } from "../model/store";
import { CadastralHistoryFilters } from "./CadastralHistoryFilters";
import { CadastralHistoryHeader } from "./CadastralHistoryHeader";
import { CadastralHistoryTable } from "./CadastralHistoryTable";
import { CadastralHistoryPagination } from "./CadastralHistoryPagination";
import { CadastralHistoryFilter } from "../model/types";

export function CadastralHistory() {
  const {
    history,
    total,
    currentPage,
    itemsPerPage,
    filters,
    isLoading,
    error,
    setCurrentPage,
    setFilters,
    fetchHistory,
  } = useCadastralHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: Partial<CadastralHistoryFilter>) => {
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
      <CadastralHistoryHeader />
      <CadastralHistoryFilters
        branch={filters.branch}
        searchEnm={filters.searchEnm}
        requestType={filters.requestType}
        executor={filters.executor}
        period={filters.period}
        onBranchChange={(value) => debouncedSetFilters({ branch: value })}
        onSearchEnmChange={(value) => debouncedSetFilters({ searchEnm: value })}
        onRequestTypeChange={(value) =>
          debouncedSetFilters({ requestType: value })
        }
        onExecutorChange={(value) => debouncedSetFilters({ executor: value })}
        onPeriodChange={(value) => debouncedSetFilters({ period: value })}
      />
      {isLoading ? (
        <div className="p-6 text-gray-600">Загрузка...</div>
      ) : (
        <>
          <CadastralHistoryTable history={history} />
          {history.length > 0 && (
            <CadastralHistoryPagination
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
