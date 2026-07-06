"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import Sidebar from "@/components/Sidebar"
import {
  products,
  categories,
  genders,
  allColors,
  allSizes,
  priceBuckets,
  priceOf,
} from "@/lib/products"

const emptySelection = { category: [], gender: [], color: [], size: [], price: [] }

export default function Shop() {
  const searchParams = useSearchParams()
  const genderParam = searchParams.get("gender")
  const queryParam = searchParams.get("q") || ""

  const [term, setTerm] = useState(queryParam)
  const [selected, setSelected] = useState({
    ...emptySelection,
    gender: genderParam ? [genderParam] : [],
  })

  useEffect(() => {
    setTerm(queryParam)
  }, [queryParam])

  useEffect(() => {
    setSelected((current) => ({ ...current, gender: genderParam ? [genderParam] : [] }))
  }, [genderParam])

  function toggle(key, value) {
    setSelected((current) => {
      const list = current[key]
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
      return { ...current, [key]: next }
    })
  }

  function clearAll() {
    setSelected(emptySelection)
    setTerm("")
  }

  const groups = [
    { key: "category", label: "Category", options: categories.map((c) => ({ value: c, label: c })) },
    {
      key: "gender",
      label: "Gender",
      options: genders.map((g) => ({ value: g, label: g.charAt(0).toUpperCase() + g.slice(1) })),
    },
    {
      key: "color",
      label: "Color",
      options: allColors.map((c) => ({ value: c.name, label: c.name, hex: c.hex })),
    },
    { key: "size", label: "Size", options: allSizes.map((s) => ({ value: s, label: s })) },
    { key: "price", label: "Price", options: priceBuckets.map((b) => ({ value: b.label, label: b.label })) },
  ]

  const filtered = useMemo(() => {
    const q = term.trim().toLowerCase()
    return products.filter((product) => {
      const matchesTerm =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.gender.toLowerCase().includes(q)
      const matchesCategory =
        selected.category.length === 0 || selected.category.includes(product.category)
      const matchesGender =
        selected.gender.length === 0 || selected.gender.includes(product.gender)
      const matchesColor =
        selected.color.length === 0 ||
        product.colors.some((c) => selected.color.includes(c.name))
      const matchesSize =
        selected.size.length === 0 || product.sizes.some((s) => selected.size.includes(s))
      const price = priceOf(product)
      const matchesPrice =
        selected.price.length === 0 ||
        priceBuckets.some(
          (b) => selected.price.includes(b.label) && price >= b.min && price < b.max
        )
      return (
        matchesTerm &&
        matchesCategory &&
        matchesGender &&
        matchesColor &&
        matchesSize &&
        matchesPrice
      )
    })
  }, [term, selected])

  const activeCount = Object.values(selected).reduce((total, list) => total + list.length, 0)

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="border-b border-neutral-200 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Shop all</h1>
        <p className="mt-1 text-sm text-neutral-500">Find gear for your next adventure.</p>
      </div>

      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        <aside className="w-full shrink-0 md:w-60">
          <div className="mb-6">
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search products"
              className="w-full border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-black"
            />
          </div>
          <Sidebar
            groups={groups}
            selected={selected}
            onToggle={toggle}
            onClear={clearAll}
            activeCount={activeCount}
          />
        </aside>

        <div className="flex-1">
          <p className="mb-6 text-sm text-neutral-500">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium">No items match your filters.</p>
              <button
                onClick={clearAll}
                className="mt-4 cursor-pointer text-sm uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
