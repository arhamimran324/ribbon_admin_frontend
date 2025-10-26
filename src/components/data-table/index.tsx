// import { Icon } from "@iconify/react";
import { FC } from "react";

// import ReactPaginate from "react-paginate";

const DataTable: FC<any> = ({
  loading,
  tableRows,
  rowsPerPage,
  ColumnsData,
  TableBodyRow,
  isUserList = false,
}) => {
  return (
    <div className={`w-full overflow-x-auto`}>
      <table className="min-w-[600px] sm:min-w-full">
        <thead className={`${isUserList ? "rounded-none" : "rounded-[12px] "}`}>
          <tr className={`${isUserList ? "bg-white" : "bg-primary-gradient"}`}>
            {ColumnsData?.map((column: any, index: number) => (
              <th
                key={index}
                className={`py-4 font-semibold ${index === 0 || column.label === "Email" ? "text-left" : "text-right pr-9"} whitespace-nowrap tracking-wider ${
                  column?.id === "action" && "opacity-0"
                } ${isUserList ? "text-secondary-text-gray" : "text-white"} text-md`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        {/* <tbody>
          {!loading && tableRows?.map((item: any) => <TableBodyRow key={item._id} {...item} />)}
          {loading &&
            [...Array(rowsPerPage)]?.map((__, idx) => (
              <tr key={idx} className="border-b !border-gray">
                {[...Array(ColumnsData?.length || 4)].map((_, index) => (
                  <td key={index} className="px-4 py-7">
                    <div className="w-full h-4 !bg-light-gray rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody> */}
        <tbody>
          {!loading &&
            tableRows?.map((item: any, rowIdx: number) => (
              <TableBodyRow key={item._id || `row-${rowIdx}`} {...item} />
            ))}
          {loading &&
            [...Array(rowsPerPage)]?.map((__, idx) => (
              <tr key={`loading-row-${idx}`} className="border-b !border-gray">
                {[...Array(ColumnsData?.length || 4)].map((_, index) => (
                  <td key={`loading-col-${idx}-${index}`} className="px-4 py-7">
                    <div className="w-full h-4 !bg-light-gray rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>

        {!loading && tableRows?.length === 0 && (
          <tbody>
            <tr>
              <td
                colSpan={ColumnsData.length + 1}
                className="py-6 font-semibold text-center"
              >
                No data found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataTable;
