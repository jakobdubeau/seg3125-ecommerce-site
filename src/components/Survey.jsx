"use client"

import { useState } from "react"
import Link from "next/link"
import { PiStar, PiStarFill, PiHeartFill } from "react-icons/pi"

const easeOptions = ["Very easy", "Easy", "Neutral", "Difficult"]

export default function Survey() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [ease, setEase] = useState(null)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <PiHeartFill className="mx-auto h-14 w-14" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Thank you</h1>
        <p className="mt-3 text-neutral-600">
          We read every response, and yours helps us make Summit better for everyone. Thanks for
          shopping with us.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block cursor-pointer bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
        >
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">How did we do?</h1>
      <p className="mt-3 text-neutral-600">
        We would love to hear about your visit. It takes less than a minute and helps us a lot.
      </p>

      <div className="mt-10 space-y-10">
        <div>
          <p className="text-sm font-medium">Overall, how was your experience?</p>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(value)}
                aria-label={`${value} out of 5`}
                className="cursor-pointer"
              >
                {(rating || hover) >= value ? (
                  <PiStarFill className="h-9 w-9 text-yellow-400" />
                ) : (
                  <PiStar className="h-9 w-9 text-neutral-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">How easy was it to find what you wanted?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {easeOptions.map((option) => (
              <button
                key={option}
                onClick={() => setEase(option)}
                className={`cursor-pointer border px-4 py-2 text-sm transition-colors ${
                  ease === option
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 text-neutral-700 hover:border-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Anything you would like to tell us?</p>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={4}
            placeholder="Tell us what went well or what we could improve."
            className="mt-3 w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          disabled={rating === 0}
          className={`w-full py-4 text-xs font-semibold uppercase tracking-widest transition-colors ${
            rating === 0
              ? "cursor-not-allowed bg-neutral-200 text-neutral-400"
              : "cursor-pointer bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {rating === 0 ? "Pick a rating to continue" : "Submit feedback"}
        </button>
      </div>
    </div>
  )
}
