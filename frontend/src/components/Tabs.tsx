"use client"

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex space-x-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`py-2 px-4 text-sm font-medium relative ${
            activeTab === tab.id
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
          style={{ transition: "color 0.15s ease" }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
      ))}
    </div>
  )
} 