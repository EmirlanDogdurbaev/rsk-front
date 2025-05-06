import { useState } from "react";
// import { usePledgeStore } from "../../../features/PledgeForm/model/store";
import { Button } from "../../../shared/ui";
import Step1 from "../../../features/PledgeForm/ui/Step1";
import Step2 from "../../../features/PledgeForm/ui/Step2";
import Step3 from "../../../features/PledgeForm/ui/Step3";

export default function CollateralCreate() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
   
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl  mb-4 font-bold">Создание залога</h1>
      <div className="space-y-3 bg-white/50 p-14">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium rounded-sm  ${
              step === 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setStep(1)}
          >
            <span className="inline-flex items-center justify-center">
              <span
                className={`mr-2 h-5 w-5 rounded-full flex items-center justify-center ${
                  step === 1
                    ? "bg-white text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </span>
              Проверка залога
            </span>
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium rounded-sm  ${
              step === 2
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setStep(2)}
          >
            <span className="inline-flex items-center justify-center">
              <span
                className={`mr-2 h-5 w-5  flex items-center justify-center rounded-sm ${
                  step === 2
                    ? "bg-white text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
              Сведения о залогодателе
            </span>
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium rounded-sm ${
              step === 3
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setStep(3)}
          >
            <span className="inline-flex items-center justify-center">
              <span
                className={`mr-2 h-5 w-5 rounded-full flex items-center justify-center ${
                  step === 3
                    ? "bg-white text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </span>
              Сведения о залоге
            </span>
          </button>
        </div>

        <div className="w-full">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
           {step === 3 && <Step3 />} 
        </div>

        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
            className="text-blue-600 border-blue-600"
          >
            ← Назад
          </Button>
          <div className="space-x-2">
            <Button variant="outline" className="text-gray-600 border-gray-300">
              Отмена
            </Button>
            {step < 3 ? (
              <Button onClick={nextStep} className="bg-blue-600 text-white">
                Вперед →
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-blue-600 text-white">
                Сохранить
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
