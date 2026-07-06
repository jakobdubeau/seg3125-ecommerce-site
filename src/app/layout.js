import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { CartState } from "@/context/CartState"
import Banner from "@/components/Banner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })

const columna = localFont({
  src: "../../public/fonts/OPTIColumna-Solid.otf",
  variable: "--font-columna",
})

export const metadata = {
  title: "Summit",
  description: "seg3125 ecommerce site",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${columna.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        <CartState>
          <Banner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartState>
      </body>
    </html>
  )
}
