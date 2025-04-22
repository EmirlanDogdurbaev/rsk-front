export type Pledgor = {
  id?: number;
  type: "individual" | "legal";
  lastName?: string;
  firstName?: string;
  middleName?: string;
  inn?: string;
  birthDate?: string;
  passport?: string;
  issuedBy?: string;
  passportIssueDate?: string;
  orgName?: string;
  foundationDocument?: string;
  registrationDate?: string;
  representativeFullName?: string;
  representativeInn?: string;
  position?: string;
  document?: string;
  address?: string;
  phone?: string;
};


export type PledgeForm = {
  eniCode: string;
  inn: string;
  pledgors: Pledgor[];
  pledgeSubject: {
    name: string;
    description: string;
    value: string;
    location?: string;
  };
};

export type PledgeStore = {
  data: PledgeForm;

  setField: <T extends keyof PledgeForm>(
    field: T,
    value: PledgeForm[T]
  ) => void;

  addPledgor: (type: "individual" | "legal") => void;

  updatePledgor: (
    index: number,
    value: Partial<PledgeForm["pledgors"][number]>
  ) => void;

  removePledgor: (index: number) => void;

  setPledgeSubject: (value: Partial<PledgeForm["pledgeSubject"]>) => void;

  eniCodeCheck: (eniCode: string) => void;

  getFullForm: () => PledgeForm;

  setPledgors: (pledgors: Pledgor[]) => void;
};
