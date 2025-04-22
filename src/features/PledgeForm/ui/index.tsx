import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { Button } from "../../../shared/ui";
import { IndividualPledgorForm } from "./IndividualPledgorForm";
import { LegalPledgorForm } from "./LegalPledgorForm";

type PledgorCardProps = {
  index: number;
  pledgor: any;
  updatePledgor: (index: number, value: any) => void;
  removePledgor: (index: number) => void;
  canRemove: boolean;
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

export function PledgorCard({
  index,
  pledgor,
  updatePledgor,
  removePledgor,
  canRemove,
  dates,
  handleDateChange,
}: PledgorCardProps) {
  return (
    <div className="space-y-4 relative">
     
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Залогодатель №{index + 1}</h2>
        {canRemove && (
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => removePledgor(index)}
          >
            Удалить
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Выберите тип залогодателя
          </label>
          <Select
            value={pledgor.type}
            onValueChange={(value: "individual" | "legal") =>
              updatePledgor(index, { type: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Физическое лицо</SelectItem>
              <SelectItem value="legal">Юридическое лицо</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {pledgor.type === "individual" ? (
        <IndividualPledgorForm
          index={index}
          pledgor={pledgor}
          updatePledgor={updatePledgor}
          dates={dates}
          handleDateChange={handleDateChange}
        />
      ) : (
        <LegalPledgorForm
          index={index}
          pledgor={pledgor}
          updatePledgor={updatePledgor}
          dates={dates}
          handleDateChange={handleDateChange}
        />
      )}
    </div>
  );
}
