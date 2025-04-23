import { PledgorsList } from "../../features/PledgorsList/ui";


const PledgorsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 pl-6 pt-2.5 m-0">Залогодержатели</h1>
      <PledgorsList />
    </>
  );
};

export default PledgorsPage;
