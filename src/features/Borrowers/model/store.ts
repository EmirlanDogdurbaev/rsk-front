import { create } from "zustand";
import { Borrower, BorrowersFilter } from "./types/types";
import { fetchBorrowersArray } from "../api/borrowersApi";

type BorrowersState = {
  borrowers: Borrower[];
  allBorrowers: Borrower[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  filters: BorrowersFilter;
  isLoading: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
  setFilters: (newFilters: Partial<BorrowersFilter>) => void;
  fetchBorrowers: () => Promise<void>;
};

export const useBorrowersStore = create<BorrowersState>((set, get) => {
  const applyFiltersAndPagination = () => {
    const { allBorrowers, filters, currentPage, itemsPerPage } = get();
    let filteredBorrowers = allBorrowers;

    filteredBorrowers = Array.from(
      new Map(
        filteredBorrowers.map((borrower) => [borrower.id, borrower])
      ).values()
    );

    if (filters.searchFio) {
      filteredBorrowers = filteredBorrowers.filter((borrower) =>
        borrower.name.toLowerCase().includes(filters.searchFio.toLowerCase())
      );
    }
    if (filters.type && filters.type !== "all") {
      filteredBorrowers = filteredBorrowers.filter(
        (borrower) => borrower.type === filters.type
      );
    }
    if (filters.period && filters.period !== "all") {
      const now = new Date();
      const days = filters.period === "last7days" ? 7 : 30;
      const threshold = new Date(now.setDate(now.getDate() - days));
      filteredBorrowers = filteredBorrowers.filter((borrower) => {
        if (!borrower.date_joined) return false;
        const dateJoined = new Date(borrower.date_joined);
        return dateJoined >= threshold;
      });
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedBorrowers = filteredBorrowers.slice(start, end);
    set({ borrowers: paginatedBorrowers, total: filteredBorrowers.length });
  };

  return {
    borrowers: [],
    allBorrowers: [],
    total: 0,
    currentPage: 1,
    itemsPerPage: 10,
    filters: {
      period: "last7days",
      searchFio: "",
      type: "all",
    },
    isLoading: false,
    error: null,

    setCurrentPage: (page: number) => {
      set({ currentPage: page });
      applyFiltersAndPagination();
    },

    setFilters: (newFilters: Partial<BorrowersFilter>) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
        currentPage: 1,
      }));
      applyFiltersAndPagination();
    },

    fetchBorrowers: async () => {
      set({ isLoading: true, error: null });
      try {
        const allBorrowers = await fetchBorrowersArray();
        set({ allBorrowers });
        applyFiltersAndPagination();
      } catch (error) {
        set({ error: "Ошибка при загрузке данных" });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
