import { create } from "zustand";

export type PledgorType = "individual" | "legal";

export interface IndividualPledgor {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  inn: string;
  birthDate: string;
  passportSeries: string;
  passportIssuedBy: string;
  passportIssueDate: string;
  maritalStatus: string;
}

export interface LegalPledgor {
  id: string;
  companyName: string;
  inn: string;
  charterDocument: string;
  registrationDate: string;
  representativeName: string;
  representativeInn: string;
  repBirthDate: string;
  repPassportSeries: string;
  repPassportIssuedBy: string;
  repPassportIssueDate: string;
  position: string;
  document: string;
}

export interface CollateralInfo {
  subject: string;
  eniCode: string;
  location: string;
  description: string;
  files: File[];
}

interface PledgeState {
  step: number;
  eniCodeCheck: string;
  pledgorType: PledgorType;
  individualList: IndividualPledgor[];
  legalList: LegalPledgor[];
  collateral: CollateralInfo;
  setStep: (n: number) => void;
  setField: (partial: Partial<Omit<PledgeState, "setStep">>) => void;
  addIndividual: () => void;
  addLegal: () => void;
}

export const usePledgeStore = create<PledgeState>((set) => ({
  step: 1,
  eniCodeCheck: "",
  pledgorType: "individual",
  individualList: [
    {
      id: crypto.randomUUID(),
      lastName: "",
      firstName: "",
      patronymic: "",
      inn: "",
      birthDate: "",
      passportSeries: "",
      passportIssuedBy: "",
      passportIssueDate: "",
      maritalStatus: "",
    },
  ],
  legalList: [
    {
      id: crypto.randomUUID(),
      companyName: "",
      inn: "",
      charterDocument: "",
      registrationDate: "",
      representativeName: "",
      representativeInn: "",
      repBirthDate: "",
      repPassportSeries: "",
      repPassportIssuedBy: "",
      repPassportIssueDate: "",
      position: "",
      document: "",
    },
  ],
  collateral: {
    subject: "",
    eniCode: "",
    location: "",
    description: "",
    files: [],
  },

  setStep: (n) => set({ step: n }),
  setField: (partial) => set((state) => ({ ...state, ...partial })),
  addIndividual: () =>
    set((state) => ({
      individualList: [
        ...state.individualList,
        {
          id: crypto.randomUUID(),
          lastName: "",
          firstName: "",
          patronymic: "",
          inn: "",
          birthDate: "",
          passportSeries: "",
          passportIssuedBy: "",
          passportIssueDate: "",
          maritalStatus: "",
        },
      ],
    })),
  addLegal: () =>
    set((state) => ({
      legalList: [
        ...state.legalList,
        {
          id: crypto.randomUUID(),
          companyName: "",
          inn: "",
          charterDocument: "",
          registrationDate: "",
          representativeName: "",
          representativeInn: "",
          repBirthDate: "",
          repPassportSeries: "",
          repPassportIssuedBy: "",
          repPassportIssueDate: "",
          position: "",
          document: "",
        },
      ],
    })),
}));
