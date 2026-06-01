import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

const TemplateBoldHeader = forwardRef(function TemplateBoldHeader({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[297mm] bg-stone-50 text-stone-800 shadow-sm"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <header className="bg-indigo-700 px-12 py-12 text-white">
                <div className="flex flex-col items-center text-center">
                    {cv.photo && (
                        <CVPhoto
                            src={cv.photo}
                            alt={cv.fullName}
                            className="mb-5 h-28 w-28 rounded-full border-4 border-indigo-400 shadow-lg"
                        />
                    )}
                    <h1 className="text-4xl font-black uppercase tracking-wide">{cv.fullName}</h1>
                    <p className="mt-2 text-xl font-light text-indigo-200">{cv.title}</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-medium text-indigo-100">
                        {[cv.email, cv.phone, cv.location].filter(Boolean).map((item, i) => (
                            <span key={i} className="rounded-full bg-indigo-800/50 px-4 py-1">{item}</span>
                        ))}
                    </div>
                </div>
            </header>

            <div className="px-12 py-10 space-y-8">
                {cv.summary && (
                    <section>
                        <h2 className="mb-3 flex items-center text-xl font-bold text-indigo-900">
                            <span className="mr-3 h-px w-8 bg-indigo-300"></span> Profile
                        </h2>
                        <p className="text-sm leading-relaxed text-stone-600 pl-11">{cv.summary}</p>
                    </section>
                )}

                {cv.skills.length > 0 && (
                    <section>
                        <h2 className="mb-3 flex items-center text-xl font-bold text-indigo-900">
                            <span className="mr-3 h-px w-8 bg-indigo-300"></span> Skills
                        </h2>
                        <p className="pl-11 text-sm font-medium text-stone-600 leading-relaxed">
                            {cv.skills.join('  •  ')}
                        </p>
                    </section>
                )}

                {cv.experience.length > 0 && (
                    <section>
                        <h2 className="mb-5 flex items-center text-xl font-bold text-indigo-900">
                            <span className="mr-3 h-px w-8 bg-indigo-300"></span> Work Experience
                        </h2>
                        <div className="pl-11 space-y-6">
                            {cv.experience.map((job, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-bold text-stone-800">{job.role}</h3>
                                        <span className="text-sm font-semibold text-indigo-600">{job.period}</span>
                                    </div>
                                    <p className="text-sm font-medium text-stone-500 mb-2">{job.company}</p>
                                    <ul className="list-disc space-y-1 pl-4 text-sm text-stone-600">
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
                        <h2 className="mb-4 flex items-center text-xl font-bold text-indigo-900">
                            <span className="mr-3 h-px w-8 bg-indigo-300"></span> Education
                        </h2>
                        <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cv.education.map((edu, i) => (
                                <div key={i} className="rounded-xl bg-white p-4 shadow-sm border border-stone-100">
                                    <h3 className="font-bold text-stone-800">{edu.degree}</h3>
                                    <p className="text-sm text-stone-500">{edu.school}</p>
                                    {edu.period && <p className="mt-2 text-xs font-semibold text-indigo-500">{edu.period}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    )
})

export default TemplateBoldHeader