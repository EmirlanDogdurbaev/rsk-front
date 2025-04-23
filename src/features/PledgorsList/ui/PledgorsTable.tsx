import { Table } from "../../../shared/components/Table/Table";
import { Pledgor } from "../types";

type PledgorsTableProps = {
  pledgors: Pledgor[];
};

export function PledgorsTable({ pledgors }: PledgorsTableProps) {
  const columns = [
    {
      header: "№",
      width: "w-12",
      key: "index",
      render: (_: Pledgor, index: number) => index + 1,
    },
    {
      header: "Залогодержатель",
      width: "w-1/5",
      key: "name",
      render: (pledgor: Pledgor) => pledgor.name || "-",
    },
    {
      header: "Название филиала",
      width: "w-1/5",
      key: "orgName",
      render: (pledgor: Pledgor) => pledgor.orgName || "-",
    },
    {
      header: "Адрес",
      width: "w-1/5",
      key: "address",
      render: (pledgor: Pledgor) => pledgor.address || "-",
    },
    {
      header: "Номер телефона",
      width: "w-1/5",
      key: "phone",
      render: (pledgor: Pledgor) => pledgor.phone || "-",
    },
    {
      header: "№ доверенности",
      width: "w-1/5",
      key: "powerOfAttorney",
      render: (pledgor: Pledgor) => pledgor.powerOfAttorney || "-",
    },
  ];

  return <Table data={pledgors} columns={columns} minRows={10} />;
}
