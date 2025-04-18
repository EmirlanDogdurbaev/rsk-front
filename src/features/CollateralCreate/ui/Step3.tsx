import { Input } from "../../../shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { Textarea } from "../../../shared/ui/textarea";
import { usePledgeStore } from "../model/store";

export default function Step3() {
  const { collateral, setField } = usePledgeStore();

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setField({
      collateral: { ...collateral, files: Array.from(e.target.files) },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Предмет залога</label>
          <Select
            value={collateral.subject}
            onValueChange={(v) =>
              setField({ collateral: { ...collateral, subject: v } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите предмет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realty">Недвижимость</SelectItem>
              <SelectItem value="vehicle">Транспорт</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1">Код ЕНИ</label>
          <Input
            placeholder="Введите код ЕНИ"
            value={collateral.eniCode}
            onChange={(e) =>
              setField({
                collateral: { ...collateral, eniCode: e.target.value },
              })
            }
          />
        </div>
      </div>

      <Input
        placeholder="Местонахождение залога"
        value={collateral.location}
        onChange={(e) =>
          setField({ collateral: { ...collateral, location: e.target.value } })
        }
      />

      <Textarea
        placeholder="Описание залога"
        value={collateral.description}
        onChange={(e) =>
          setField({
            collateral: { ...collateral, description: e.target.value },
          })
        }
      />

      <div>
        <label className="block mb-1">Документы</label>
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          onChange={onFiles}
        />
        <ul className="mt-2 space-y-1 text-sm">
          {collateral.files.map((f) => (
            <li key={f.name}>
              {f.name} ({(f.size / 1024 ** 2).toFixed(2)} MB)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
