export type Borrower = {
  id: number;
  type: "individual" | "legal";
  name: string;
  inn: string;
  phone?: string;
  date_joined: string;
};

export type IndividualBorrowerRaw = {
  id: number;
  with_passport_photo_url?: string;
  authorized_person_full_name: string;
  person_inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  position: string;
  person_document: string;
  with_passport_photo?: string;
  date_joined: string;
};

export type LegalEntityBorrowerRaw = {
  id: number;
  with_passport_photo_url?: string;
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
  with_passport_photo?: string;
  date_joined: string;
};

export type BorrowersFilter = {
  period: string;
  searchFio: string;
  type: "all" | "individual" | "legal";
};

export const mapIndividualBorrower = (
  raw: IndividualBorrowerRaw
): Borrower => ({
  id: raw.id,
  type: "individual",
  name: raw.authorized_person_full_name,
  inn: raw.person_inn,
  phone: "-",
  date_joined: raw.date_joined,
});

export const mapLegalEntityBorrower = (
  raw: LegalEntityBorrowerRaw
): Borrower => ({
  id: raw.id,
  type: "legal",
  name: raw.company_name,
  inn: raw.company_inn,
  phone: "-",
  date_joined: raw.date_joined,
});
