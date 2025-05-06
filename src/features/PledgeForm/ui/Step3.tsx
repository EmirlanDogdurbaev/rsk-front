import { usePledgeStore } from "../model/store";
import { Button } from "../../../shared/ui";
import { Input } from "../../../shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";

const collateralTypes = [
  { id: 1, name: "Автомобиль" },
  { id: 2, name: "Недвижимость" },
  { id: 3, name: "Оборудование" },
];

const regions = [
  { id: 1, name: "Москва" },
  { id: 2, name: "Санкт-Петербург" },
  { id: 3, name: "Казань" },
];

const districts = [
  { id: 1, name: "Центральный" },
  { id: 2, name: "Северный" },
  { id: 3, name: "Южный" },
];

export default function Step3() {
  const { data, updateCollateral, submitPledge } = usePledgeStore();

  return (
    <div className="px-0 py-6 space-y-6">
      <h1 className="text-xl font-bold">Шаг 3: Создание залога</h1>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Код ЕНИ *
        </label>
        <Input
          value={data.collateral.eni_code}
          onChange={(e) => updateCollateral({ eni_code: e.target.value })}
          placeholder="Введите код ЕНИ"
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
          Город/Село *
        </label>
        <Input
          value={data.collateral.city}
          onChange={(e) => updateCollateral({ city: e.target.value })}
          placeholder="Введите город/село"
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
          Улица *
        </label>
        <Input
          value={data.collateral.street}
          onChange={(e) => updateCollateral({ street: e.target.value })}
          placeholder="Введите улицу"
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
          № дома *
        </label>
        <Input
          value={data.collateral.house_number}
          onChange={(e) => updateCollateral({ house_number: e.target.value })}
          placeholder="Введите номер дома"
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
          Залоговая стоимость
        </label>
        <Input
          type="number"
          value={data.collateral.collateral_value || ""}
          onChange={(e) =>
            updateCollateral({ collateral_value: e.target.value })
          }
          placeholder="Введите стоимость"
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
          Залоговый коэффициент
        </label>
        <Input
          type="number"
          step="0.01"
          value={data.collateral.collateral_coefficient || ""}
          onChange={(e) =>
            updateCollateral({ collateral_coefficient: e.target.value })
          }
          placeholder="Введите коэффициент"
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
          Предмет залога *
        </label>
        <Select
          value={data.collateral.collateral_type.toString()}
          onValueChange={(value) =>
            updateCollateral({ collateral_type: Number(value) })
          }
        >
          <SelectTrigger style={{ width: "100%" }}>
            <SelectValue placeholder="Выберите предмет залога" />
          </SelectTrigger>
          <SelectContent>
            {collateralTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          Область *
        </label>
        <Select
          value={data.collateral.region.toString()}
          onValueChange={(value) => updateCollateral({ region: Number(value) })}
        >
          <SelectTrigger style={{ width: "100%" }}>
            <SelectValue placeholder="Выберите область" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id.toString()}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          Район *
        </label>
        <Select
          value={data.collateral.district.toString()}
          onValueChange={(value) =>
            updateCollateral({ district: Number(value) })
          }
        >
          <SelectTrigger style={{ width: "100%" }}>
            <SelectValue placeholder="Выберите район" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.id.toString()}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full bg-blue-600 text-white"
        onClick={() => submitPledge()}
      >
        Отправить запрос
      </Button>
    </div>
  );
}
