import { create } from "zustand";
import {
  fetchCadastralHistory,
  fetchStatusCounters,
  fetchFilterOptions,
} from "../api/cadastralHistoryApi";
import {
  ApprovalHistory,
  CadastralHistoryFilter,
  StatusCounters,
  FilterOptions,
} from "../model/types";

type CadastralHistoryState = {
  history: ApprovalHistory[];
  allHistory: ApprovalHistory[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  filters: CadastralHistoryFilter;
  statusCounters: StatusCounters;
  filterOptions: FilterOptions;
  isLoading: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
  setFilters: (newFilters: Partial<CadastralHistoryFilter>) => void;
  fetchHistory: () => Promise<void>;
};

export const useCadastralHistoryStore = create<CadastralHistoryState>(
  (set, get) => {
    const applyFiltersAndPagination = () => {
      const { allHistory, filters, currentPage, itemsPerPage } = get();
      let filteredHistory = [...allHistory];

      if (filters.searchEnm) {
        filteredHistory = filteredHistory.filter((item) =>
          item.contract_number
            .toLowerCase()
            .includes(filters.searchEnm.toLowerCase())
        );
      }
      if (filters.requestType && filters.requestType !== "all") {
        filteredHistory = filteredHistory.filter(
          (item) =>
            item.request_type.toLowerCase() ===
            filters.requestType.toLowerCase()
        );
      }
      if (filters.executor && filters.executor !== "all") {
        filteredHistory = filteredHistory.filter((item) => {
          return (
            item.requested_by && String(item.requested_by) === filters.executor
          );
        });
        if (
          filteredHistory.length === 0 &&
          allHistory.some((item) => item.requested_by_name)
        ) {
          filteredHistory = allHistory.filter(
            (item) =>
              item.requested_by_name &&
              item.requested_by_name
                .toLowerCase()
                .includes(filters.executor.toLowerCase())
          );
        }
      }
      if (filters.period && filters.period !== "all") {
        const now = new Date();
        const days = filters.period === "last7days" ? 7 : 30;
        const threshold = new Date(now.setDate(now.getDate() - days));
        filteredHistory = filteredHistory.filter((item) => {
          const date = new Date(item.request_date);
          return date >= threshold;
        });
      }

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedHistory = filteredHistory.slice(start, end);
      set({ history: paginatedHistory, total: filteredHistory.length });
    };

    return {
      history: [],
      allHistory: [],
      total: 0,
      currentPage: 1,
      itemsPerPage: 10,
      filters: {
        searchEnm: "",
        requestType: "all",
        executor: "all",
        period: "all",
      },
      statusCounters: {
        total: 0,
        registered: 0,
        removed: 0,
        rejected: 0,
        inProgress: 0,
      },
      filterOptions: {
        requestTypes: [
          { value: "all", label: "Все" },
          { value: "arrest", label: "Наложение ареста/залога" },
        ],
        executors: [{ value: "all", label: "Все" }],
        periods: [
          { value: "all", label: "Все время" },
          { value: "last7days", label: "Последние 7 дней" },
          { value: "last30days", label: "Последние 30 дней" },
        ],
      },
      isLoading: false,
      error: null,

      setCurrentPage: (page: number) => {
        set({ currentPage: page });
        applyFiltersAndPagination();
      },

      setFilters: (newFilters: Partial<CadastralHistoryFilter>) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1,
        }));
        applyFiltersAndPagination();
      },

      fetchHistory: async () => {
        set({ isLoading: true, error: null });
        try {
          const [allHistory, counters, filterOptions] = await Promise.all([
            fetchCadastralHistory(),
            fetchStatusCounters(),
            fetchFilterOptions(),
          ]);
          set({ allHistory, statusCounters: counters, filterOptions });
          applyFiltersAndPagination();
        } catch (error) {
          set({ error: "Ошибка при загрузке данных" });
        } finally {
          set({ isLoading: false });
        }
      },
    };
  }
);
