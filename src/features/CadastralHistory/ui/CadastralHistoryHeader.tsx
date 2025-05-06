import { Button } from "../../../shared/ui";
import { useCadastralHistoryStore } from "../model/store";

export const CadastralHistoryHeader = () => {
  const { statusCounters } = useCadastralHistoryStore();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-start  gap-6">
        <h2 className="text-xl font-semibold">История запросов в Кадастр</h2>
        <div className="flex gap-2">
          <Button
            variant={"secondary"}
            className="bg-blue-500 text-white rounded-4xl hover:bg-blue-600"
          >
            Все {statusCounters.total}
          </Button>
          <Button
            variant={"secondary"}
            className="bg-green-500 text-white rounded-3xl hover:bg-green-600"
          >
            Зарегистрирован {statusCounters.registered}
          </Button>
          <Button
            variant={"secondary"}
            className="bg-gray-500 text-white rounded-4xl hover:bg-gray-600"
          >
            Снят {statusCounters.removed}
          </Button>
          <Button
            variant={"secondary"}
            className="bg-red-500 text-white rounded-4xl hover:bg-red-600"
          >
            Отклонён {statusCounters.rejected}
          </Button>
          <Button
            variant={"secondary"}
            className="bg-blue-300 text-white rounded-4xl hover:bg-blue-400 "
          >
            В обработке {statusCounters.inProgress}
          </Button>
        </div>
      </div>
    </div>
  );
};
