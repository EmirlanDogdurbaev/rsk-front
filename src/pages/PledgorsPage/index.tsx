import { PledgorsList } from "../../features/PledgorsList/ui";

const PledgorsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Залогодержатели</h1>
      <PledgorsList />
    </>
  );
};

export default PledgorsPage;
