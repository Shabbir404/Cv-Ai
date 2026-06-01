import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Wand2, Download } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Paste the job',
    desc: 'Drop in the job description you are applying for.',
  },
  {
    icon: Wand2,
    title: 'AI tailors your CV',
    desc: 'Gemini rewrites your profile to match role keywords.',
  },
  {
    icon: Download,
    title: 'Preview & download',
    desc: 'Review a polished layout and export as PDF.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            AI-powered CV builder
          </p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Your CV,{' '}
            <span className="italic text-accent">perfectly matched</span> to every
            role
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Paste a job description. Get a modern, ATS-friendly CV in seconds.
            Preview and download as PDF.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:bg-indigo-600"
            >
              Start building
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-ink transition hover:border-slate-400"
            >
              View pricing
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUp}
            className="text-center font-serif text-3xl text-ink sm:text-4xl"
          >
            Three steps to a standout CV
          </motion.h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-surface p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-14 text-center text-white sm:px-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl">
            Ready to land your next interview?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-indigo-100">
            Join CVai and create tailored CVs that speak the language of recruiters.
          </p>
          <Link
            to="/builder"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Open CV builder
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
