export interface IndividualPledgorRaw {
  id: number;
  family_doc_url: string | null;
  with_passport_photo_url: string | null;
  full_name: string;
  inn: string;
  birth_date: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: string;
  marital_status: string;
  family_doc: string | null;
  with_passport_photo: string | null;
}

export interface LegalEntityPledgorRaw {
  id: number;
  with_passport_photo_url: string;
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
  with_passport_photo: string;
}

export interface Pledgee {
  id: number;
  type: "individual" | "legal";
  name: string;
  inn: string;
  birth_date: string;
  passport: string;
  registration_date: string;
}

export type PledgeesFilter = {
  period: string;
  searchFio: string;
  type: "all" | "individual" | "legal";
};

export const mapIndividualPledgor = (raw: IndividualPledgorRaw): Pledgee => ({
  id: raw.id,
  type: "individual",
  name: raw.full_name || "-",
  inn: raw.inn || "-",
  birth_date: raw.birth_date || "-",
  passport:
    `${raw.passport_series || ""} ${raw.passport_number || ""}`.trim() || "-",
  registration_date: "-", // У физлиц нет registration_date
});

export const mapLegalEntityPledgor = (raw: LegalEntityPledgorRaw): Pledgee => ({
  id: raw.id,
  type: "legal",
  name: raw.authorized_person_full_name || raw.company_name || "-",
  inn: raw.company_inn || raw.person_inn || "-",
  birth_date: raw.birth_date || "-",
  passport:
    `${raw.passport_series || ""} ${raw.passport_number || ""}`.trim() || "-",
  registration_date: raw.registration_date || "-",
});
