import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui";

export function PledgorsHeader() {
  const navigate = useNavigate();

  const handleAddPledgor = () => {
    navigate("/pledgors/add");
  };

  return (
    <div className="flex justify-between items-center ">
      <Button
        className="bg-blue-600 text-white px-4 py-4 rounded-lg hover:bg-blue-700"
        onClick={handleAddPledgor}
      >
        Добавить залогодателя
      </Button>
    </div>
  );
}
