import { FaFileExcel } from "react-icons/fa"; // Excel icon from react-icons
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

export interface IColumSchema<T> {
  key: keyof T;
  title: string;
  format?: (value: T[keyof T]) => string;
}
export interface ITableProps<T> {
  // Define any props if needed in the future
  dataSource: T[];
  columnSchema: IColumSchema<T>[];
  upperHeader?: { title: string; buttonLabel: string; onClick: () => void };
  isFetchingDataSource?: boolean;
}
export default function Table<T>({
  dataSource,
  columnSchema,
  upperHeader,
  isFetchingDataSource = false,
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
              {dataSource?.length}
            </span>
          </h2>
          <Button onClick={upperHeader?.onClick} mode="success">
            <FaFileExcel />
            {upperHeader?.buttonLabel}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-190px)] border border-gray-300">
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
                <td colSpan={columnSchema?.length} className="text-center py-4">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={columnSchema?.length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
