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
  branch,
  searchEnm,
  requestType,
  executor,
  period,
  onBranchChange,
  onSearchEnmChange,
  onRequestTypeChange,
  onExecutorChange,
  onPeriodChange,
}: CadastralHistoryFiltersProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Select value={branch} onValueChange={onBranchChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Филиал/Район" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          <SelectItem value="branch1">Филиал 1</SelectItem>
          <SelectItem value="branch2">Филиал 2</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Поиск по коду ЕНМ"
        value={searchEnm}
        onChange={(e) => onSearchEnmChange(e.target.value)}
        className="max-w-sm"
      />
      <Select value={requestType} onValueChange={onRequestTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Вид запроса" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          <SelectItem value="registration">Регистрация</SelectItem>
          <SelectItem value="removal">Снятие</SelectItem>
        </SelectContent>
      </Select>
      <Select value={executor} onValueChange={onExecutorChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Исполнитель" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          <SelectItem value="executor1">Тест Тестов</SelectItem>
          <SelectItem value="executor2">Иван Иванов</SelectItem>
        </SelectContent>
      </Select>
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все время</SelectItem>
          <SelectItem value="last7days">Последние 7 дней</SelectItem>
          <SelectItem value="last30days">Последние 30 дней</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
