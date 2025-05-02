import { Table } from "../../../shared/components/Table/Table";
import { ChangeHistory } from "../model/types";

type ChangeHistoryTableProps = {
  history: ChangeHistory[];
};

export function ChangeHistoryTable({ history }: ChangeHistoryTableProps) {
  const columns = [
    {
      header: "№",
      width: "w-20", // Обязательное значение
      key: "index",
      render: (_: ChangeHistory, index: number) => index + 1,
    },
    {
      header: "Таблица",
      width: "max-w-1/4", // Обязательное значение
      key: "table_name",
      render: (item: ChangeHistory) => item.table_name || "-",
    },
    {
      header: "Название поля",
      width: "max-w-1/4", // Обязательное значение
      key: "field_name",
      render: (item: ChangeHistory) => item.field_name || "-",
    },
    {
      header: "Старое значение",
      width: "max-w-1/4", // Обязательное значение
      key: "old_value",
      render: (item: ChangeHistory) => item.old_value || "-",
    },
    {
      header: "Новое значение",
      width: "max-w-1/4", // Обязательное значение
      key: "new_value",
      render: (item: ChangeHistory) => item.new_value || "-",
    },
    {
      header: "Дата изменения",
      width: "max-w-1/4", // Обязательное значение
      key: "changed_at",
      render: (item: ChangeHistory) => item.changed_at || "-",
    },
    {
      header: "Исполнитель",
      width: "max-w-[200px] ", // Обязательное значение
      key: "changed_by",
      render: (item: ChangeHistory) => item.changed_by || "-",
    },
  ];

  return <Table data={history} columns={columns} minRows={10} />;
}
