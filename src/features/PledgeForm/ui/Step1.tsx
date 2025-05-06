import { useState } from "react";
import { usePledgeStore } from "../model/store";
import { Modal } from "./Modal";
import { Button, Input } from "../../../shared/ui";

export default function Step1() {
  const { data, setField, pledgeExists, checkPledge } = usePledgeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"exists" | "edit" | null>(null);

  const handleInnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("inn", e.target.value);
  };

  const handleEniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField("eniCode", e.target.value);
  };

  const handleCheck = async () => {
    if (!data.eniCode || !data.inn) return;

    try {
      const result = await checkPledge();
      if (result.exists) {
        setIsModalOpen(true);
        setModalType(result.innMatch ? "exists" : "edit");
      } else {
        usePledgeStore.getState().setPledgeExists(false);
      }
    } catch (error) {
      console.error("Ошибка проверки:", error);
      usePledgeStore.getState().setPledgeExists(false);
    }
  };

  const handleModalConfirm = () => {
    if (modalType === "edit") {
      usePledgeStore.getState().setPledgeExists(false);
    }
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-0 py-3 space-y-4">
      <h2 className="text-lg font-semibold">Проверка залога</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm text-gray-600">Код ЕНИ</label>
          <Input
            value={data.eniCode}
            onChange={handleEniChange}
            placeholder="Введите код ЕНИ"
            disabled={pledgeExists}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            ИНН залогодателя
          </label>
          <Input
            value={data.inn}
            onChange={handleInnChange}
            placeholder="Введите ИНН"
            disabled={pledgeExists}
          />
        </div>
      </div>
      <Button
        className="w-full bg-blue-600 text-white"
        onClick={handleCheck}
        disabled={!data.eniCode || !data.inn || pledgeExists}
      >
        Проверить в базе
      </Button>

      {pledgeExists && (
        <p className="text-red-600 text-sm mt-2">
          Залог с таким кодом ЕНИ и ИНН уже существует. Редактирование
          невозможно.
        </p>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalCancel}>
        {modalType === "exists" ? (
          <>
            <h3 className="text-lg font-semibold">Залог уже существует</h3>
            <p className="text-sm text-gray-600">
              Залог с таким кодом ЕНИ и ИНН уже зарегистрирован.
            </p>
            <Button
              variant="outline"
              onClick={handleModalCancel}
              className="border-gray-600 text-gray-600 mt-4"
            >
              Закрыть
            </Button>
          </>
        ) : modalType === "edit" ? (
          <>
            <h3 className="text-lg font-semibold">Несоответствие ИНН</h3>
            <p className="text-sm text-gray-600">
              Код ЕНИ существует, но ИНН не совпадает. Отредактировать данные?
            </p>
            <div className="space-x-2 mt-4">
              <Button
                onClick={handleModalConfirm}
                className="bg-blue-600 text-white"
              >
                Отредактировать
              </Button>
              <Button
                variant="outline"
                onClick={handleModalCancel}
                className="border-gray-600 text-gray-600"
              >
                Отмена
              </Button>
            </div>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
