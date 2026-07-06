"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CiSearch, CiUser } from "react-icons/ci"
import { PiBagLight, PiXLight } from "react-icons/pi"
import { useCartState } from "@/context/CartState"

const links = [
  { label: "Women", href: "/shop?gender=women" },
  { label: "Men", href: "/shop?gender=men" },
  { label: "New arrivals", href: "/shop" },
]

const popular = ["Rain jacket", "Fleece", "Shorts", "Hiking boots", "Backpack"]

export default function Navbar() {
  const { count } = useCartState()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function search(query) {
    const q = query.trim()
    setOpen(false)
    setTerm("")
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop")
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-brand text-2xl leading-none tracking-wide">
          Summit
        </Link>

        <ul className="hidden items-center gap-8 text-sm uppercase tracking-widest md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-neutral-700 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-neutral-700 hover:text-black"
          >
            <CiSearch className="h-6 w-6" />
          </button>
          <button
            aria-label="Account"
            className="cursor-pointer text-neutral-700 hover:text-black"
          >
            <CiUser className="h-6 w-6" />
          </button>
          <button
            aria-label="Cart"
            className="relative cursor-pointer text-neutral-700 hover:text-black"
          >
            <PiBagLight className="h-6.5 w-6.5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-xs font-medium text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-30 cursor-default"
          />
          <div className="absolute inset-x-0 top-full z-40 border-b border-neutral-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-6">
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  search(term)
                }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-1 items-center gap-3 border border-neutral-300 px-4 py-3 focus-within:border-black">
                  <input
                    ref={inputRef}
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    placeholder="Search"
                    className="flex-1 bg-transparent text-base outline-none placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="cursor-pointer text-neutral-700 hover:text-black"
                  >
                    <CiSearch className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="cursor-pointer text-neutral-700 hover:text-black"
                >
                  <PiXLight className="h-6 w-6" />
                </button>
              </form>

              <p className="mt-6 text-md font-semibold text-black">Popular Searches</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {popular.map((item) => (
                  <button
                    key={item}
                    onClick={() => search(item)}
                    className="cursor-pointer border border-neutral-300 px-3 py-1.5 text-sm text-neutral-800 transition-colors hover:border-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
