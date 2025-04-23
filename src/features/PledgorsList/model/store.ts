import { create } from "zustand";
import { Pledgor, PledgorsFilter } from "../types";
import { fetchPledgorsArray } from "../api/pledgorsApi";

type PledgorsState = {
  pledgors: Pledgor[];
  allPledgors: Pledgor[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  filters: PledgorsFilter;
  isLoading: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
  setFilters: (newFilters: Partial<PledgorsFilter>) => void;
  fetchPledgors: () => Promise<void>;
};

export const usePledgorsStore = create<PledgorsState>((set, get) => {
  const applyFiltersAndPagination = () => {
    const { allPledgors, filters, currentPage, itemsPerPage } = get();
    console.log("allPledgors в applyFiltersAndPagination:", allPledgors);
    let filteredPledgors = allPledgors;

    // Убедимся, что filteredPledgors не содержит дубликатов
    filteredPledgors = Array.from(
      new Map(
        filteredPledgors.map((pledgor) => {
          const key = `${pledgor.name}|${pledgor.address}|${pledgor.phone}|${pledgor.powerOfAttorney}`;
          return [key, pledgor];
        })
      ).values()
    );

    if (filters.searchFio) {
      filteredPledgors = filteredPledgors.filter((pledgor) =>
        pledgor.name.toLowerCase().includes(filters.searchFio.toLowerCase())
      );
    }
    if (filters.searchPowerOfAttorney) {
      filteredPledgors = filteredPledgors.filter((pledgor) =>
        pledgor.powerOfAttorney.includes(filters.searchPowerOfAttorney)
      );
    }
    if (filters.period && filters.period !== "all") {
      const now = new Date();
      const days = filters.period === "last7days" ? 7 : 30;
      const threshold = new Date(now.setDate(now.getDate() - days));
      filteredPledgors = filteredPledgors.filter((pledgor) => {
        if (!pledgor.date_joined) return false;
        const dateJoined = new Date(pledgor.date_joined);
        return dateJoined >= threshold;
      });
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPledgors = filteredPledgors.slice(start, end);
    console.log("paginatedPledgors:", paginatedPledgors);
    set({ pledgors: paginatedPledgors, total: filteredPledgors.length });
  };

  return {
    pledgors: [],
    allPledgors: [],
    total: 0,
    currentPage: 1,
    itemsPerPage: 10,
    filters: {
      period: "last7days",
      searchFio: "",
      searchPowerOfAttorney: "",
    },
    isLoading: false,
    error: null,

    setCurrentPage: (page: number) => {
      set({ currentPage: page });
      applyFiltersAndPagination();
    },

    setFilters: (newFilters: Partial<PledgorsFilter>) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
        currentPage: 1,
      }));
      applyFiltersAndPagination();
    },

    fetchPledgors: async () => {
      console.log("Вызов fetchPledgors");
      set({ isLoading: true, error: null });
      try {
        const allPledgors = await fetchPledgorsArray();
        console.log("allPledgors в fetchPledgors:", allPledgors);
        set({ allPledgors });
        applyFiltersAndPagination();
      } catch (error) {
        set({ error: "Ошибка при загрузке данных" });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
