"use client"

import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    <div className="flex items-center justify-between py-3 px-2">
      {/* Previous button */}
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="p-1 rounded text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1 mx-auto">
        {pageNumbers.map((pageIndex, i) => {
          // Render ellipsis
          if (pageIndex === -1) {
            return <span key={`ellipsis-${i}`} className="px-1 text-gray-500">...</span>
          }
          
          const isActive = currentPage === pageIndex
          
          return (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={`h-7 w-7 flex items-center justify-center text-sm rounded ${
                isActive 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={`Page ${pageIndex + 1}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageIndex + 1}
            </button>
          )
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="p-1 rounded text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
} 