import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../../../shared/ui";
import "../../../app/App.css";

type LegalPledgorFormProps = {
  index: number;
  pledgor: any;
  updatePledgor: (index: number, value: any) => void;
  dates: {
    birthDate: Date | null;
    regDate: Date | null;
    passportIssueDate: Date | null;
  };
  handleDateChange: (
    date: Date | null,
    type: "birth" | "registration" | "passportIssue",
    index: number
  ) => void;
};

export function LegalPledgorForm({
  index,
  pledgor,
  updatePledgor,
  dates,
  handleDateChange,
}: LegalPledgorFormProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 text-sm text-gray-600">
          Наименование ЮЛ
        </label>
        <Input
          placeholder="Введите наименование ЮЛ"
          value={pledgor.orgName || ""}
          onChange={(e) => updatePledgor(index, { orgName: e.target.value })}
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

      <div>
        <label className="block mb-1 text-sm text-gray-600">
          Учредительный документ
        </label>
        <Input
          placeholder="Введите учредительный документ"
          value={pledgor.foundationDocument || ""}
          onChange={(e) =>
            updatePledgor(index, { foundationDocument: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm text-gray-600">
          Дата регистрации
        </label>
        <div className="relative">
          <DatePicker
            selected={dates.regDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "registration", index)
            }
            className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholderText="MM / DD / YYYY"
            dateFormat="MM/dd/yyyy"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">
          ФИО уполномоченного лица
        </label>
        <Input
          placeholder="Введите ФИО"
          value={pledgor.representativeFullName || ""}
          onChange={(e) =>
            updatePledgor(index, { representativeFullName: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">
          ИНН уполномоченного лица
        </label>
        <Input
          placeholder="Введите ИНН"
          value={pledgor.representativeInn || ""}
          onChange={(e) =>
            updatePledgor(index, { representativeInn: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm text-gray-600">
          Дата рождения уполномоченного лица
        </label>
        <div className="relative">
          <DatePicker
            selected={dates.birthDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "birth", index)
            }
            className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

      <div className="relative min-w-full">
        <label className="block mb-1 text-sm text-gray-600">Дата выдачи</label>
        <div className="relative">
          <DatePicker
            selected={dates.passportIssueDate || null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "passportIssue", index)
            }
            className="min-w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholderText="MM / DD / YYYY"
            dateFormat="MM/dd/yyyy"
          />
        </div>
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

      <div>
        <label className="block mb-1 text-sm text-gray-600">Должность</label>
        <Select
          value={pledgor.position || ""}
          onValueChange={(value: string) =>
            updatePledgor(index, { position: value })
          }
        >
          <SelectTrigger className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700">
            <SelectValue placeholder="Введите должность" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="director">Директор</SelectItem>
            <SelectItem value="manager">Менеджер</SelectItem>
            <SelectItem value="accountant">Бухгалтер</SelectItem>
            <SelectItem value="representative">Представитель</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-600">Документ</label>
        <Select
          value={pledgor.document || ""}
          onValueChange={(value: string) =>
            updatePledgor(index, { document: value })
          }
        >
          <SelectTrigger className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700">
            <SelectValue placeholder="Введите документ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="power-of-attorney">Доверенность</SelectItem>
            <SelectItem value="charter">Устав</SelectItem>
            <SelectItem value="certificate">Свидетельство</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
