const columns = [
  {
    heading: "Shop",
    items: ["Women", "Men", "New arrivals", "Best sellers"],
  },
  {
    heading: "Support",
    items: ["Shipping", "Returns", "Size guide", "Contact"],
  },
  {
    heading: "Company",
    items: ["Our story", "Sustainability", "Careers"],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4 md:gap-52">
        <div>
          <p className="font-brand text-2xl tracking-wide">Summit</p>
          <p className="mt-4 max-w-xs text-sm text-neutral-500">
            Durable apparel and equipment for time spent outdoors.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-3">
              {column.items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="cursor-pointer text-sm text-neutral-500 transition-colors hover:text-black"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-neutral-500">
          <p>&copy;2026 Summit</p>
        </div>
      </div>
    </footer>
  )
}
