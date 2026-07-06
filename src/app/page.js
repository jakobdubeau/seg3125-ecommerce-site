import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { newArrivals } from "@/lib/products"

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-352">
        <div className="relative flex h-172 items-center justify-center overflow-hidden">
          <Image src="/mont.png" alt="mountain" fill priority className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center text-white">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            Shop our new summer collection
          </h1>
          <p className="max-w-xl text-lg text-white">
            Explore new deals on outerwear and all outdoor necessities.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              href="/shop?gender=women"
              className="cursor-pointer border border-white px-8 py-3 text-sm font-semibold tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Shop women's
            </Link>
            <Link
              href="/shop?gender=men"
              className="cursor-pointer border border-white px-8 py-3 text-sm font-semibold tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Shop men's
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">New arrivals</h2>
          <Link
            href="/shop"
            className="hidden text-sm uppercase tracking-widest underline underline-offset-4 transition-colors hover:text-neutral-500 md:block"
          >
            Shop all
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Summer sale: up to 40% off select styles
          </h2>
          <Link
            href="/shop"
            className="mt-6 inline-block cursor-pointer border border-white px-8 py-3 text-sm font-semibold tracking-widest transition-colors hover:bg-white hover:text-black"
          >
            Shop the sale
          </Link>
        </div>
      </section>
    </>
  )
}
