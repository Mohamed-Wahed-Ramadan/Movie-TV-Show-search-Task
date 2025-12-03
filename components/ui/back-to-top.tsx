"use client"

import React, { useEffect, useState } from "react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      className={`fixed z-50 right-6 bottom-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 19V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
