import { CV_TEMPLATES } from '../cv/templates'

export default function TemplatePicker({ selectedId, onSelect }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        CV design
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {CV_TEMPLATES.map((t) => {
          const active = t.id === selectedId
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`shrink-0 rounded-xl border-2 p-1 transition ${
                active
                  ? 'border-slate-900 ring-2 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="h-24 w-[72px] overflow-hidden rounded-lg bg-white shadow-sm">
                <div
                  className={`flex h-8 items-end px-2 pb-1 ${t.thumbClass}`}
                >
                  <span className="h-1.5 w-8 rounded bg-white/30" />
                </div>
                <div className="space-y-1.5 p-2">
                  <div className="h-1 w-full rounded bg-slate-200" />
                  <div className="h-1 w-4/5 rounded bg-slate-100" />
                  <div className="mt-2 h-1 w-full rounded bg-slate-100" />
                  <div className="h-1 w-3/4 rounded bg-slate-100" />
                </div>
              </div>
              <p
                className={`mt-1.5 max-w-[72px] truncate text-center text-[10px] font-medium ${
                  active ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                {t.name}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
