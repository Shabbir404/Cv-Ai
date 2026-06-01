import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ConfirmModal from './ui/ConfirmModal'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const confirmSignOut = async () => {
    setSigningOut(true)
    await signOut()
    setSigningOut(false)
    setSignOutOpen(false)
    setOpen(false)
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
    }`

  const SignOutButton = ({ className = '' }) => (
    <button
      type="button"
      onClick={() => setSignOutOpen(true)}
      className={className}
    >
      <span className="flex items-center gap-1.5">
        <LogOut className="h-4 w-4" />
        Sign out
      </span>
    </button>
  )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900">CVai</span>
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
                <SignOutButton className="text-sm font-medium text-slate-500 hover:text-slate-900" />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-900 md:hidden"
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
                    <SignOutButton className="py-2 text-left text-sm font-medium text-slate-500" />
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="py-2 text-sm font-medium text-slate-500"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="mt-2 rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white"
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

      <ConfirmModal
        open={signOutOpen}
        title="Sign out?"
        message="Are you sure you want to sign out of your CVai account?"
        confirmLabel={signingOut ? 'Signing out…' : 'Sign out'}
        cancelLabel="Stay signed in"
        destructive
        onConfirm={confirmSignOut}
        onCancel={() => !signingOut && setSignOutOpen(false)}
      />
    </>
  )
}
