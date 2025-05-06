import { usePledgeStore } from "../model/store";
import { Button } from "../../../shared/ui";
import { PledgorCard } from ".";

export default function Step2() {
  const { data, addPledgor, updatePledgor, removePledgor, pledgeExists } =
    usePledgeStore();

  console.log(
    "Rendering Step2 with pledgors:",
    data.pledgors,
    "pledgeExists:",
    pledgeExists
  );

  return (
    <div className="px-0 py-6 space-y-6">
      <h1 className="text-xl font-bold">Шаг 2: Информация о залогодателях</h1>
      {pledgeExists && (
        <p style={{ color: "red", fontSize: "14px" }}>
          Редактирование невозможно, так как залог уже существует.
        </p>
      )}
      <div>
        {data.pledgors.map((pledgor, index) => (
          <PledgorCard
            key={index} // Используем только index, так как он уникален в массиве
            index={index}
            pledgor={pledgor}
            updatePledgor={updatePledgor}
            removePledgor={removePledgor}
            canRemove={data.pledgors.length > 1 && !pledgeExists}
          />
        ))}
      </div>
      <Button
        className="w-full bg-blue-600 text-white"
        onClick={() => {
          console.log("Button clicked, calling addPledgor");
          addPledgor("individual");
        }}
        disabled={pledgeExists}
      >
        + Добавить залогодателя
      </Button>
    </div>
  );
}
