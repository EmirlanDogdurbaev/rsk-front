import { $api } from "../../../shared/api/axiosInstance";
import {
  CadastralHistoryRaw,
  CadastralHistory,
  mapCadastralHistory,
} from "../model/types";

const CADASTRAL_HISTORY_URL = "/api/api/history/";

export const fetchCadastralHistory = async (): Promise<CadastralHistory[]> => {
  try {
    const response = await $api.get<{ results: CadastralHistoryRaw[] }>(
      CADASTRAL_HISTORY_URL
    );
    const historyItems = Array.isArray(response.data.results)
      ? response.data.results.map(mapCadastralHistory)
      : [];
    return historyItems;
  } catch (error) {
    console.error("Ошибка при получении истории изменений:", error);
    return [];
  }
};
