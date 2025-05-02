import { useCadastralHistoryStore } from "../model/store";

export const CadastralHistoryHeader = () => {
  const { statusCounters } = useCadastralHistoryStore();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-start mb-2 gap-6">
        <h2 className="text-xl font-semibold">История запросов в Кадастр</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-4xl hover:bg-blue-600">
            Все {statusCounters.total}
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-4xl hover:bg-green-600">
            Зарегистрирован {statusCounters.registered}
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-4xl hover:bg-gray-600">
            Снят {statusCounters.removed}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-4xl hover:bg-red-600">
            Отклонён {statusCounters.rejected}
          </button>
          <button className="px-4 py-2 bg-blue-300 text-white rounded-4xl hover:bg-blue-400">
            В обработке {statusCounters.inProgress}
          </button>
        </div>
      </div>
    </div>
  );
};
