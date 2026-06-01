import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateBrutalistTech = forwardRef(function TemplateBrutalistTech({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white p-8 text-black"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
            <div className="border-4 border-black p-6 h-full flex flex-col">
                <header className="mb-8 border-b-4 border-black pb-6 flex flex-col md:flex-row items-center gap-6">
                    {cv.photo && (
                        <CVPhoto
                            src={cv.photo}
                            alt={cv.fullName}
                            className="h-24 w-24 border-2 border-black object-cover grayscale"
                        />
                    )}
                    <div className="flex-1 w-full">
                        <h1 className="text-4xl font-black uppercase tracking-tighter">{cv.fullName}</h1>
                        <p className="mt-1 text-lg font-bold bg-black text-white inline-block px-2 py-1 uppercase">
                            {cv.title}
                        </p>
                        <div className="mt-3 text-sm font-medium grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {cv.email && <div>[E] {cv.email}</div>}
                            {cv.phone && <div>[P] {cv.phone}</div>}
                            {cv.location && <div>[L] {cv.location}</div>}
                        </div>
                    </div>
                </header>

                <div className="flex-1 space-y-6">
                    {cv.summary && (
                        <section className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="mb-2 text-sm font-black uppercase">{'//'} Summary</h2>
                            <p className="text-sm leading-relaxed">{cv.summary}</p>
                        </section>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            {cv.experience.length > 0 && (
                                <section>
                                    <h2 className="mb-4 text-sm font-black uppercase">{'//'} Experience</h2>
                                    <div className="space-y-6">
                                        {cv.experience.map((job, i) => (
                                            <div key={i} className="border-l-4 border-black pl-4">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-base font-bold uppercase">{job.role}</h3>
                                                    <span className="text-xs border border-black px-1">{job.period}</span>
                                                </div>
                                                <p className="text-sm font-bold mb-2">@{job.company}</p>
                                                <ul className="list-square list-inside space-y-1 text-sm">
                                                    {job.bullets?.map((b, j) => (
                                                        <li key={j}>&gt; {b}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="space-y-6">
                            {cv.skills.length > 0 && (
                                <section>
                                    <h2 className="mb-4 text-sm font-black uppercase">{'//'} Skills</h2>
                                    <div className="flex flex-col gap-2 text-sm border-t-2 border-black pt-2">
                                        {cv.skills.map((skill, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="h-2 w-2 bg-black"></span>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {cv.education.length > 0 && (
                                <section>
                                    <h2 className="mb-4 text-sm font-black uppercase">{'//'} Education</h2>
                                    <div className="space-y-4 border-t-2 border-black pt-2">
                                        {cv.education.map((edu, i) => (
                                            <div key={i} className="text-sm">
                                                <h3 className="font-bold">{edu.degree}</h3>
                                                <p>{edu.school}</p>
                                                {edu.period && <p className="text-xs mt-1">[{edu.period}]</p>}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
})

export default TemplateBrutalistTech