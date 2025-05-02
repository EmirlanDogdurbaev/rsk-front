import { useEffect } from "react";
import { useCadastralHistoryStore } from "../model/store";
import { CadastralHistoryHeader } from "./CadastralHistoryHeader";
import { CadastralHistoryTable } from "./CadastralHistoryTable";
import { CadastralHistoryPagination } from "./CadastralHistoryPagination";

export function CadastralHistory() {
  const {
    history,
    total,
    currentPage,
    itemsPerPage,
    isLoading,
    setCurrentPage,
    fetchHistory,
  } = useCadastralHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="p-6">
      <CadastralHistoryHeader />
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
