import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { usePledgeStore } from "../model/store";
import { Button, Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

export default function Step3() {
  const { data, setPledgeSubject, setField } = usePledgeStore();
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<number, number>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(
        (file) => file.size <= 10 * 1024 * 1024
      );
      setFiles((prev) => [...prev, ...validFiles]);
      validFiles.forEach((_, i) => {
        const index = files.length + i;
        setProgress((prev) => ({ ...prev, [index]: 0 }));
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const handleEniCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setField("eniCode", value);
    }
  };

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    files.forEach((_, index) => {
      if (progress[index] !== undefined && progress[index] < 100) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = { ...prev };
            const currentProgress = newProgress[index] || 0;
            newProgress[index] = Math.min(currentProgress + 10, 100);
            return newProgress;
          });
        }, 500);
        intervals.push(interval);
      }
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [files, progress]);

  return (
    <div className="p-6 space-y-6">
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
            <div className="relative">
              <Input
                placeholder="Введите код ЕНИ"
                value={data.eniCode}
                onChange={handleEniCodeChange}
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-2 top-2 h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div>
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
            <Input
              placeholder="Введите описание залога"
              value={data.pledgeSubject.description}
              onChange={(e) =>
                setPledgeSubject({ description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border border-gray-300 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      progress[index] === 100
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {file.name} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
                {progress[index] !== 100 && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress[index] || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {progress[index] || 0}% Загружается
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
          <label className="block text-sm text-gray-600">
            Загрузить правоустанавливающие документы
          </label>
          <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600">Кликните, чтобы загрузить</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOCX, TXT • до 10 MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
