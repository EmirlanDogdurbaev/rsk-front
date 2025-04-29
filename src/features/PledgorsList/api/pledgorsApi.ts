import { Pledgor, PledgorRaw, mapPledgor } from "../types";
import { $api } from "../../../shared/api/axiosInstance";

export const fetchPledgorsArray = async (): Promise<Pledgor[]> => {
  try {
    const response = await $api.get<PledgorRaw[]>("/api/auth/users/");

    const uniqueRawPledgors = Array.from(
      new Map(response.data.map((item) => [item.id, item])).values()
    );

    const pledgors = uniqueRawPledgors.map(mapPledgor);

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
    console.error("Ошибка при получении залогодателей:", {
      message: error instanceof Error ? error.message : "Неизвестная ошибка",
      error,
    });
    return [];
  }
};
