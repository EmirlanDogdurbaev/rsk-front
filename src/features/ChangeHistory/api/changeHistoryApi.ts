import { $api } from "../../../shared/api/axiosInstance";
import {
   ChangeHistoryRaw,
   ChangeHistory,
  mapChangeHistory,
} from "../model/types";

const  Change_HISTORY_URL = "/api/api/history/";

export const fetchChangeHistory = async (): Promise< ChangeHistory[]> => {
  try {
    const response = await $api.get<{ results:  ChangeHistoryRaw[] }>(
       Change_HISTORY_URL
    );
    const historyItems = Array.isArray(response.data.results)
      ? response.data.results.map(mapChangeHistory)
      : [];
    return historyItems;
  } catch (error) {
    console.error("Ошибка при получении истории изменений:", error);
    return [];
  }
};
