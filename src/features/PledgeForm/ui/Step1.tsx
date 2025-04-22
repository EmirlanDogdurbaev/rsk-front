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
  const { data, setField, setPledgors, setPledgeSubject } = usePledgeStore();

  const list = [{ eni1: "12312331" }, { eni1: "12312332" }];

  const handleEniSelect = (value: string) => {
    setField("eniCode", value);
  };

  const handleInnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("inn", e.target.value);
  };

  const handleCheck = () => {
    const mockResponse = {
      eniCode: data.eniCode,
      inn: "123456789012",
      pledgors: [
        {
          type: "individual",
          lastName: "Иванов",
          firstName: "Иван",
          middleName: "Иванович",
          inn: "123456789012",
          passport: "AB123456",
          birthDate: "01/01/1990",
          issuedBy: "УВД г. Алматы",
          passportIssueDate: "01/01/2010",
        },
      ],
      pledgeSubject: {
        name: "Автомобиль",
        description: "Toyota Camry 2020",
        location: "Алматы, ул. Абая 10",
      },
    };

    if (mockResponse.eniCode === data.eniCode) {
      setField("inn", mockResponse.inn);
      setPledgors(mockResponse.pledgors);
      setPledgeSubject(mockResponse.pledgeSubject);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Проверка залога</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm text-gray-600">Код ЕНИ</label>
          <div className="flex items-center space-x-2">
            <Select value={data.eniCode} onValueChange={handleEniSelect}>
              <SelectTrigger className="w-full">
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
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            ИНН залогодателя
          </label>
          <Input
            value={data.inn}
            onChange={handleInnChange}
            placeholder="Введите ИНН залогодателя"
          />
        </div>
      </div>
      <Button className="w-full bg-blue-600 text-white" onClick={handleCheck}>
        Проверить в базе
      </Button>
    </div>
  );
}
