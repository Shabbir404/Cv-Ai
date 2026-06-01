import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { signIn, signInWithGoogle, supabaseConfigured } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (!supabaseConfigured) {
        navigate('/builder')
        return
      }
      await signIn(email, password)
      navigate('/builder')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      if (!supabaseConfigured) {
        setError('Configure Supabase to use Google sign in.')
        return
      }
      await signInWithGoogle()
    } catch (err) {
      setError(err.message || 'Google sign in failed')
      setGoogleLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your CVai account.">
      {!supabaseConfigured && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          Supabase not configured — you can open the builder without signing in.
        </p>
      )}

      {supabaseConfigured && (
        <div className="mt-8">
          <GoogleSignInButton
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            label={googleLoading ? 'Redirecting…' : 'Continue with Google'}
          />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <p className="relative mx-auto w-fit bg-white px-3 text-xs text-slate-400">
              or sign in with email
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={supabaseConfigured ? 'space-y-5' : 'mt-8 space-y-5'}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5"
          />
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        No account?{' '}
        <Link to="/signup" className="font-semibold text-slate-900 hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
