import { Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

interface CadastralHistoryFiltersProps {
  branch: string;
  searchEnm: string;
  requestType: string;
  executor: string;
  period: string;
  onBranchChange: (value: string) => void;
  onSearchEnmChange: (value: string) => void;
  onRequestTypeChange: (value: string) => void;
  onExecutorChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

export const CadastralHistoryFilters = ({
  searchEnm,
  requestType,
  executor,
  period,
  onSearchEnmChange,
  onRequestTypeChange,
  onExecutorChange,
  onPeriodChange,
}: CadastralHistoryFiltersProps) => {
  return (
    <div className="flex items-center space-x-2 p-6 bg-white border rounded-md mb-6">
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="min-w-[200px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Последние 7 дней" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все время</SelectItem>
          <SelectItem value="last7days">Последние 7 дней</SelectItem>
          <SelectItem value="last30days">Последние 30 дней</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Поиск по коду ЕНИ"
        value={searchEnm}
        onChange={(e) => onSearchEnmChange(e.target.value)}
        className="min-w-[200px] max-w-[250px] text-sm text-gray-600 border-none focus:ring-0"
      />
      <Select value={requestType} onValueChange={onRequestTypeChange}>
        <SelectTrigger className="w-[200px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Вид запроса" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Вид запроса</SelectItem>
          <SelectItem value="arrest">Наложение ареста/залога</SelectItem>
        </SelectContent>
      </Select>
      <Select value={executor} onValueChange={onExecutorChange}>
        <SelectTrigger className="w-[200px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Исполнитель" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Исполнитель</SelectItem>
          <SelectItem value="test test test">test test test</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
