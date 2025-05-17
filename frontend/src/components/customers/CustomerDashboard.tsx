"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DataTable } from "@/components/common/Table"
import { SearchInput } from "@/components/common/SearchInput"
import { Tabs } from "@/components/common/Tabs"
import { useDebounce } from "@/hooks/useDebounce"
import { ColumnDef } from "@tanstack/react-table"
import Chip from "@/components/common/Chip"
import { Modal } from "@/components/common/Modal"
import CustomerDetails from "@/components/customers/CustomerDetails"
import { Customer } from "@/types/customer"

interface CustomerDashboardProps {
  customers: Customer[];
  loading: boolean;
}

const statusTabs = [
  { id: "all", label: "All Customers" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" }
]

export default function CustomerDashboard(props: CustomerDashboardProps) {
  const { customers, loading } = props;
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const initialStatus = searchParams.get("status") || "all"
  const initialSearch = searchParams.get("name") || ""
  
  const [activeTab, setActiveTab] = useState(initialStatus)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  
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
    
    if (debouncedSearchQuery) {
      params.set("name", debouncedSearchQuery)
    }
    
    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : window.location.pathname
    
    // Update URL without refreshing the page
    router.push(newUrl, { scroll: false })
  }, [activeTab, debouncedSearchQuery, router, isInitialLoad])
  
  const columns: ColumnDef<Customer, any>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
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
          <Chip chipColor={row.original.status === "active" ? "green" : "red"}>
            {row.original.status === "active" ? "Active" : "Inactive"}
          </Chip>
        ),
      },
    ],
    []
  )
  
  // Filter data based on active tab and debounced search query
  const filteredData = useMemo(() => {
    return customers
      .filter((customer) => {
        if (activeTab !== "all") {
          return customer.status === activeTab
        }
        return true
      })
      .filter((customer) => {
        if (debouncedSearchQuery) {
          return customer.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        }
        return true
      })
  }, [customers, activeTab, debouncedSearchQuery])

  // Handlers for filter changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      
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
      
      <div className="flex-1 min-h-0">
        <DataTable 
          columns={columns} 
          data={filteredData} 
          loading={loading}
          onRowClick={setSelectedCustomer}
        />
      </div>

      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title="Customer Details"
      >
        <CustomerDetails customer={selectedCustomer} />
      </Modal>
    </div>
  )
}