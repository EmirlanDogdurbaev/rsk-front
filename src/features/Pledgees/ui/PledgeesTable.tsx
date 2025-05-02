import { Table } from "../../../shared/components/Table/Table";
import { Pledgee } from "../model/types/types";

type PledgeesTableProps = {
  pledgees: Pledgee[];
};

export function PledgeesTable({ pledgees }: PledgeesTableProps) {
  const columns = [
    {
      header: "№",
      width: "w-20",
      key: "index",
      render: (_: Pledgee, index: number) => index + 1,
    },
    {
      header: "Тип",
      width: "w-1/4",
      key: "type",
      render: (pledgee: Pledgee, _: number) =>
        pledgee.type === "individual" ? "Физ лицо" : "Юр лицо",
    },
    {
      header: "Залогодатель",
      width: "w-1/4",
      key: "name",
      render: (pledgee: Pledgee, _: number) => pledgee.name || "-",
    },
    {
      header: "ИНН",
      width: "w-1/4",
      key: "inn",
      render: (pledgee: Pledgee, _: number) => pledgee.inn || "-",
    },
    {
      header: "Номер телефона",
      width: "w-1/4",
      key: "phone",
      render: (pledgee: Pledgee, _: number) => pledgee.registration_date || "-",
    },
  ];

  return <Table data={pledgees} columns={columns} minRows={10} />;
}
