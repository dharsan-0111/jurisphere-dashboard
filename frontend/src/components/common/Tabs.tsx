"use client"

import Button from "./Button";

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex h-8 space-x-1 bg-[#F1F3F4] rounded-md p-1">
      {tabs.map((tab) => (
        <Button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        variant="tabs"
        active={activeTab === tab.id}
        className="px-4 text-sm font-medium relative h-full"
        style={{ transition: "color 0.15s ease" }}
      >
        {tab.label}
      </Button>
      ))}
    </div>
  )
} 