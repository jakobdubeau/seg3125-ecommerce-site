"use client"

import Link from "next/link"
import { PiXLight, PiMinus, PiPlus } from "react-icons/pi"
import { useCartState } from "@/context/CartState"
import ClothingIcon from "@/components/ClothingIcon"
import { products } from "@/lib/products"

function colorHex(id, colorName) {
  const product = products.find((item) => item.id === id)
  const match = product?.colors.find((c) => c.name === colorName)
  return match?.hex
}

function iconFor(id) {
  return products.find((item) => item.id === id)?.icon
}

export default function Cart({ open, onClose }) {
  const { items, updateQty, remove, subtotal, count } = useCartState()

  return (
    <>
      {open && (
        <button
          aria-label="Close cart"
          onClick={onClose}
          className="fixed inset-0 z-50 cursor-default bg-black/40"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-widest">
            Your bag ({count})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="cursor-pointer text-neutral-700 hover:text-black"
          >
            <PiXLight className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-medium">Your bag is empty.</p>
            <p className="text-sm text-neutral-500">
              Once you add something, it will show up here.
            </p>
            <button
              onClick={onClose}
              className="mt-2 cursor-pointer bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 border-b border-neutral-200 py-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-neutral-100">
                    <ClothingIcon
                      name={iconFor(item.id)}
                      className="h-10 w-10"
                      color={colorHex(item.id, item.color)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm font-medium">${item.price * item.qty}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {item.color} / {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center text-neutral-600 hover:text-black"
                        >
                          <PiMinus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center text-neutral-600 hover:text-black"
                        >
                          <PiPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.key)}
                        className="cursor-pointer text-xs uppercase tracking-wide text-neutral-500 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-widest text-neutral-500">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="mt-5 block cursor-pointer bg-black py-4 text-center text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
