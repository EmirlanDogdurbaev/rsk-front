import { useState } from "react";
import { PledgorsFilters } from "./PledgorsFilters";
import { PledgorsPagination } from "./PledgorsPagination";
import { PledgorsTable } from "./PledgorsTable";
import { PledgorList } from "../types";

const mockPledgors: PledgorList[] = [
  {
    id: 1,
    name: "Тестов Тест Тестович",
    orgName: "ООО Высший",
    address: "г.Бишкек, ул. Усенбаева 44",
    phone: "+996 555 55 55 55",
    powerOfAttorney: "13232432432",
  },
  {
    id: 2,
    name: "Тестов Тест Тестович",
    orgName: "ООО Высший",
    address: "г.Бишкек, ул. Усенбаева 44",
    phone: "+996 555 55 55 55",
    powerOfAttorney: "4324234324",
  },
  {
    id: 3,
    name: "Тестов Тест Тестович",
    orgName: "ООО Высший",
    address: "г.Бишкек, ул. Усенбаева 44",
    phone: "+996 555 55 55 55",
    powerOfAttorney: "4233243243",
  },
  {
    id: 4,
    name: "Тестов Тест Тестович",
    orgName: "ООО Высший",
    address: "г.Бишкек, ул. Усенбаева 44",
    phone: "+996 555 55 55 55",
    powerOfAttorney: "7888767657",
  },
];

export function PledgorsList() {
  const [pledgors] = useState<PledgorList[]>(mockPledgors);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    period: "last7days",
    searchFio: "",
    searchPowerOfAttorney: "",
    type: "all",
  });

  const itemsPerPage = 10;
  const totalItems = 87;

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <PledgorsFilters
        period={filters.period}
        searchFio={filters.searchFio}
        searchPowerOfAttorney={filters.searchPowerOfAttorney}
        type={filters.type}
        onPeriodChange={(value) => handleFilterChange("period", value)}
        onSearchFioChange={(value) => handleFilterChange("searchFio", value)}
        onSearchPowerOfAttorneyChange={(value) =>
          handleFilterChange("searchPowerOfAttorney", value)
        }
        onTypeChange={(value) => handleFilterChange("type", value)}
      />
      <PledgorsTable pledgors={pledgors} />
      <PledgorsPagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
