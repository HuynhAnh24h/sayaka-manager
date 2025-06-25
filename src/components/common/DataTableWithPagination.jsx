import React from "react";

const generatePageNumbers = (currentPage, totalPages) => {
    const delta = 2; // số trang hiển thị trước/sau trang hiện tại
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        range.push(i);
    }

    return range;
};


const DataTableWithServerPagination = ({
    data,
    columns,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="space-y-4">
            {/* Table */}
            <table className="w-full text-sm border rounded overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2 text-left border-b">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} className="even:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2 border-t">
                                    {row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <p className="text-sm text-gray-600">
                    Trang {currentPage} / {totalPages}
                </p>

                <div className="flex flex-wrap items-center gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        Trước
                    </button>

                    {/* Các nút số trang */}
                    {generatePageNumbers(currentPage, totalPages).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 text-sm border rounded ${page === currentPage
                                    ? "bg-blue-600 text-white font-semibold"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            </div>

        </div>
    );
};

export default DataTableWithServerPagination;
