import { FaFileExcel } from "react-icons/fa"; // Excel icon from react-icons
import LoadingSpinner from "./LoadingSpinner";
import Button, { IButtonProps } from "./Button";

export interface IPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

const Pagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
}: IPaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex justify-between items-center mt-4 px-4 py-2 bg-gray-100 border-t border-gray-300">
      <div className="text-sm text-gray-700">
        Showing {startItem} - {endItem} of {totalItems}
      </div>

      <div className="flex items-center gap-3">
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border px-2 py-1 rounded text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        )}

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export interface IColumSchema<T> {
  key: keyof T;
  title: string;
  format?: (value: T[keyof T]) => string | number;
}

export interface ITableProps<T> {
  // Define any props if needed in the future
  dataSource: T[];
  columnSchema: IColumSchema<T>[];
  upperHeader?: { title: string; buttonProps: IButtonProps };
  isFetchingDataSource?: boolean;
  paginationProps?: IPaginationProps;
}
export default function Table<T>({
  dataSource,
  columnSchema,
  upperHeader,
  isFetchingDataSource = false,
  paginationProps,
}: ITableProps<T>) {
  return (
    <>
      {/* Upper Header */}
      <div className="flex justify-between items-center sticky top-0 bg-gray-100 border-b border-gray-300 py-3.5 px-4 z-20">
        <h2 className="font-semibold text-gray-800 -tracking-wider">
          {upperHeader?.title}
        </h2>
        <div className="flex justify-center items-center gap-4 ">
          <h2 className="font-semibold text-gray-700 space-x-2">
            <span className="text-gray-800">TOTAL:</span>
            <span className="text-blue-600 font-bold">
              {paginationProps ? paginationProps.totalItems : dataSource.length}
            </span>
          </h2>
          <Button
            onClick={upperHeader?.buttonProps.onClick}
            isSubmitting={upperHeader?.buttonProps.isSubmitting}
            mode={upperHeader?.buttonProps.mode ?? "primary"}
          >
            <FaFileExcel />
            {upperHeader?.buttonProps.children}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)] border border-gray-300">
        {/* Table */}
        <table className="min-w-full border-collapse text-sm text-gray-800">
          <thead className="bg-gray-200 text-gray-900 sticky top-0 z-10">
            <tr>
              {columnSchema?.map((column, key) => (
                <th
                  key={key}
                  className="border border-gray-300 px-3 py-2 text-left font-semibold bg-gray-200 "
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {dataSource?.length ? (
              dataSource.map((row, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-yellow-50 hover:font-semibold hover:cursor-pointer"
                >
                  {columnSchema?.map((column, key) => (
                    <td key={key} className="border border-gray-300 px-3 py-2">
                      {column.format
                        ? column.format(row[column.key])
                        : String(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : isFetchingDataSource ? (
              <tr>
                <td colSpan={columnSchema?.length} className="p-4">
                  <LoadingSpinner name="fetching data..." />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={columnSchema?.length} className="p-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {paginationProps && (
        <Pagination
          currentPage={paginationProps.currentPage}
          pageSize={paginationProps.pageSize}
          totalItems={paginationProps.totalItems}
          onPageChange={paginationProps.onPageChange}
          onPageSizeChange={paginationProps.onPageSizeChange}
          pageSizeOptions={paginationProps.pageSizeOptions}
        />
      )}
    </>
  );
}
