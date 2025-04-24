import axios from "axios";
import { Pledgor, PledgorRaw, mapPledgor } from "../types";
import { $api } from "../../../shared/api/axiosInstance";

const API_URL = `${$api}/auth/users/`;

export const fetchPledgorsArray = async (): Promise<Pledgor[]> => {
  try {
    const response = await axios.get<PledgorRaw[]>(API_URL);

    const uniqueRawPledgorsById = Array.from(
      new Map(response.data.map((item) => [item.id, item])).values()
    );

    let pledgors = uniqueRawPledgorsById.map(mapPledgor);

    const uniquePledgors = Array.from(
      new Map(
        pledgors.map((pledgor) => {
          const key = `${pledgor.name}|${pledgor.address}|${pledgor.phone}|${pledgor.powerOfAttorney}`;
          return [key, pledgor];
        })
      ).values()
    );

    return uniquePledgors;
  } catch (error) {
    console.error("Ошибка при получении залогодателей:", error);
    return [];
  }
};
