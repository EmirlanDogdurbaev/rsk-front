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
import { memo } from "react";
import { IndividualPledgor, LegalEntityPledgor } from "../model/store";

type PledgorCardProps = {
  index: number;
  pledgor: IndividualPledgor | LegalEntityPledgor;
  updatePledgor: (
    index: number,
    value: Partial<PledgorCardProps["pledgor"]>
  ) => void;
  removePledgor: (index: number) => void;
  canRemove: boolean;
};

const PledgorCardComponent = ({
  index,
  pledgor,
  updatePledgor,
  removePledgor,
  canRemove,
}: PledgorCardProps) => {
  console.log(`Rendering PledgorCard #${index + 1} with type: ${pledgor.type}`);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
          Залогодатель #{index + 1}
        </h2>
        {canRemove && (
          <Button
            variant="outline"
            style={{
              color: "red",
              borderColor: "red",
              backgroundColor: "transparent",
            }}
            onClick={() => removePledgor(index)}
          >
            Удалить
          </Button>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Выберите тип залогодателя
        </label>
        <Select
          value={pledgor.type}
          onValueChange={(value) =>
            updatePledgor(index, { type: value as "individual" | "legal" })
          }
        >
          <SelectTrigger style={{ width: "100%" }}>
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Физическое лицо</SelectItem>
            <SelectItem value="legal">Юридическое лицо</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {pledgor.type === "individual" ? (
        <IndividualPledgorForm
          index={index}
          pledgor={pledgor as IndividualPledgor}
          updatePledgor={updatePledgor}
        />
      ) : (
        <LegalPledgorForm
          index={index}
          pledgor={pledgor as LegalEntityPledgor}
          updatePledgor={updatePledgor}
        />
      )}
    </div>
  );
};

export const PledgorCard = memo(
  PledgorCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.pledgor === nextProps.pledgor &&
      prevProps.index === nextProps.index &&
      prevProps.canRemove === nextProps.canRemove
    );
  }
);
