import { Button, Input } from "../../../shared/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../shared/ui/select";
import { usePledgeStore } from "../model/store";

export default function Step2() {
  const {
    pledgorType,
    setField,
    individualList,
    legalList,
    addIndividual,
    addLegal,
  } = usePledgeStore();

  return (
    <div className="space-y-6">
      {/* Выбор типа залогодателя */}
      <div>
        <label className="block mb-1">Тип залогодателя</label>
        <Select
          defaultValue={pledgorType}
          onValueChange={(v: any) => setField({ pledgorType: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип залогодателя" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Физическое лицо</SelectItem>
            <SelectItem value="legal">Юридическое лицо</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Физические лица */}
      {pledgorType === "individual" &&
        individualList.map((pl, idx) => (
          <div key={pl.id} className="space-y-4">
            {/* Строка 1 */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Фамилия"
                value={pl.lastName}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].lastName = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Input
                placeholder="Имя"
                value={pl.firstName}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].firstName = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Input
                placeholder="Отчество"
                value={pl.patronymic}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].patronymic = e.target.value;
                  setField({ individualList: copy });
                }}
              />
            </div>
            {/* Строка 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Введите ИНН"
                value={pl.inn}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].inn = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Input
                type="date"
                placeholder="MM/DD/YYYY"
                value={pl.birthDate}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].birthDate = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Input
                placeholder="Номер, серия паспорта"
                value={pl.passportSeries}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].passportSeries = e.target.value;
                  setField({ individualList: copy });
                }}
              />
            </div>
            {/* Строка 3 */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Кем выдан"
                value={pl.passportIssuedBy}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].passportIssuedBy = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Input
                type="date"
                placeholder="MM/DD/YYYY"
                value={pl.passportIssueDate}
                onChange={(e) => {
                  const copy = [...individualList];
                  copy[idx].passportIssueDate = e.target.value;
                  setField({ individualList: copy });
                }}
              />
              <Select
                defaultValue={pl.maritalStatus}
                onValueChange={(v: string) => {
                  const copy = [...individualList];
                  copy[idx].maritalStatus = v;
                  setField({ individualList: copy });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Семейное положение" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Не женат/Не замужем</SelectItem>
                  <SelectItem value="married">Женат/Замужем</SelectItem>
                  <SelectItem value="divorced">Разведён/Разведена</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      {pledgorType === "individual" && (
        <Button variant="outline" onClick={addIndividual}>
          + Добавить залогодателя
        </Button>
      )}

      {/* Юридические лица */}
      {pledgorType === "legal" &&
        legalList.map((pl, idx) => (
          <div key={pl.id} className="grid grid-cols-4 gap-4">
            {/* Строка 1 */}
            <Input
              placeholder="Введите наименование ЮЛ"
              value={pl.companyName}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].companyName = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Введите ИНН"
              value={pl.inn}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].inn = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Введите учредительный документ"
              value={pl.charterDocument}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].charterDocument = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              value={pl.registrationDate}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].registrationDate = e.target.value;
                setField({ legalList: copy });
              }}
            />

            {/* Строка 2 */}
            <Input
              placeholder="ФИО уполномоченного лица"
              value={pl.representativeName}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].representativeName = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Введите ИНН"
              value={pl.representativeInn}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].representativeInn = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              value={pl.repBirthDate}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].repBirthDate = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Номер, серия паспорта"
              value={pl.repPassportSeries}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].repPassportSeries = e.target.value;
                setField({ legalList: copy });
              }}
            />

            {/* Строка 3 */}
            <Input
              placeholder="MM/DD/YYYY"
              type="date"
              value={pl.repPassportIssueDate}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].repPassportIssueDate = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Кем выдан"
              value={pl.repPassportIssuedBy}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].repPassportIssuedBy = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Введите должность"
              value={pl.position}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].position = e.target.value;
                setField({ legalList: copy });
              }}
            />
            <Input
              placeholder="Введите документ"
              value={pl.document}
              onChange={(e) => {
                const copy = [...legalList];
                copy[idx].document = e.target.value;
                setField({ legalList: copy });
              }}
            />
          </div>
        ))}
      {pledgorType === "legal" && (
        <Button variant="outline" onClick={addLegal}>
          + Добавить залогодателя
        </Button>
      )}
    </div>
  );
}
