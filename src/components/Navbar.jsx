import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-accent' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-serif text-2xl tracking-tight text-ink">CVai</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/builder" className={linkClass}>
                Builder
              </NavLink>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-muted hover:text-ink"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-600"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink
                    to="/builder"
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    Builder
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="py-2 text-left text-sm font-medium text-muted"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="py-2 text-sm font-medium text-muted"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="mt-2 rounded-full bg-accent py-3 text-center text-sm font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
