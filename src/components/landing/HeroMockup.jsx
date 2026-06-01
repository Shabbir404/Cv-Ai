import { motion } from 'framer-motion'

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-slate-400/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          <span className="ml-2 text-xs font-medium text-slate-400">CVai — Preview</span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="border-b-2 border-indigo-600 pb-4">
            <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Sarah Mitchell
            </p>
            <p className="mt-0.5 text-sm font-medium text-indigo-600">
              Senior Product Designer
            </p>
            <p className="mt-2 text-xs text-slate-500">
              sarah@email.com · London, UK · linkedin.com/in/sarahm
            </p>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                Profile
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                Product designer with 8+ years crafting user-centred experiences for
                B2B SaaS. Led design systems adopted across 12 product teams.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                Experience
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-800">Lead Designer</p>
                  <p className="shrink-0 text-[10px] text-slate-400">2021 — Present</p>
                </div>
                <p className="text-[11px] text-slate-500">NovaTech · Increased activation 28%</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Figma', 'Design Systems', 'User Research', 'Prototyping'].map((s) => (
                <span
                  key={s}
                  className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -right-2 top-8 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block lg:-right-6"
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Match score
        </p>
        <p className="text-2xl font-bold text-emerald-600">94%</p>
        <p className="text-xs text-slate-500">Role alignment</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -left-2 bottom-12 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block lg:-left-6"
      >
        <p className="text-xs font-medium text-slate-700">PDF ready</p>
        <p className="text-[10px] text-slate-400">Export in one click</p>
      </motion.div>
    </motion.div>
  )
}
