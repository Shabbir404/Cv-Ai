import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'

const TemplateMinimal = forwardRef(function TemplateMinimal({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  const contact = [cv.email, cv.phone, cv.location, cv.linkedin].filter(Boolean).join(' · ')

  return (
    <article
      ref={ref}
      className="mx-auto w-full max-w-[210mm] min-h-[280mm] bg-white text-slate-800"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <header className="border-b-2 border-teal-600 px-8 py-10 sm:px-10">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
          {cv.fullName}
        </h1>
        <p className="mt-2 text-base font-medium text-teal-700">{cv.title}</p>
        {contact && <p className="mt-4 text-xs text-slate-500">{contact}</p>}
      </header>
      <div className="space-y-8 px-8 py-8 sm:px-10">
        {cv.summary && (
          <section>
            <p className="text-sm leading-relaxed text-slate-600">{cv.summary}</p>
          </section>
        )}
        {cv.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {cv.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Experience
            </h2>
            <div className="mt-4 space-y-6">
              {cv.experience.map((job, i) => (
                <div key={i} className="grid gap-1 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="font-semibold text-slate-900">{job.role}</h3>
                    <p className="text-sm text-slate-500">{job.company}</p>
                  </div>
                  <p className="text-xs text-slate-400 sm:text-right">{job.period}</p>
                  <ul className="col-span-full mt-2 space-y-1">
                    {job.bullets?.map((b, j) => (
                      <li key={j} className="text-sm text-slate-600">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Education
            </h2>
            <div className="mt-4 space-y-3">
              {cv.education.map((edu, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.school}</p>
                  </div>
                  <p className="text-xs text-slate-400">{edu.period}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
})

export default TemplateMinimal
