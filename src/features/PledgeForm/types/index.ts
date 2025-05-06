export type IndividualPledgor = {
  type: "individual";
  full_name: string;
  inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  marital_status?: string;
};

export type LegalEntityPledgor = {
  type: "legal";
  company_name: string;
  company_inn: string;
  founding_document: string;
  registration_date: string;
  authorized_person_full_name: string;
  person_inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  position: string;
  person_document: string;
};

export type Pledgor = IndividualPledgor | LegalEntityPledgor;

export type PledgeForm = {
  eniCode: string;
  inn: string;
};
