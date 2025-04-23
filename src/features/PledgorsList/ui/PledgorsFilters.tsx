import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { Search, Calendar } from "lucide-react";
import { Input } from "../../../shared/ui";
import { PledgorsHeader } from "./PledgorsHeader";

type PledgorsFiltersProps = {
  period: string;
  searchFio: string;
  searchPowerOfAttorney: string;
  onPeriodChange: (value: string) => void;
  onSearchFioChange: (value: string) => void;
  onSearchPowerOfAttorneyChange: (value: string) => void;
};

export function PledgorsFilters({
  period,
  searchFio,
  searchPowerOfAttorney,
  onPeriodChange,
  onSearchFioChange,
  onSearchPowerOfAttorneyChange,
}: PledgorsFiltersProps) {
  return (
    <div className="flex space-x-4 mb-2 bg-white/70 items-center justify-between p-5 rounded-[5px]">
      <div className="flex space-x-4 items-center">
        <div>
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger className="min-w-[150px] border border-gray-300 rounded text-sm text-gray-700 p-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <SelectValue placeholder="Фильтр по времени" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Последние 7 дней</SelectItem>
              <SelectItem value="last30days">Последние 30 дней</SelectItem>
              <SelectItem value="all">Все время</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Input
            placeholder="Поиск по ФИО"
            value={searchFio}
            onChange={(e) => onSearchFioChange(e.target.value)}
            className="w-64 p-4 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
        </div>
        <div>
          <Input
            placeholder="Поиск по № доверенности"
            value={searchPowerOfAttorney}
            onChange={(e) => onSearchPowerOfAttorneyChange(e.target.value)}
            className="w-64 p-4 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <PledgorsHeader />
    </div>
  );
}
