import { useCadastralHistoryStore } from "../model/store";

export const CadastralHistoryHeader = () => {
  const { statusCounters } = useCadastralHistoryStore();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">История запросов в Кадастр</h2>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Все {statusCounters.total}
          </button>
          <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
            Зарегистрирован {statusCounters.registered}
          </button>
          <button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
            Снят {statusCounters.removed}
          </button>
          <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Отклонён {statusCounters.rejected}
          </button>
          <button className="px-2 py-1 bg-blue-300 text-white rounded hover:bg-blue-400">
            В обработке {statusCounters.inProgress}
          </button>
        </div>
      </div>
    </div>
  );
};
