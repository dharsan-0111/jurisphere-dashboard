"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DataTable } from "@/components/Table"
import { SearchInput } from "@/components/SearchInput"
import { Tabs } from "@/components/Tabs"
import { useCustomers } from "@/hooks/query/useCustomers"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

type Customer = {
  id: string
  name: string
  email: string
  status: string
  address: string
  joined_at: string
  notes: string
}

const statusTabs = [
  { id: "all", label: "All Customers" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" }
]

export default function CustomersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const initialStatus = searchParams.get("status") || "all"
  const initialSearch = searchParams.get("name") || ""
  
  const [activeTab, setActiveTab] = useState(initialStatus)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  
  // Fetch customers
  const { data: customers = [], isLoading, error } = useCustomers()
  
  // Update URL when filters change
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }
    
    // Build new URL with filters
    const params = new URLSearchParams()
    
    if (activeTab !== "all") {
      params.set("status", activeTab)
    }
    
    if (searchQuery) {
      params.set("name", searchQuery)
    }
    
    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : window.location.pathname
    
    // Update URL without refreshing the page
    router.push(newUrl, { scroll: false })
  }, [activeTab, searchQuery, router, isInitialLoad])
  
  const columns: ColumnDef<Customer, any>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              row.original.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {row.original.status}
          </div>
        ),
      },
    ],
    []
  )
  
  // Filter data based on active tab and search query
  const filteredData = useMemo(() => {
    return customers
      .filter((customer) => {
        // Filter by status tab
        if (activeTab !== "all") {
          return customer.status === activeTab
        }
        return true
      })
      .filter((customer) => {
        // Filter by search query (name only)
        if (searchQuery) {
          return customer.name.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return true
      })
  }, [customers, activeTab, searchQuery])

  // Handlers for filter changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  if (isLoading) {
    return <div className="h-screen p-4 flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="h-screen p-4 flex items-center justify-center">Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Tabs 
          tabs={statusTabs} 
          activeTab={activeTab} 
          onChange={handleTabChange} 
        />
        
        <div className="w-full sm:w-64">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
          />
        </div>
      </div>
      
      {/* The flex-1 ensures the table takes remaining height */}
      <div className="flex-1 min-h-0">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  )
}