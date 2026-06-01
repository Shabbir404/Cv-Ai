import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateClassic = forwardRef(function TemplateClassic({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  return (
    <article
      ref={ref}
      className="mx-auto w-full max-w-[210mm] min-h-[280mm] bg-[#faf9f7] px-8 py-10 text-slate-800 sm:px-12"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
    >
      <header className="text-center">
        {cv.photo && (
          <CVPhoto
            src={cv.photo}
            alt={cv.fullName}
            className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-amber-200 shadow-sm"
          />
        )}
        <h1 className="text-4xl font-normal text-slate-900">{cv.fullName}</h1>
        <p className="mt-1 font-sans text-sm font-medium uppercase tracking-[0.25em] text-amber-800">
          {cv.title}
        </p>
        <p
          className="mt-4 font-sans text-xs text-slate-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {[cv.email, cv.phone, cv.location].filter(Boolean).join('  |  ')}
        </p>
      </header>
      <div
        className="mt-8 space-y-7 font-sans"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {cv.summary && (
          <section>
            <h2 className="text-center text-[11px] font-bold uppercase tracking-widest text-amber-900">
              Summary
            </h2>
            <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
              {cv.summary}
            </p>
          </section>
        )}
        {cv.skills.length > 0 && (
          <section>
            <h2 className="text-center text-[11px] font-bold uppercase tracking-widest text-amber-900">
              Skills
            </h2>
            <p className="mt-3 text-center text-sm text-slate-600">
              {cv.skills.join('  ·  ')}
            </p>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section>
            <h2 className="border-b border-amber-200 pb-1 text-center text-[11px] font-bold uppercase tracking-widest text-amber-900">
              Experience
            </h2>
            <div className="mt-4 space-y-5">
              {cv.experience.map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-slate-900">{job.role}</h3>
                    <span className="text-xs text-slate-400">{job.period}</span>
                  </div>
                  <p className="text-sm italic text-slate-500">{job.company}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                    {job.bullets?.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="border-b border-amber-200 pb-1 text-center text-[11px] font-bold uppercase tracking-widest text-amber-900">
              Education
            </h2>
            <div className="mt-4 space-y-2 text-center text-sm">
              {cv.education.map((edu, i) => (
                <p key={i}>
                  <span className="font-semibold">{edu.degree}</span>
                  {' — '}
                  {edu.school}
                  {edu.period && (
                    <span className="text-slate-400"> ({edu.period})</span>
                  )}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
})

export default TemplateClassic
