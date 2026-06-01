import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateModernSplit = forwardRef(function TemplateModernSplit({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto flex w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Sidebar */}
            <aside className="w-1/3 bg-slate-100 p-8">
                {cv.photo && (
                    <CVPhoto
                        src={cv.photo}
                        alt={cv.fullName}
                        className="mb-6 h-32 w-32 rounded-2xl object-cover shadow-md"
                    />
                )}
                <div className="space-y-6">
                    <section>
                        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Contact</h2>
                        <div className="space-y-1 text-sm text-slate-700">
                            {cv.email && <p>{cv.email}</p>}
                            {cv.phone && <p>{cv.phone}</p>}
                            {cv.location && <p>{cv.location}</p>}
                        </div>
                    </section>

                    {cv.skills.length > 0 && (
                        <section>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {cv.skills.map((skill, i) => (
                                    <span key={i} className="rounded-md bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {cv.education.length > 0 && (
                        <section>
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Education</h2>
                            <div className="space-y-3">
                                {cv.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="text-sm font-semibold text-slate-800">{edu.degree}</h3>
                                        <p className="text-xs text-slate-600">{edu.school}</p>
                                        {edu.period && <p className="text-xs italic text-slate-400">{edu.period}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-10">
                <header className="mb-10 border-b-2 border-slate-100 pb-8">
                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">{cv.fullName}</h1>
                    <p className="mt-2 text-xl font-medium text-blue-600">{cv.title}</p>
                </header>

                <div className="space-y-8">
                    {cv.summary && (
                        <section>
                            <h2 className="mb-3 text-lg font-bold text-slate-800">Profile</h2>
                            <p className="text-sm leading-relaxed text-slate-600">{cv.summary}</p>
                        </section>
                    )}

                    {cv.experience.length > 0 && (
                        <section>
                            <h2 className="mb-5 text-lg font-bold text-slate-800">Experience</h2>
                            <div className="space-y-6">
                                {cv.experience.map((job, i) => (
                                    <div key={i} className="relative border-l-2 border-blue-100 pl-4">
                                        <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500"></div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                            <h3 className="text-md font-bold text-slate-900">{job.role}</h3>
                                            <span className="text-xs font-medium text-blue-500">{job.period}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-500">{job.company}</p>
                                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600 marker:text-slate-300">
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
            </main>
        </article>
    )
})

export default TemplateModernSplit