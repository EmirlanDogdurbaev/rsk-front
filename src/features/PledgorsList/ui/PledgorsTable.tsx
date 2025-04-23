import { Pledgor } from "../types";

type PledgorsTableProps = {
  pledgors: Pledgor[];
};

export function PledgorsTable({ pledgors }: PledgorsTableProps) {
  const minRows = 9;
  const tableRows = Array.from({ length: minRows }, (_, index) => {
    if (index < pledgors.length) {
      return pledgors[index];
    }
    return null;
  });

  return (
    <div className="bg-white/50 rounded-lg shadow overflow-x-auto">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-12 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate">
              №
            </th>
            <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate">
              Залогодержатель
            </th>
            <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate">
              Название филиала
            </th>
            <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate">
              Адрес
            </th>
            <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate">
              Номер телефона
            </th>
            <th className="w-1/5 px-6 py-4 text-left text-sm font-medium text-gray-600 truncate ">
              № доверенности
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((pledgor, index) => (
            <tr
              key={pledgor ? `pledgor-${pledgor.id}` : `empty-${index}`}
              className="border-t border-black/10 min-h-[60px]"
            >
              <td className="w-12 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? index + 1 : "\u00A0"}
              </td>
              <td className="w-1/5 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? pledgor.name || "-" : ""}
              </td>
              <td className="w-1/5 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? pledgor.orgName || "-" : ""}
              </td>
              <td className="w-1/5 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? pledgor.address || "-" : ""}
              </td>
              <td className="w-1/5 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? pledgor.phone || "-" : ""}
              </td>
              <td className="w-1/5 px-6 py-4 text-sm text-gray-900 truncate align-middle">
                {pledgor ? pledgor.powerOfAttorney || "-" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
