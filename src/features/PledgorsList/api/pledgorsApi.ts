import axios from "axios";
import { Pledgor, PledgorRaw, mapPledgor } from "../types";

const API_URL = "http://127.0.0.1:8000/api/auth/users/";

export const fetchPledgorsArray = async (): Promise<Pledgor[]> => {
  try {
    const response = await axios.get<PledgorRaw[]>(API_URL);
    console.log("Данные с API:", response.data);

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

    console.log("Уникальные данные:", uniquePledgors);
    return uniquePledgors;
  } catch (error) {
    console.error("Ошибка при получении залогодателей:", error);
    return [];
  }
};
