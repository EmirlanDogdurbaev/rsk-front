import { Input } from "../../../shared/ui/input";
import { LegalEntityPledgor } from "../model/store";

type LegalPledgorFormProps = {
  index: number;
  pledgor: LegalEntityPledgor;
  updatePledgor: (index: number, value: Partial<LegalEntityPledgor>) => void;
};

export function LegalPledgorForm({
  index,
  pledgor,
  updatePledgor,
}: LegalPledgorFormProps) {
  // const { updatePledgor: storeUpdatePledgor } = usePledgeStore();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      updatePledgor(index, { [field]: file });
    }
  };

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
          Наименование ЮЛ *
        </label>
        <Input
          value={pledgor.company_name}
          onChange={(e) =>
            updatePledgor(index, { company_name: e.target.value })
          }
          placeholder="Введите название"
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
          value={pledgor.company_inn}
          onChange={(e) =>
            updatePledgor(index, { company_inn: e.target.value })
          }
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
          Учредительный документ *
        </label>
        <Input
          value={pledgor.founding_document}
          onChange={(e) =>
            updatePledgor(index, { founding_document: e.target.value })
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
          Дата регистрации *
        </label>
        <Input
          type="date"
          value={pledgor.registration_date}
          onChange={(e) =>
            updatePledgor(index, { registration_date: e.target.value })
          }
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
          ФИО уполномоченного лица *
        </label>
        <Input
          value={pledgor.authorized_person_full_name}
          onChange={(e) =>
            updatePledgor(index, {
              authorized_person_full_name: e.target.value,
            })
          }
          placeholder="Введите ФИО"
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
          ИНН уполномоченного лица *
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
      <div style={{ marginTop: "10px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Должность *
        </label>
        <Input
          value={pledgor.position}
          onChange={(e) => updatePledgor(index, { position: e.target.value })}
          placeholder="Введите должность"
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
          Документ уполномоченного лица
        </label>
        <Input
          type="file"
          onChange={(e) => handleFileChange(e, "person_document")}
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
          Фото с паспортом
        </label>
        <Input
          type="file"
          onChange={(e) => handleFileChange(e, "with_passport_photo")}
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
