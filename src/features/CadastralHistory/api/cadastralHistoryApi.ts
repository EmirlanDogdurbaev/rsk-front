import { $api } from "../../../shared/api/axiosInstance";
import {
  ApprovalHistoryRaw,
  ApprovalHistory,
  mapApprovalHistory,
  StatusCounters,
} from "../model/types";

const APPROVAL_HISTORY_URL = "/api/admin/cadastre/approval_history/";
const COUNTERS_URL =
  "http://35.224.163.23/api/admin/cadastre/approval_status_counts/";

export const fetchCadastralHistory = async (): Promise<ApprovalHistory[]> => {
  try {
    const response = await $api.get<{ results: ApprovalHistoryRaw[] }>(
      APPROVAL_HISTORY_URL
    );
    const historyItems = Array.isArray(response.data)
      ? response.data.map(mapApprovalHistory)
      : [];

    return historyItems;
  } catch (error) {
    console.error("Ошибка при получении истории изменений:", error);
    return [];
  }
};

export const fetchStatusCounters = async (): Promise<StatusCounters> => {
  try {
    const response = await $api.get<StatusCounters>(COUNTERS_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении счётчиков статусов:", error);
    return { total: 0, registered: 0, removed: 0, rejected: 0, inProgress: 0 };
  }
};
