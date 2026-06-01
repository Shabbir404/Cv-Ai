import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateExecutiveDark = forwardRef(function TemplateExecutiveDark({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-zinc-950 px-10 py-12 text-zinc-300"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            <header className="flex items-center gap-6 border-b border-zinc-800 pb-8">
                {cv.photo && (
                    <CVPhoto
                        src={cv.photo}
                        alt={cv.fullName}
                        className="h-28 w-28 rounded-full border-2 border-emerald-500 p-1"
                    />
                )}
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">{cv.fullName}</h1>
                    <p className="mt-1 text-lg font-medium text-emerald-400">{cv.title}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
                        {cv.email && <span className="flex items-center gap-1">✉ {cv.email}</span>}
                        {cv.phone && <span className="flex items-center gap-1">☏ {cv.phone}</span>}
                        {cv.location && <span className="flex items-center gap-1">📍 {cv.location}</span>}
                    </div>
                </div>
            </header>

            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
                {/* Left Column (Main) */}
                <div className="md:col-span-2 space-y-8">
                    {cv.summary && (
                        <section>
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">About Me</h2>
                            <p className="text-sm leading-relaxed text-zinc-300">{cv.summary}</p>
                        </section>
                    )}

                    {cv.experience.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">Experience</h2>
                            <div className="space-y-6">
                                {cv.experience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-base font-bold text-white">{job.role}</h3>
                                            <span className="shrink-0 rounded-full bg-zinc-800 px-3 py-1 text-xs text-emerald-400">{job.period}</span>
                                        </div>
                                        <p className="mb-3 text-sm text-zinc-400">{job.company}</p>
                                        <ul className="list-inside list-disc space-y-1 text-sm text-zinc-400 marker:text-emerald-500">
                                            {job.bullets?.map((b, j) => (
                                                <li key={j}>{b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {cv.skills.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">Expertise</h2>
                            <ul className="space-y-2">
                                {cv.skills.map((skill, i) => (
                                    <li key={i} className="border-b border-zinc-800 pb-1 text-sm text-zinc-300">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {cv.education.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">Education</h2>
                            <div className="space-y-4">
                                {cv.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                                        <p className="text-sm text-zinc-400">{edu.school}</p>
                                        {edu.period && <p className="mt-1 text-xs text-emerald-500/70">{edu.period}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </article>
    )
})

export default TemplateExecutiveDark