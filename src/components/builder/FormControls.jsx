export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}
    </label>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 ${className}`}
      {...props}
    />
  )
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function YesNo({ value, onChange, name }) {
  return (
    <div className="mt-2 flex gap-2">
      {[
        { label: 'Yes', val: true },
        { label: 'No', val: false },
      ].map((opt) => (
        <button
          key={String(opt.val)}
          type="button"
          name={name}
          onClick={() => onChange(opt.val)}
          className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
            value === opt.val
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function Section({ title, desc, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {desc && <p className="mt-1 text-xs text-slate-500">{desc}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
