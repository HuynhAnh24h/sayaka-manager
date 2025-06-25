import { useState, useMemo } from "react";

const DataTableWithPagination = ({ data, columns, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-2 font-semibold text-white text-lg">
                {col.label} 
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex items-center justify-between px-2">
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="border rounded-md px-2 py-1 text-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
           <span>Trái</span>
          </button>
          <button
            className="border rounded-md px-2 py-1 text-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <span>Phải</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableWithPagination;
