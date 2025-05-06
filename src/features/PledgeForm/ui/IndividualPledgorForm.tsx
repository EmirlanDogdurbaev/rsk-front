import { Input } from "../../../shared/ui/input";
import { useEffect, useState } from "react";
import { IndividualPledgor } from "../model/store";

type IndividualPledgorFormProps = {
  index: number;
  pledgor: IndividualPledgor;
  updatePledgor: (index: number, value: Partial<IndividualPledgor>) => void;
};

export function IndividualPledgorForm({
  index,
  pledgor,
  updatePledgor,
}: IndividualPledgorFormProps) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");

  useEffect(() => {
    if (pledgor.full_name) {
      const parts = pledgor.full_name.split(" ");
      setLastName(parts[0] || "");
      setFirstName(parts[1] || "");
      setMiddleName(parts[2] || "");
    }
  }, []);

  useEffect(() => {
    const fullName = [lastName, firstName, middleName]
      .filter(Boolean)
      .join(" ");
    if (fullName !== pledgor.full_name) {
      updatePledgor(index, { full_name: fullName });
    }
  }, [
    lastName,
    firstName,
    middleName,
    index,
    pledgor.full_name,
    updatePledgor,
  ]);

  return (
    <div style={{ marginTop: "10px" }}>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Фамилия *
        </label>
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Введите фамилию"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Имя *
        </label>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Введите имя"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Отчество
        </label>
        <Input
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          placeholder="Введите отчество"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          ИНН *
        </label>
        <Input
          value={pledgor.inn}
          onChange={(e) => updatePledgor(index, { inn: e.target.value })}
          placeholder="Введите ИНН"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Дата рождения *
        </label>
        <Input
          type="date"
          value={pledgor.birth_date}
          onChange={(e) => updatePledgor(index, { birth_date: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Серия паспорта *
        </label>
        <Input
          value={pledgor.passport_series}
          onChange={(e) =>
            updatePledgor(index, { passport_series: e.target.value })
          }
          placeholder="Введите серию"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Номер паспорта *
        </label>
        <Input
          value={pledgor.passport_number}
          onChange={(e) =>
            updatePledgor(index, { passport_number: e.target.value })
          }
          placeholder="Введите номер"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Кем выдан *
        </label>
        <Input
          value={pledgor.passport_issued_by}
          onChange={(e) =>
            updatePledgor(index, { passport_issued_by: e.target.value })
          }
          placeholder="Введите данные"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
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
          Дата выдачи *
        </label>
        <Input
          type="date"
          value={pledgor.passport_issue_date}
          onChange={(e) =>
            updatePledgor(index, { passport_issue_date: e.target.value })
          }
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
