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
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${column.width} px-6 py-4 text-left text-sm font-medium text-gray-600 truncate`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((item, index) => (
            <tr
              key={item ? `row-${(item as any).id}-${index}` : `empty-${index}`}
              className="border-t border-black/10 min-h-[60px]"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`${column.width} px-6 py-4 text-sm text-gray-900 truncate align-middle`}
                >
                  {item ? column.render(item, index) : "\u00A0"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
