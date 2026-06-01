import { forwardRef } from 'react'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateSidebar = forwardRef(function TemplateSidebar({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  return (
    <article
      ref={ref}
      className="mx-auto flex w-full max-w-[210mm] min-h-[280mm] overflow-hidden bg-white text-slate-800"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <aside className="w-[34%] shrink-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 px-6 py-8 text-white sm:px-7 sm:py-10">
        {cv.photo && (
          <CVPhoto
            src={cv.photo}
            alt={cv.fullName}
            className="mb-5 h-24 w-24 rounded-full border-2 border-white/20 ring-2 ring-indigo-400/40"
          />
        )}
        <h1 className="text-xl font-bold leading-tight sm:text-2xl">{cv.fullName}</h1>
        <p className="mt-2 text-sm font-medium text-indigo-200">{cv.title}</p>
        <div className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-xs text-slate-300">
          {cv.email && (
            <p className="flex gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
              <span className="break-all">{cv.email}</span>
            </p>
          )}
          {cv.phone && (
            <p className="flex gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
              {cv.phone}
            </p>
          )}
          {cv.location && (
            <p className="flex gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
              {cv.location}
            </p>
          )}
          {cv.linkedin && (
            <p className="flex gap-2 text-indigo-200">
              <Linkedin className="h-3.5 w-3.5 shrink-0" />
              <span className="break-all">{cv.linkedin}</span>
            </p>
          )}
        </div>
        {cv.skills.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
              Skills
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-200">
              {cv.skills.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>
      <main className="flex-1 px-6 py-8 sm:px-8 sm:py-10">
        {cv.summary && (
          <section className="mb-7">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">About</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{cv.summary}</p>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section className="mb-7">
            <h2 className="border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-[0.2em]">
              Experience
            </h2>
            <div className="mt-4 space-y-5">
              {cv.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-semibold">{job.role}</h3>
                    <span className="text-[11px] text-slate-400">{job.period}</span>
                  </div>
                  <p className="text-xs font-medium text-indigo-600">{job.company}</p>
                  <ul className="mt-2 space-y-1">
                    {job.bullets?.map((b, j) => (
                      <li key={j} className="text-[12px] text-slate-600">– {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-[0.2em]">
              Education
            </h2>
            <div className="mt-4 space-y-3">
              {cv.education.map((edu, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">{edu.degree}</h3>
                    <p className="text-xs text-slate-500">{edu.school}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  )
})

export default TemplateSidebar
