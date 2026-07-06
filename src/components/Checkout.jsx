"use client"

import { useState } from "react"
import Link from "next/link"
import { PiCheckCircle } from "react-icons/pi"
import { useCartState } from "@/context/CartState"
import ClothingIcon from "@/components/ClothingIcon"
import Steps from "@/components/Steps"
import { products } from "@/lib/products"

const stepLabels = ["Cart", "Information", "Payment", "Confirmation"]

const provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]

function colorHex(id, colorName) {
  const product = products.find((item) => item.id === id)
  return product?.colors.find((c) => c.name === colorName)?.hex
}

function iconFor(id) {
  return products.find((item) => item.id === id)?.icon
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function formatPostal(value) {
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
  if (clean.length <= 3) return clean
  return `${clean.slice(0, 3)} ${clean.slice(3)}`
}

function Field({ label, value, onChange, error, ...props }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-neutral-500">{label}</span>
      <input
        value={value}
        onChange={onChange}
        className={`mt-1 w-full border px-3 py-2.5 text-sm outline-none focus:border-black ${
          error ? "border-black bg-neutral-50" : "border-neutral-300"
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs font-medium text-black">{error}</span>}
    </label>
  )
}

function Summary({ items, subtotal }) {
  return (
    <div className="border border-neutral-200 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest">Order summary</h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-neutral-100">
              <ClothingIcon
                name={iconFor(item.id)}
                className="h-7 w-7"
                color={colorHex(item.id, item.color)}
              />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-neutral-500">
                {item.color} / {item.size} / Qty {item.qty}
              </p>
            </div>
            <p className="text-sm font-medium">${item.price * item.qty}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2 border-t border-neutral-200 pt-5 text-sm">
        <div className="flex justify-between text-neutral-500">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-neutral-500">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-semibold text-black">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
      </div>
    </div>
  )
}

const emptyInfo = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Canada",
  phone: "",
}

const emptyPayment = { cardName: "", cardNumber: "", expiry: "", cvc: "" }

export default function Checkout() {
  const { items, subtotal, clear } = useCartState()
  const [step, setStep] = useState(0)
  const [info, setInfo] = useState(emptyInfo)
  const [payment, setPayment] = useState(emptyPayment)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  function setInfoField(key, value) {
    setInfo((current) => ({ ...current, [key]: value }))
  }

  function setPaymentField(key, value) {
    setPayment((current) => ({ ...current, [key]: value }))
  }

  function validateInfo() {
    const next = {}
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(info.email)) next.email = "Enter a valid email address."
    if (!info.firstName.trim()) next.firstName = "Required"
    if (!info.lastName.trim()) next.lastName = "Required"
    if (!info.address.trim()) next.address = "Required"
    if (!info.city.trim()) next.city = "Required"
    if (!info.province.trim()) next.province = "Required"
    if (!info.postalCode.trim()) next.postalCode = "Required"
    else if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(info.postalCode))
      next.postalCode = "Enter a valid postal code."
    if (!info.phone.trim()) next.phone = "Required"
    return next
  }

  function validatePayment() {
    const next = {}
    const digits = payment.cardNumber.replace(/\s/g, "")
    if (!payment.cardName.trim()) next.cardName = "Required"
    if (!/^\d{16}$/.test(digits)) next.cardNumber = "Enter the 16 digit card number."
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) next.expiry = "Use MM/YY."
    if (!/^\d{3}$/.test(payment.cvc)) next.cvc = "3 digits."
    return next
  }

  function continueToPayment() {
    const found = validateInfo()
    setErrors(found)
    if (Object.keys(found).length === 0) setStep(2)
  }

  function placeOrder() {
    const found = validatePayment()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setOrder({ number: "SM" + Math.floor(100000 + Math.random() * 900000) })
    clear()
    setStep(3)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Steps steps={stepLabels} current={step} />
      </div>

      <div className="mt-12">
        {step === 0 && (
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight">Your bag</h1>
            {items.length === 0 ? (
              <div className="mt-8 border border-neutral-200 py-16 text-center">
                <p className="text-lg font-medium">Your bag is empty.</p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block cursor-pointer text-sm uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-6 border-t border-neutral-200">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center gap-4 border-b border-neutral-200 py-5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-neutral-100">
                        <ClothingIcon
                          name={iconFor(item.id)}
                          className="h-8 w-8"
                          color={colorHex(item.id, item.color)}
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-neutral-500">
                          {item.color} / {item.size} / Qty {item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-medium">${item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-neutral-500">Subtotal</span>
                  <span className="text-lg font-semibold">${subtotal}</span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-8 w-full cursor-pointer bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                >
                  Continue to information
                </button>
              </>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Shipping information</h1>
              <p className="mt-1 text-sm text-neutral-500">Enter your shipping details below.</p>
              <div className="mt-6 space-y-4">
                <Field label="Email" type="email" value={info.email} onChange={(e) => setInfoField("email", e.target.value)} error={errors.email} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First name" value={info.firstName} onChange={(e) => setInfoField("firstName", e.target.value)} error={errors.firstName} />
                  <Field label="Last name" value={info.lastName} onChange={(e) => setInfoField("lastName", e.target.value)} error={errors.lastName} />
                </div>
                <Field label="Address" value={info.address} onChange={(e) => setInfoField("address", e.target.value)} error={errors.address} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" value={info.city} onChange={(e) => setInfoField("city", e.target.value)} error={errors.city} />
                  <label className="block">
                    <span className="text-xs uppercase tracking-wide text-neutral-500">Province</span>
                    <select
                      value={info.province}
                      onChange={(e) => setInfoField("province", e.target.value)}
                      className={`mt-1 w-full border px-3 py-2.5 text-sm outline-none focus:border-black ${
                        errors.province ? "border-black bg-neutral-50" : "border-neutral-300"
                      } ${info.province ? "text-black" : "text-neutral-400"}`}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {provinces.map((code) => (
                        <option key={code} value={code} className="text-black">
                          {code}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <span className="mt-1 block text-xs font-medium text-black">{errors.province}</span>
                    )}
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Postal code" placeholder="A1A 1A1" value={info.postalCode} onChange={(e) => setInfoField("postalCode", formatPostal(e.target.value))} error={errors.postalCode} />
                  <Field label="Country" value={info.country} readOnly onChange={() => {}} />

                </div>
                <Field label="Phone" inputMode="tel" placeholder="(123) 456-7890" value={info.phone} onChange={(e) => setInfoField("phone", formatPhone(e.target.value))} error={errors.phone} />
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="cursor-pointer text-sm uppercase tracking-widest text-neutral-500 hover:text-black"
                >
                  Back to bag
                </button>
                <button
                  onClick={continueToPayment}
                  className="cursor-pointer bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                >
                  Continue to payment
                </button>
              </div>
            </div>
            <Summary items={items} subtotal={subtotal} />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Payment</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Enter your payment details below.
              </p>
              <div className="mt-6 space-y-4">
                <Field label="Name on card" value={payment.cardName} onChange={(e) => setPaymentField("cardName", e.target.value)} error={errors.cardName} />
                <Field label="Card number" inputMode="numeric" placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={(e) => setPaymentField("cardNumber", formatCardNumber(e.target.value))} error={errors.cardNumber} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" inputMode="numeric" placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPaymentField("expiry", formatExpiry(e.target.value))} error={errors.expiry} />
                  <Field label="CVC" inputMode="numeric" placeholder="123" value={payment.cvc} onChange={(e) => setPaymentField("cvc", e.target.value.replace(/\D/g, "").slice(0, 3))} error={errors.cvc} />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="cursor-pointer text-sm uppercase tracking-widest text-neutral-500 hover:text-black"
                >
                  Back to information
                </button>
                <button
                  onClick={placeOrder}
                  className="cursor-pointer bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                >
                  Pay ${subtotal}
                </button>
              </div>
            </div>
            <Summary items={items} subtotal={subtotal} />
          </div>
        )}

        {step === 3 && order && (
          <div className="mx-auto max-w-lg text-center">
            <PiCheckCircle className="mx-auto h-16 w-16" />
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Thank you for your order</h1>
            <p className="mt-3 text-neutral-600">
              Order {order.number} is confirmed. A receipt is on its way to your inbox, and we will
              email tracking once it ships.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/survey"
                className="w-full cursor-pointer bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
              >
                Share your feedback
              </Link>
              <Link
                href="/shop"
                className="cursor-pointer text-sm uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
