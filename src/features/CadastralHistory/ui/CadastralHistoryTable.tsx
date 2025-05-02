import { Table } from "../../../shared/components/Table/Table";
import { Button } from "../../../shared/ui";
import { ApprovalHistory } from "../model/types";

type CadastralHistoryTableProps = {
  history: ApprovalHistory[];
};

export function CadastralHistoryTable({ history }: CadastralHistoryTableProps) {
  const columns = [
    {
      header: "№",
      width: "w-[80px]",
      key: "index",
      render: (_: ApprovalHistory, index: number) => index + 1,
    },
    {
      header: "Код ЕНИ",
      width: "w-[200px]",
      key: "contract_number",
      render: (item: ApprovalHistory) => item.contract_number || "-",
    },
    {
      header: "Вид запроса",
      width: "w-[200px]",
      key: "request_type",
      render: (item: ApprovalHistory) => item.request_type || "-",
    },
    {
      header: "Дата отправки",
      width: "w-[200px]",
      key: "request_date",
      render: (item: ApprovalHistory) => item.request_date || "-",
    },
    {
      header: "Исполнитель",
      width: "w-[200px]",
      key: "requested_by_name",
      render: (item: ApprovalHistory) => item.requested_by_name || "-",
    },
    {
      header: "Дата получения",
      width: "w-[200px]",
      key: "response_date",
      render: (item: ApprovalHistory) => item.response_date || "-",
    },
    {
      header: "Статус",
      width: "w-[200px]",
      key: "status",
      render: (item: ApprovalHistory) => {
        let statusClass = "";
        switch (item.status.toLowerCase()) {
          case "одобрено":
            statusClass = "text-green-600 bg-green-100";
            break;
          case "отклонено":
            statusClass = "text-red-600 bg-red-100";
            break;
          case "снят":
            statusClass = "text-gray-600 bg-gray-100";
            break;
          case "на рассмотрении":
            statusClass = "text-blue-600 bg-blue-100";
            break;
          default:
            statusClass = "text-gray-600";
        }
        return (
          <Button
            variant={"secondary"}
            className={`px-2 py-1 rounded ${statusClass} w-full`}
          >
            {item.status || "-"}
          </Button>
        );
      },
    },
  ];

  return <Table data={history} columns={columns} minRows={9} />;
}
