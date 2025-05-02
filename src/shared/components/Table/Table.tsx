import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui/table";
import { TableProps } from "./types/types";

export function Table<T>({ data, columns, minRows = 8 }: TableProps<T>) {
  const tableRows = Array.from({ length: minRows }, (_, index) => {
    if (index < data.length) {
      return data[index];
    }
    return null;
  });

  return (
    <div className="bg-white/50 rounded-lg shadow overflow-x-auto">
      <ShadcnTable>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`${column.width} min-w-[${column.width}] max-w-[${column.width}] px-6 py-4 text-left text-sm font-medium text-gray-600 truncate`} // Фиксируем ширину заголовков
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map((item, index) => (
            <TableRow
              key={item ? `row-${(item as any).id}-${index}` : `empty-${index}`}
              className="border-t border-black/10 min-h-[60px]"
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={`${column.width} min-w-[${column.width}] max-w-[${column.width}] px-6 py-4 text-sm text-gray-900 whitespace-normal break-words align-middle`} 
                >
                  {item ? column.render(item, index) : "\u00A0"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}