import { $api } from "../../../shared/api/axiosInstance";
import {
  ApprovalHistoryRaw,
  ApprovalHistory,
  mapApprovalHistory,
  StatusCounters,
  FilterOptions,
  SelectOption,
} from "../model/types";

const APPROVAL_HISTORY_URL = "/api/admin/cadastre/approval_history/";
const COUNTERS_URL = "/api/admin/cadastre/approval_status_counts/";
const EXECUTORS_URL = "/api/auth/users/";

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
export const fetchExecutors = async (): Promise<SelectOption[]> => {
  try {
    const response = await $api.get<
      {
        id: number;
        first_name: string;
        last_name: string;
        middle_name: string | null;
      }[]
    >(EXECUTORS_URL);

    const uniqueExecutors = Array.from(
      new Map(
        response.data
          .filter((executor) => executor.first_name && executor.last_name)
          .map((executor) => [executor.id, executor])
      ).values()
    );

    return [
      { value: "all", label: "Все исполнители" },
      ...uniqueExecutors.map((executor) => ({
        value: String(executor.id),
        label: `${executor.first_name} ${executor.last_name}${
          executor.middle_name ? " " + executor.middle_name : ""
        }`,
      })),
    ];
  } catch (error) {
    console.error("Ошибка при получении исполнителей:", error);
    return [
      { value: "all", label: "Все" },
      { value: "5", label: "Emirlan Dogdurbayev" },
    ];
  }
};

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const executors = await fetchExecutors();
  return {
    requestTypes: [
      { value: "all", label: "Все" },
      { value: "arrest", label: "Наложение ареста/залога" },
    ],
    executors,
    periods: [
      { value: "all", label: "Все время" },
      { value: "last7days", label: "Последние 7 дней" },
      { value: "last30days", label: "Последние 30 дней" },
    ],
  };
};
