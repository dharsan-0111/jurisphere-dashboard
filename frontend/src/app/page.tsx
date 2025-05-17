"use client"

import { useCustomers } from "@/hooks/query/useCustomers"
import CustomerDashboard from "@/components/customers/CustomerDashboard"

export default function CustomersPage() {
  const { data: customers = [], isLoading, error } = useCustomers()

  if (error) {
    return <div className="h-screen p-4 flex items-center justify-center">Error: {error.message}</div>
  }

  return (
    <CustomerDashboard
      customers={customers}
      loading={isLoading}
    />
  )
}