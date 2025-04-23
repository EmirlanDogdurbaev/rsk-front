import axios from "axios";
import { mapPledgee, Pledgee, PledgeeRaw } from "../model/types/types";

const API_URL = "http://127.0.0.1:8000/api/pledgees/";

export const fetchPledgeesArray = async (): Promise<Pledgee[]> => {
  try {
    const response = await axios.get<PledgeeRaw[]>(API_URL);
    const uniqueRawPledgeesById = Array.from(
      new Map(response.data.map((item) => [item.id, item])).values()
    );
    let pledgees = uniqueRawPledgeesById.map(mapPledgee);
    const uniquePledgees = Array.from(
      new Map(
        pledgees.map((pledgee) => {
          const key = `${pledgee.name}|${pledgee.address}|${pledgee.phone}|${pledgee.powerOfAttorney}`;
          return [key, pledgee];
        })
      ).values()
    );
    return uniquePledgees;
  } catch (error) {
    console.error("Ошибка при получении залогодержателей:", error);
    return [];
  }
};
