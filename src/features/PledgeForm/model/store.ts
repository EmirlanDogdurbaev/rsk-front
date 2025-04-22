import { create } from "zustand";
import { PledgeStore } from "../types";

export const usePledgeStore = create<PledgeStore>((set, get) => ({
  data: {
    eniCode: "",
    inn: "",
    pledgors: [],
    pledgeSubject: {
      name: "",
      description: "",
      value: "",
    },
  },

  setField: (field, value) => {
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    }));
  },

  addPledgor: (type) => {
    set((state) => ({
      data: {
        ...state.data,
        pledgors: [...state.data.pledgors, { type }],
      },
    }));
  },

  updatePledgor: (index, value) => {
    set((state) => {
      const pledgors = [...state.data.pledgors];
      pledgors[index] = { ...pledgors[index], ...value };
      return {
        data: {
          ...state.data,
          pledgors,
        },
      };
    });
  },

  removePledgor: (index) => {
    set((state) => {
      const pledgors = [...state.data.pledgors];
      pledgors.splice(index, 1);
      return {
        data: {
          ...state.data,
          pledgors,
        },
      };
    });
  },

  setPledgors: (pledgors) =>
    set((state) => ({
      data: { ...state.data, pledgors },
    })),

  setPledgeSubject: (value) => {
    set((state) => ({
      data: {
        ...state.data,
        pledgeSubject: {
          ...state.data.pledgeSubject,
          ...value,
        },
      },
    }));
  },

  eniCodeCheck: (eniCode) => {
    console.log("🔎 Проверка кода ЕНИ:", eniCode);
  },

  getFullForm: () => get().data,
}));
