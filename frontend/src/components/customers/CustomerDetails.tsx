"use client"

import { useState } from "react"
import type { Customer } from "@/types/customer"
import { Copy, Check, Mail, Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"
import Chip from "../common/Chip"

interface CustomerDetailsProps {
  customer: Customer | null
}

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  if (!customer) return null

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(customer.email)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{customer.name}</h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <span>Customer ID: {customer.id}</span>
          </div>
        </div>
        <div>
          <Chip chipColor={customer.status === "active" ? "green" : "red"} className="rounded-full">    
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </Chip>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Mail size={16} className="mr-2" />
              <span>Email Address</span>
            </div>
            <div className="flex items-center group">
              <span className="text-gray-900 font-medium">{customer.email}</span>
              <button
                onClick={handleCopyEmail}
                className="ml-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer"
                title="Copy email"
              >
                {copySuccess ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>Customer Since</span>
            </div>
            <div className="text-gray-900 font-medium">{format(new Date(customer.joined_at), "MMMM d, yyyy")}</div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2" />
              <span>Address</span>
            </div>
            <div className="text-gray-900">{customer.address || "No address provided"}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 tracking-wider">Notes</h3>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          {customer.notes ? (
            <p className="text-gray-700 whitespace-pre-line">{customer.notes}</p>
          ) : (
            <p className="text-gray-500 italic">No notes available for this customer.</p>
          )}
        </div>
      </div>
    </div>
  )
}
