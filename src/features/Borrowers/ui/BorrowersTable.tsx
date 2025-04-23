import { Table } from "../../../shared/components/Table/Table";
import { Borrower } from "../model/types/types";

type BorrowersTableProps = {
  borrowers: Borrower[];
};

export function BorrowersTable({ borrowers }: BorrowersTableProps) {
  const columns = [
    {
      header: "№",
      width: "w-12",
      key: "index",
      render: (_: Borrower, index: number) => index + 1,
    },
    {
      header: "Тип",
      width: "w-1/4",
      key: "type",
      render: (borrower: Borrower, _: number) =>
        borrower.type === "individual" ? "Физ лицо" : "Юр лицо",
    },
    {
      header: "Заёмщик",
      width: "w-1/4",
      key: "name",
      render: (borrower: Borrower, _: number) => borrower.name || "-",
    },
    {
      header: "ИНН",
      width: "w-1/4",
      key: "inn",
      render: (borrower: Borrower, _: number) => borrower.inn || "-",
    },
    {
      header: "Номер телефона",
      width: "w-1/4",
      key: "phone",
      render: (borrower: Borrower, _: number) => borrower.phone || "-",
    },
  ];

  return <Table data={borrowers} columns={columns} minRows={10} />;
}
