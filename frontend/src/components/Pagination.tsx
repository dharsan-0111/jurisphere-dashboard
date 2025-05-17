"use client"

import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./Button"

interface PaginationProps<TData> {
  table: Table<TData>
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()
  
  // Generate page numbers with proper logic for ellipsis
  const getPageNumbers = () => {
    // If 7 or fewer pages, show all
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }
    
    // Always include first and last page
    const pages = [0, totalPages - 1]
    
    // Always include current and adjacent pages
    ;[-1, 0, 1].forEach(offset => {
      const page = currentPage + offset
      if (page > 0 && page < totalPages - 1) {
        pages.push(page)
      }
    })
    
    // Sort and dedupe
    const sortedUniquePages = [...new Set(pages)].sort((a, b) => a - b)
    
    // Add ellipsis markers (as -1) between non-consecutive pages
    const result: Array<number> = []
    for (let i = 0; i < sortedUniquePages.length; i++) {
      result.push(sortedUniquePages[i])
      if (i < sortedUniquePages.length - 1 && sortedUniquePages[i + 1] - sortedUniquePages[i] > 1) {
        result.push(-1) // -1 represents an ellipsis
      }
    }
    
    return result
  }

  const pageNumbers = getPageNumbers()
  
  return (
    <div className="flex items-center justify-center gap-4 py-3 px-2">
      {/* Previous button */}
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        variant="primary"
        className="p-1 rounded"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5 color-[#F7F9FC]" />
      </Button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageIndex, i) => {
          // Render ellipsis
          if (pageIndex === -1) {
            return <span key={`ellipsis-${i}`} className="px-1 text-gray-500">...</span>
          }
          
          const isActive = currentPage === pageIndex
          
          return (
            <Button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className="h-7 w-7 flex items-center justify-center rounded"
              variant="primary"
              active={isActive}
              aria-label={`Page ${pageIndex + 1}`}
              aria-current={isActive ? "page" : undefined}
              size="small"
            >
              {pageIndex + 1}
            </Button>
          )
        })}
      </div>

      {/* Next button */}
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        variant="primary"
        className="p-1 rounded"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5 color-[#F7F9FC]" />
      </Button>
    </div>
  )
} 