import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} CVai. Tailored CVs powered by AI.
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link to="/builder" className="hover:text-ink">
            Builder
          </Link>
        </div>
      </div>
    </footer>
  )
}
