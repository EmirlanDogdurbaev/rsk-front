export type Pledgor = {
  id: number;
  name: string;
  orgName: string;
  address: string;
  phone: string;
  powerOfAttorney: string;
  date_joined: string; 
};

export type PledgorRaw = {
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

export type PledgorsFilter = {
  period: string;
  searchFio: string;
  searchPowerOfAttorney: string;
};

export const mapPledgor = (raw: PledgorRaw): Pledgor => ({
  id: raw.id,
  name:
    `${raw.last_name || ""} ${raw.first_name || ""} ${
      raw.middle_name || ""
    }`.trim() || "-",
  orgName: "",
  address: raw.registration_address || "-",
  phone: raw.phone || "-",
  powerOfAttorney: raw.proxy_number || "-",
  date_joined: raw.date_joined, 
});
