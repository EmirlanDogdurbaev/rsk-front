type BorrowersPaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function BorrowersPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: BorrowersPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-end mt-4">
      <span className="text-sm text-gray-600 mr-4">
        {startItem}–{endItem} из {totalItems}
      </span>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm text-gray-600 disabled:opacity-50"
      >
        Назад
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm text-blue-600 disabled:opacity-50"
      >
        Вперёд
      </button>
    </div>
  );
}
