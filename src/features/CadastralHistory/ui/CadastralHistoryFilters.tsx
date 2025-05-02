import { Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

interface CadastralHistoryFiltersProps {
  search: string;
  period: string;
  onSearchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

export const CadastralHistoryFilters = ({
  search,
  period,
  onSearchChange,
  onPeriodChange,
}: CadastralHistoryFiltersProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Input
        placeholder="Поиск по таблице, полю или пользователю..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
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
