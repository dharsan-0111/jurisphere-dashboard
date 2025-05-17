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
import { Skeleton } from "./Skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({ 
  columns, 
  data,
  loading = false,
  onRowClick
}: DataTableProps<TData, TValue>) {
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

  // Generate skeleton rows based on page size
  const skeletonRows = Array.from({ length: table.getState().pagination.pageSize }, (_, index) => (
    <tr
      key={`skeleton-${index}`}
      className={`border-b border-[#F2F2F2] ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
    >
      {columns.map((_, cellIndex) => (
        <td key={`skeleton-cell-${cellIndex}`} className="p-4">
          <Skeleton className="h-4 w-3/4" />
        </td>
      ))}
    </tr>
  ))

  const renderTableBody = () => {
    if (loading) {
      return skeletonRows
    }

    if (data.length === 0) {
      return (
        <tr>
          <td 
            colSpan={columns.length} 
            className="h-[400px]"
          >
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              No data available
            </div>
          </td>
        </tr>
      )
    }

    return table.getRowModel().rows.map((row, index) => (
      <tr
        key={row.id}
        className={`border-b border-[#F2F2F2] hover:bg-gray-50 transition-colors cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
        onClick={() => onRowClick?.(row.original)}
      >
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="p-4 text-gray-700 truncate">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#F2F2F2] bg-[#F9FBFC] rounded-t-md">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium text-black select-none"
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
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - sticky to bottom */}
      <div className="sticky bottom-0 bg-white mt-auto">
        <Pagination table={table} />
      </div>
    </div>
  )
}
