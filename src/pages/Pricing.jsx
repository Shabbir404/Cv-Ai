import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Try CVai with essential features.',
    features: ['3 CV generations / month', 'PDF download', 'Modern CV template', 'Email support'],
    cta: 'Get started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/ month',
    desc: 'For active job seekers who apply often.',
    features: [
      'Unlimited CV generations',
      'Priority AI processing',
      'All templates',
      'Save CV history',
      'Priority support',
    ],
    cta: 'Coming soon',
    href: '#',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$39',
    period: '/ month',
    desc: 'Career coaches and small agencies.',
    features: [
      'Everything in Pro',
      '5 team seats',
      'Shared brand styling',
      'Admin dashboard',
    ],
    cta: 'Coming soon',
    href: '#',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">Simple pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Choose a plan that fits your job search. Payment integration coming soon —
          designs are ready for launch.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              plan.highlighted
                ? 'border-accent bg-white shadow-xl shadow-indigo-500/10 ring-2 ring-accent'
                : 'border-slate-200 bg-white'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-ink">{plan.name}</h2>
            <p className="mt-2 text-sm text-muted">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-4xl font-bold text-ink">{plan.price}</span>
              <span className="text-muted">{plan.period}</span>
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            {plan.href === '#' ? (
              <button
                type="button"
                disabled
                className={`mt-8 w-full rounded-full py-3.5 text-sm font-semibold ${
                  plan.highlighted
                    ? 'bg-slate-200 text-slate-500'
                    : 'border border-slate-200 text-slate-400'
                }`}
              >
                {plan.cta}
              </button>
            ) : (
              <Link
                to={plan.href}
                className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? 'bg-accent text-white hover:bg-indigo-600'
                    : 'border border-slate-300 text-ink hover:border-slate-400'
                }`}
              >
                {plan.cta}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
