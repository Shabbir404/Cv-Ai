import { forwardRef } from 'react'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'

const CVPreview = forwardRef(function CVPreview({ data }, ref) {
  if (!data) return null

  const {
    fullName,
    title,
    email,
    phone,
    location,
    linkedin,
    summary,
    skills,
    experience,
    education,
  } = data

  return (
    <article
      ref={ref}
      className="mx-auto flex w-full max-w-[210mm] min-h-[280mm] overflow-hidden bg-white text-slate-800"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <aside className="w-[34%] shrink-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 px-6 py-8 text-white sm:px-7 sm:py-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
            {fullName}
          </h1>
          <p className="mt-2 text-sm font-medium leading-snug text-indigo-200">
            {title}
          </p>
        </div>

        <div className="space-y-3 border-t border-white/10 pt-6 text-xs">
          {email && (
            <p className="flex items-start gap-2 text-slate-300">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-300" />
              <span className="break-all">{email}</span>
            </p>
          )}
          {phone && (
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
              {phone}
            </p>
          )}
          {location && (
            <p className="flex items-start gap-2 text-slate-300">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-300" />
              {location}
            </p>
          )}
          {linkedin && (
            <p className="flex items-start gap-2 text-indigo-200">
              <Linkedin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="break-all">{linkedin}</span>
            </p>
          )}
        </div>

        {skills?.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
              Core skills
            </h2>
            <ul className="mt-4 space-y-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs leading-relaxed text-slate-200 before:mr-2 before:text-indigo-400 before:content-['•']"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 px-6 py-8 sm:px-8 sm:py-10">
        {summary && (
          <section className="mb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              About
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
              Experience
            </h2>
            <div className="mt-5 space-y-6">
              {experience.map((job, i) => (
                <div key={i} className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:h-full before:w-px before:bg-indigo-200 last:before:hidden">
                  <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{job.role}</h3>
                    <span className="text-[11px] font-medium text-slate-400">{job.period}</span>
                  </div>
                  <p className="text-xs font-medium text-indigo-600">{job.company}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {job.bullets?.map((b, j) => (
                      <li
                        key={j}
                        className="text-[12px] leading-relaxed text-slate-600 before:mr-2 before:font-bold before:text-slate-300 before:content-['–']"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
              Education
            </h2>
            <div className="mt-5 space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-wrap justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
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

export default CVPreview
