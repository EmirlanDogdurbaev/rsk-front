import { Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { useCadastralHistoryStore } from "../model/store";

interface CadastralHistoryFiltersProps {
  searchEnm: string;
  requestType: string;
  executor: string;
  period: string;
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
  const { filterOptions } = useCadastralHistoryStore();

  return (
    <div className="flex items-center space-x-2 p-4 bg-white border  rounded-md mb-6" >
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[200px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Период" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.periods.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Поиск по коду ЕНИ"
        value={searchEnm}
        onChange={(e) => onSearchEnmChange(e.target.value)}
        className="w-[200px] text-sm text-gray-600 border-none focus:ring-0"
      />
      <Select value={requestType} onValueChange={onRequestTypeChange}>
        <SelectTrigger className="w-[170px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Вид запроса" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.requestTypes.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={executor} onValueChange={onExecutorChange}>
        <SelectTrigger className="w-[250px] text-sm text-gray-600 border-none focus:ring-0">
          <SelectValue placeholder="Исполнитель" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.executors.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
