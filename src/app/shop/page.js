import { Suspense } from "react"
import Shop from "@/components/Shop"

export const metadata = {
  title: "Shop | Summit",
}

export default function ShopPage() {
  return (
    <Suspense>
      <Shop />
    </Suspense>
  )
}
