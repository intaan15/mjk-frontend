import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { FaSort } from "react-icons/fa";


const Basetable = ({ data, columns }) => {
   const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="border-1 border-gray-300 rounded-xl max-h-[350px] w-full overflow-x-hidden overflow-y-auto ">
      <table className="w-full min-w-max table-auto text-left" style={{ fontFamily: '"Nunito Sans"' }}>
        <thead className="sticky z-30 top-0">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isSortable = header.column.getCanSort();
                const sortDir = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className="border-b border-[#004A76] items-center font-bold bg-[#C3E9FF]" 
                    style={{ fontFamily: '"Nunito Sans"' }}
                    onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="flex gap-1 p-2 border-blue-gray-50 items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSortable && (
  <>
                        {sortDir === "asc" && <HiSortAscending size={14} />}
                        {sortDir === "desc" && <HiSortDescending size={14} />}
                        {!sortDir && <FaSort size={14} className="text-[#033E61]" />}
                      </>
                    )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100 text-sm  ">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={`border-b text-sm font-[Nunito Sans] p-2 ${
                    ["str_dokter"].includes(cell.column.id) ? "text-center" : "text-left"
                  }`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Basetable;
