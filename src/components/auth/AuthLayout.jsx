import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2 } from 'lucide-react'

const perks = [
  'Tailored CVs from any job posting',
  'ATS-friendly modern templates',
  'One-click PDF export',
]

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-[calc(100dvh-4rem)] lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="landing-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.35),_transparent_55%)]" />
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold text-white">CVai</span>
          </Link>
          <h2 className="mt-16 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white">
            Build CVs that match the role — not generic templates.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Sign in to save your progress and generate professional, job-specific
            CVs in minutes.
          </p>
        </div>
        <ul className="relative space-y-3">
          {perks.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 lg:hidden"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold text-slate-900">CVai</span>
          </Link>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
