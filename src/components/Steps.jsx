"use client"

import { Fragment } from "react"
import { PiCheck } from "react-icons/pi"

export default function Steps({ steps, current }) {
  return (
    <div className="flex items-start">
      {steps.map((label, index) => {
        const done = index < current
        const active = index === current
        return (
          <Fragment key={label}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
                  done || active
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {done ? <PiCheck className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={`whitespace-nowrap text-xs uppercase tracking-wide ${
                  done || active ? "font-medium text-black" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`mt-4 h-px flex-1 ${done ? "bg-black" : "bg-neutral-300"}`} />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
