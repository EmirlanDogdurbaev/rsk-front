import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../../../shared/ui";

type IndividualPledgorFormProps = {
  index: number;
  pledgor: any;
  updatePledgor: (index: number, value: any) => void;
  dates: { birthDate: Date | null; passportIssueDate: Date | null };
  handleDateChange: (
    date: Date | null,
    type: "birth" | "passportIssue",
    index: number
  ) => void;
};

export function IndividualPledgorForm({
  index,
  pledgor,
  updatePledgor,
  dates,
  handleDateChange,
}: IndividualPledgorFormProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 text-sm text-gray-600">Фамилия</label>
        <Input
          placeholder="Введите фамилию"
          value={pledgor.lastName || ""}
          onChange={(e) => updatePledgor(index, { lastName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">Имя</label>
        <Input
          placeholder="Введите имя"
          value={pledgor.firstName || ""}
          onChange={(e) => updatePledgor(index, { firstName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">Отчество</label>
        <Input
          placeholder="Введите отчество"
          value={pledgor.middleName || ""}
          onChange={(e) => updatePledgor(index, { middleName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">ИНН</label>
        <Input
          placeholder="Введите ИНН"
          value={pledgor.inn || ""}
          onChange={(e) => updatePledgor(index, { inn: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm text-gray-600">
          Дата рождения
        </label>
        <div className="relative">
          <DatePicker
            selected={dates.birthDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "birth", index)
            }
            className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="MM / DD / YYYY"
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">
          Номер, серия паспорта
        </label>
        <Input
          placeholder="Номер, серия паспорта"
          value={pledgor.passport || ""}
          onChange={(e) => updatePledgor(index, { passport: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">Кем выдан</label>
        <Input
          placeholder="Кем выдан"
          value={pledgor.issuedBy || ""}
          onChange={(e) => updatePledgor(index, { issuedBy: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm text-gray-600">Дата выдачи</label>
        <div className="relative">
          <DatePicker
            selected={dates.passportIssueDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "passportIssue", index)
            }
            className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="MM / DD / YYYY"
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>
    </div>
  );
}
