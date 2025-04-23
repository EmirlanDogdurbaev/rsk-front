import { create } from "zustand";
import { fetchPledgeesArray } from "../api/pledgeesApi";
import { Pledgee, PledgeesFilter } from "./types/types";

type PledgeesState = {
  pledgees: Pledgee[];
  allPledgees: Pledgee[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  filters: PledgeesFilter;
  isLoading: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
  setFilters: (newFilters: Partial<PledgeesFilter>) => void;
  fetchPledgees: () => Promise<void>;
};

export const usePledgeesStore = create<PledgeesState>((set, get) => {
  const applyFiltersAndPagination = () => {
    const { allPledgees, filters, currentPage, itemsPerPage } = get();
    let filteredPledgees = allPledgees;

    filteredPledgees = Array.from(
      new Map(
        filteredPledgees.map((pledgee) => {
          const key = `${pledgee.name}|${pledgee.address}|${pledgee.phone}|${pledgee.powerOfAttorney}`;
          return [key, pledgee];
        })
      ).values()
    );

    if (filters.searchFio) {
      filteredPledgees = filteredPledgees.filter((pledgee) =>
        pledgee.name.toLowerCase().includes(filters.searchFio.toLowerCase())
      );
    }
    if (filters.type && filters.type !== "all") {
      filteredPledgees = filteredPledgees.filter(
        (pledgee) => pledgee.type === filters.type
      );
    }
    if (filters.period && filters.period !== "all") {
      const now = new Date();
      const days = filters.period === "last7days" ? 7 : 30;
      const threshold = new Date(now.setDate(now.getDate() - days));
      filteredPledgees = filteredPledgees.filter((pledgee) => {
        if (!pledgee.date_joined) return false;
        const dateJoined = new Date(pledgee.date_joined);
        return dateJoined >= threshold;
      });
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPledgees = filteredPledgees.slice(start, end);
    set({ pledgees: paginatedPledgees, total: filteredPledgees.length });
  };

  return {
    pledgees: [],
    allPledgees: [],
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

    setFilters: (newFilters: Partial<PledgeesFilter>) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
        currentPage: 1,
      }));
      applyFiltersAndPagination();
    },

    fetchPledgees: async () => {
      set({ isLoading: true, error: null });
      try {
        const allPledgees = await fetchPledgeesArray();
        set({ allPledgees });
        applyFiltersAndPagination();
      } catch (error) {
        set({ error: "Ошибка при загрузке данных" });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
