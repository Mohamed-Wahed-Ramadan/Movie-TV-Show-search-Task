"use client"

import type React from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function SearchInput({ value, onChange, placeholder = "Search...", disabled = false }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Search is triggered by onChange with debounce
    }
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-muted-foreground)] text-lg">{disabled ? "⏳" : "🔍"}</div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-foreground)] placeholder-[color:var(--color-muted-foreground)] focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-1 focus:ring-[color:var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(to right, var(--color-background) 0%, var(--color-background) 50%, var(--color-primary) 100%)' }}
      />
    </div>
  )
}
