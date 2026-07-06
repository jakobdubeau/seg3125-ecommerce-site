"use client"

import { useState } from "react"
import { useCartState } from "@/context/CartState"
import ClothingIcon from "@/components/ClothingIcon"

export default function ProductCard({ product }) {
  const { add } = useCartState()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  const displayPrice = product.onSale ? product.salePrice : product.price

  function addToCart() {
    if (!selectedSize) return
    add(product, selectedColor.name, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="flex flex-col">
      <div className="flex aspect-square items-center justify-center bg-neutral-100">
        <ClothingIcon name={product.icon} className="h-28 w-28" color={selectedColor.hex} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-black">{product.name}</h3>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-neutral-400">
              {product.gender}
            </p>
          </div>
          <div className="text-right text-sm">
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 line-through">${product.price}</span>
                <span className="font-medium text-black">${displayPrice}</span>
              </div>
            ) : (
              <span className="font-medium text-black">${displayPrice}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c)}
              aria-label={c.name}
              title={c.name}
              className={`h-4 w-4 cursor-pointer rounded-full border transition-transform ${
                selectedColor.name === c.name
                  ? "border-black ring-1 ring-black ring-offset-1"
                  : "border-neutral-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-8 cursor-pointer border px-2 py-1 text-xs transition-colors ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 text-neutral-700 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={addToCart}
          disabled={!selectedSize}
          className={`mt-1 py-3 text-xs font-medium uppercase tracking-widest transition-colors ${
            selectedSize
              ? "cursor-pointer bg-black text-white hover:bg-neutral-800"
              : "cursor-not-allowed bg-neutral-200 text-neutral-400"
          }`}
        >
          {added ? "Added" : selectedSize ? "Add to cart" : "Select a size"}
        </button>
      </div>
    </div>
  )
}
