"use client"

export default function Sidebar({ groups, selected, onToggle, onClear, activeCount }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="cursor-pointer text-xs uppercase tracking-wide text-neutral-500 hover:text-black"
          >
            Clear all
          </button>
        )}
      </div>

      {groups.map((group) => (
        <div key={group.key}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            {group.label}
          </h3>
          <div className="mt-3 space-y-2">
            {group.options.map((option) => {
              const checked = selected[group.key].includes(option.value)
              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(group.key, option.value)}
                    className="h-4 w-4 cursor-pointer accent-black"
                  />
                  {option.hex && (
                    <span
                      className="h-4 w-4 rounded-full border border-neutral-300"
                      style={{ backgroundColor: option.hex }}
                    />
                  )}
                  <span className={checked ? "text-black" : ""}>{option.label}</span>
                </label>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
