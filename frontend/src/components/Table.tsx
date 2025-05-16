"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Pagination } from "./Pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  })

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col border border-gray-200 overflow-hidden bg-white rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium text-gray-600 select-none"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="mr-2 truncate">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        <div className="w-4 flex-shrink-0">
                          {header.column.getCanSort() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ChevronUp size={14} className="text-gray-700" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown size={14} className="text-gray-700" />
                            ) : (
                              <div className="flex flex-col">
                                <ChevronUp size={10} className="text-gray-400 -mb-1" />
                                <ChevronDown size={10} className="text-gray-400" />
                              </div>
                            )
                          ) : null}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="overflow-y-auto">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700 truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - sticky to bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-auto">
        <Pagination table={table} />
      </div>
    </div>
  )
}
