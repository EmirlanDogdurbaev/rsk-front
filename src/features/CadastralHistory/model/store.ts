import { create } from "zustand";
import { fetchCadastralHistory } from "../api/cadastralHistoryApi";
import { CadastralHistory, CadastralHistoryFilter } from "../model/types";

type CadastralHistoryState = {
  history: CadastralHistory[];
  allHistory: CadastralHistory[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  filters: CadastralHistoryFilter;
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
      let filteredHistory = allHistory;

      if (filters.search) {
        filteredHistory = filteredHistory.filter(
          (item) =>
            item.table_name
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            item.field_name
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            item.changed_by.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.period && filters.period !== "all") {
        const now = new Date();
        const days = filters.period === "last7days" ? 7 : 30;
        const threshold = new Date(now.setDate(now.getDate() - days));
        filteredHistory = filteredHistory.filter((item) => {
          const date = new Date(item.changed_at);
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
        search: "",
        period: "all",
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
          const allHistory = await fetchCadastralHistory();
          set({ allHistory });
          applyFiltersAndPagination();
        } catch (error) {
          set({ error: "Ошибка при загрузке истории изменений" });
        } finally {
          set({ isLoading: false });
        }
      },
    };
  }
);
