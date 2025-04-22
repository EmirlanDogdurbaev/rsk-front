import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { usePledgeStore } from "../model/store";
import { Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { Textarea } from "../../../shared/ui/textarea";

export default function Step3() {
  const { data, setPledgeSubject, setField } = usePledgeStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchEniCode = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newEniCode = Math.floor(100000 + Math.random() * 900000).toString();
      setField("eniCode", newEniCode);
    } catch (error) {
      console.error("Ошибка при получении кода ЕНИ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!data.eniCode) {
      fetchEniCode();
    }
  }, [data.eniCode, setField]);

  const handleEniCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setField("eniCode", value);
    }
  };

  return (
    <div className="px-0 py-6 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Предмет залога
            </label>
            <Select
              value={data.pledgeSubject.name || ""}
              onValueChange={(value: string) =>
                setPledgeSubject({ name: value })
              }
            >
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Выберите предмет залога" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Автомобиль</SelectItem>
                <SelectItem value="real-estate">Недвижимость</SelectItem>
                <SelectItem value="equipment">Оборудование</SelectItem>
                <SelectItem value="other">Прочее</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm text-gray-600">Код ЕНИ</label>
            <div className="relative ">
              <Input
                placeholder="Введите код ЕНИ"
                value={data.eniCode}
                onChange={handleEniCodeChange}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Search
                className={`absolute right-2 top-2 h-5 w-5 ${
                  isLoading ? "text-gray-400" : "text-blue-600 cursor-pointer"
                }`}
                onClick={isLoading ? undefined : fetchEniCode}
              />
            </div>
          </div>

          <div className="w-full col-span-2">
            <label className="block mb-1 text-sm text-gray-600">
              Местонахождение залога
            </label>
            <Input
              placeholder="Введите местонахождение залога"
              value={data.pledgeSubject.location || ""}
              onChange={(e) => setPledgeSubject({ location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm text-gray-600">
              Описание залога
            </label>
            <Textarea
              placeholder="Введите описание залога"
              value={data.pledgeSubject.description}
              onChange={(e) =>
                setPledgeSubject({ description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
