import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const links = {
  Product: [
    { to: '/builder', label: 'CV Builder' },
    { to: '/pricing', label: 'Pricing' },
  ],
  Account: [
    { to: '/login', label: 'Log in' },
    { to: '/signup', label: 'Sign up' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                CVai
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              AI-powered CV builder for job seekers who want tailored, professional
              applications — fast.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-slate-600 transition hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CVai. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">Tailored CVs powered by AI</p>
        </div>
      </div>
    </footer>
  )
}
