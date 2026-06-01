import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Wand2,
  Download,
  Shield,
  Zap,
  Target,
  Star,
} from 'lucide-react'
import HeroMockup from '../components/landing/HeroMockup'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

const steps = [
  {
    step: '01',
    icon: FileText,
    title: 'Paste the job description',
    desc: 'Copy the full posting — requirements, responsibilities, and keywords included.',
  },
  {
    step: '02',
    icon: Wand2,
    title: 'AI tailors your CV',
    desc: 'Our engine aligns your experience with role-specific language recruiters search for.',
  },
  {
    step: '03',
    icon: Download,
    title: 'Preview and export',
    desc: 'Review a clean, professional layout and download a print-ready PDF instantly.',
  },
]

const features = [
  {
    icon: Target,
    title: 'Role-specific tailoring',
    desc: 'Every CV is rewritten to mirror the job posting — not a generic template.',
  },
  {
    icon: Shield,
    title: 'ATS-optimised structure',
    desc: 'Clear sections, scannable headings, and keyword placement hiring systems expect.',
  },
  {
    icon: Zap,
    title: 'Ready in under a minute',
    desc: 'Skip hours of rewriting. Generate, refine, and export from one workspace.',
  },
]

const testimonials = [
  {
    quote:
      'I applied to six roles in one evening. Each CV felt written for that specific posting.',
    name: 'James R.',
    role: 'Software Engineer',
  },
  {
    quote:
      'The layout is clean enough to send directly — no second-guessing the formatting.',
    name: 'Priya K.',
    role: 'Marketing Manager',
  },
  {
    quote:
      'Finally a tool that understands job descriptions instead of just filling blanks.',
    name: 'Marcus T.',
    role: 'Project Lead',
  },
]

const stats = [
  { value: '50K+', label: 'CVs generated' },
  { value: '94%', label: 'Avg. role match' },
  { value: '< 60s', label: 'Generation time' },
]

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative border-b border-slate-200/80">
        <div className="landing-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  AI CV Builder
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                Professional CVs tailored to{' '}
                <span className="text-accent">every job</span> you apply for
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                Paste a job description. CVai generates a polished, ATS-friendly CV
                matched to the role — preview it live and download as PDF.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  View pricing
                </Link>
              </div>

              <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {['No credit card', 'PDF export included', 'Mobile-friendly'].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <HeroMockup />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 divide-x divide-slate-200/80 sm:gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className={`text-center ${i > 0 ? 'sm:px-8' : ''}`}
              >
                <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              From job post to polished CV in three steps
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              A focused workflow built for serious job seekers — no clutter, no guesswork.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((item, i) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <span className="text-xs font-bold text-slate-300">{item.step}</span>
                <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-slate-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Why CVai
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Built for hiring managers and applicant tracking systems
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Generic CVs get filtered out. CVai analyses the job description and
                reframes your experience so it reads relevant from the first line.
              </p>
            </motion.div>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-accent">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by job seekers worldwide
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-14 text-center sm:px-16 sm:py-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.25),_transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your next role starts with the right CV
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                Create a tailored, professional CV in minutes. Free to start — upgrade
                when you need more.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:w-auto"
                >
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/builder"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
                >
                  Open builder
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
