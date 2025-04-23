import { useState, useEffect, useCallback } from "react";

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
  const [localPeriod, setLocalPeriod] = useState(period);
  const [localSearchFio, setLocalSearchFio] = useState(searchFio);
  const [localType, setLocalType] = useState(type);

  useEffect(() => {
    setLocalPeriod(period);
  }, [period]);

  useEffect(() => {
    setLocalSearchFio(searchFio);
  }, [searchFio]);

  useEffect(() => {
    setLocalType(type);
  }, [type]);

  const handlePeriodChange = useCallback(
    (value: string) => {
      setLocalPeriod(value);
      onPeriodChange(value);
    },
    [onPeriodChange]
  );

  const handleSearchFioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearchFio(value);
      onSearchFioChange(value);
    },
    [onSearchFioChange]
  );

  const handleTypeChange = useCallback(
    (value: "all" | "individual" | "legal") => {
      setLocalType(value);
      onTypeChange(value);
    },
    [onTypeChange]
  );

  return (
    <div className="flex gap-4 my-4 bg-white/70 p-5 rounded-[5px]">
      <div className="flex items-center gap-2">
        <Select value={localPeriod} onValueChange={handlePeriodChange}>
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
          value={localSearchFio}
          onChange={handleSearchFioChange}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select value={localType} onValueChange={handleTypeChange}>
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
