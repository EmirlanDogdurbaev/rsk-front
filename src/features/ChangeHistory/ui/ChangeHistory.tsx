import { useEffect } from "react";
import { useChangeHistoryStore } from "../model/store";
import { ChangeHistoryHeader } from "./ChangeHistoryHeader";
import { ChangeHistoryTable } from "./ChangeHistoryTable";
import { ChangeHistoryPagination } from "./ChangeHistoryPagination";

export function ChangeHistory() {
  const {
    history,
    total,
    currentPage,
    itemsPerPage,
    isLoading,
    setCurrentPage,
    fetchHistory,
  } = useChangeHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="p-6">
      <ChangeHistoryHeader />
      {isLoading ? (
        <div className="p-6 text-gray-600">Загрузка...</div>
      ) : (
        <>
          <ChangeHistoryTable history={history} />
          {history.length > 0 && (
            <ChangeHistoryPagination
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
