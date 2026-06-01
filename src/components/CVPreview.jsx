import { forwardRef } from 'react'

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
      className="mx-auto w-full max-w-[210mm] bg-white text-slate-800 shadow-xl"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <header className="border-b-4 border-indigo-600 px-8 py-8 sm:px-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl">
          {fullName}
        </h1>
        <p className="mt-1 text-lg font-medium text-indigo-600">{title}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          {email && <li>{email}</li>}
          {phone && <li>{phone}</li>}
          {location && <li>{location}</li>}
          {linkedin && (
            <li className="text-indigo-600">{linkedin}</li>
          )}
        </ul>
      </header>

      <div className="space-y-6 px-8 py-8 sm:px-10">
        {summary && (
          <section>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
          </section>
        )}

        {skills?.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((job, i) => (
                <div key={i}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{job.role}</h3>
                    <span className="text-xs text-slate-500">{job.period}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{job.company}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                    {job.bullets?.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-wrap justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-sm text-slate-600">{edu.school}</p>
                  </div>
                  <span className="text-xs text-slate-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
})

export default CVPreview
