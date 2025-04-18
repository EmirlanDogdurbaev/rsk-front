import { useMemo } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { usePledgeStore } from "../model/store";
import { Button } from "../../../shared/ui";

export default function CollateralCreate() {
  const step = usePledgeStore((s) => s.step);
  const setStep = usePledgeStore((s) => s.setStep);

  const ActiveStep = useMemo(() => {
    if (step === 1) return Step1;
    if (step === 2) return Step2;
    return Step3;
  }, [step]);

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <div className="flex rounded border overflow-hidden">
        {[
          "1 Проверка залога",
          "2 Сведения о залогодателе",
          "3 Сведения о залоге",
        ].map((label, idx) => (
          <div
            key={idx}
            className={`flex-1 text-center py-2 cursor-pointer ${
              step === idx + 1
                ? `bg-blue-600 text-white`
                : `bg-gray-100 text-gray-600`
            }`}
            onClick={() => setStep(idx + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <ActiveStep />
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
        >
          ← Назад
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Вперед →</Button>
        ) : (
          <Button onClick={() => alert("Сохраняем залог...")}>Сохранить</Button>
        )}
      </div>
    </div>
  );
}
