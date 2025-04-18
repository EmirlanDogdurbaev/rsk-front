import { useState } from "react";
import { Button, Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

import { usePledgeStore } from "../model/store";

export default function Step1() {
  const eniCodeCheck = usePledgeStore((s) => s.eniCodeCheck);
  const setField = usePledgeStore((s) => s.setField);

  const list = [{ eni1: "12312331" }, { eni1: "12312332" }];

  const [selectedCode, setSelectedCode] = useState<string>("");
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block mb-1">Код ЕНИ</label>
          <Select
            defaultValue={selectedCode}
            onValueChange={(v: string) => setSelectedCode(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите код ЕНИ" />
            </SelectTrigger>
            <SelectContent>
              {list.map((item) => (
                <SelectItem key={item.eni1} value={item.eni1}>
                  {item.eni1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1">ИНН залогодателя</label>
          <Input placeholder="Введите ИНН залогодателя" />
        </div>
      </div>
      <Button className="w-full" onClick={() => console.log("Проверяем…")}>
        Проверить в базе
      </Button>
    </div>
  );
}
