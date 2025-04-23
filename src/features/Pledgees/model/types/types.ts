export type Pledgee = {
  id: number;
  type: "individual" | "legal";
  name: string;
  orgName: string;
  address: string;
  phone: string;
  powerOfAttorney: string;
  date_joined: string;
  inn: string;
};

export type PledgeeRaw = {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  registration_address: string | null;
  phone: string | null;
  proxy_number: string | null;
  passport_photo: string | null;
  proxy_photo: string | null;
  pledger_photo: string | null;
  inn: string | null;
  birth_date: string | null;
  passport_series: string | null;
  passport_number: string | null;
  passport_issued_by: string | null;
  passport_issue_date: string | null;
  proxy_date: string | null;
  proxy_authority: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_first_login: boolean;
  date_joined: string;
  last_login: string | null;
  bank_branch: string | null;
  groups: number[];
  user_permissions: number[];
};

export type PledgeesFilter = {
  period: string;
  searchFio: string;
  type: "all" | "individual" | "legal";
};

export const mapPledgee = (raw: PledgeeRaw): Pledgee => ({
  id: raw.id,
  type: raw.bank_branch ? "legal" : "individual",
  name:
    `${raw.last_name || ""} ${raw.first_name || ""} ${
      raw.middle_name || ""
    }`.trim() || "-",
  orgName: raw.bank_branch || "-",
  address: raw.registration_address || "-",
  phone: raw.phone || "-",
  powerOfAttorney: raw.proxy_number || "-",
  date_joined: raw.date_joined,
  inn: raw.inn || "-",
});
