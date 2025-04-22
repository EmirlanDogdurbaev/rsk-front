export type PledgorList = {
  id: number;
  name: string;
  orgName: string;
  address: string;
  phone: string;
  powerOfAttorney: string;
};


export type PledgorsFilter = {
  period: string;
  searchFio: string;
  searchPowerOfAttorney: string;
  type: string;
};
