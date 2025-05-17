"use client"

import { Search } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search..."
}: SearchInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg max-h-9 text-sm text-[#181D27] placeholder-[#717680] focus:border-[#9E77ED] focus:outline-none focus:ring-1 focus:ring-[#9E77ED] shadow-xs"
        placeholder={placeholder}
      />
    </div>
  )
} 