import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { Input } from "../../../shared/ui";

type BorrowersFiltersProps = {
  period: string;
  searchFio: string;
  type: "all" | "individual" | "legal";
  onPeriodChange: (value: string) => void;
  onSearchFioChange: (value: string) => void;
  onTypeChange: (value: "all" | "individual" | "legal") => void;
};

export function BorrowersFilters({
  period,
  searchFio,
  type,
  onPeriodChange,
  onSearchFioChange,
  onTypeChange,
}: BorrowersFiltersProps) {
  return (
    <div className="flex gap-4 my-4 bg-white/70 p-5 rounded-[5px]">
      <div className="flex items-center gap-2">
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Последние 7 дней</SelectItem>
            <SelectItem value="last30days">Последние 30 дней</SelectItem>
            <SelectItem value="all">За всё время</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Поиск по заёмщику"
          value={searchFio}
          onChange={(e) => onSearchFioChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Тип</SelectItem>
            <SelectItem value="individual">Физ лицо</SelectItem>
            <SelectItem value="legal">Юр лицо</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
