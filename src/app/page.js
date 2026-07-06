import Link from "next/link"

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center">
      <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
        Shop our new summer collection
      </h1>
      <p className="max-w-xl text-lg text-neutral-600">
        Explore new deals on outerwear and all outdoor necessities.
      </p>
      <div className="mt-4 flex items-center justify-center gap-4">
        <Link
          href="/shop?gender=women"
          className="cursor-pointer border border-black px-8 py-3 text-sm font-semibold tracking-widest text-black transition-colors hover:bg-black hover:text-white"
        >
          Shop women's
        </Link>
        <Link
          href="/shop?gender=men"
          className="cursor-pointer border border-black px-8 py-3 text-sm font-semibold tracking-widest text-black transition-colors hover:bg-black hover:text-white"
        >
          Shop men's
        </Link>
      </div>
    </section>
  )
}
