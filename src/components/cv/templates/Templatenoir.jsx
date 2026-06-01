import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

/**
 * TemplateNoir — Editorial Dark
 * Aesthetic: High-contrast dark background, bone-white type, editorial magazine layout.
 * Accent: Electric lime green. Font: "Playfair Display" + "Space Mono".
 */
const TemplateNoir = forwardRef(function TemplateNoir({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[280mm] bg-[#0e0e0e] px-10 py-10 text-[#f0ece4]"
            style={{ fontFamily: "'Space Mono', 'Courier New', monospace" }}
        >
            {/* Top bar accent */}
            <div className="h-1 w-full bg-[#c8f135] mb-10" />

            {/* Header */}
            <header className="flex items-end justify-between gap-6 border-b border-[#ffffff18] pb-8">
                <div className="flex-1">
                    <p
                        className="text-[10px] uppercase tracking-[0.35em] text-[#c8f135] mb-2"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                        Curriculum Vitae
                    </p>
                    <h1
                        className="text-5xl font-bold leading-none text-[#f0ece4] uppercase"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.02em' }}
                    >
                        {cv.fullName}
                    </h1>
                    <p className="mt-3 text-sm text-[#999] tracking-widest uppercase">
                        {cv.title}
                    </p>
                </div>
                {cv.photo && (
                    <CVPhoto
                        src={cv.photo}
                        alt={cv.fullName}
                        className="h-24 w-24 rounded-none border border-[#c8f135] object-cover grayscale"
                    />
                )}
            </header>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-6 py-4 text-[10px] text-[#666] border-b border-[#ffffff10]">
                {[cv.email, cv.phone, cv.location].filter(Boolean).map((item, i) => (
                    <span key={i} className="uppercase tracking-widest">{item}</span>
                ))}
            </div>

            {/* Body */}
            <div className="mt-8 grid grid-cols-[1fr_2fr] gap-10">
                {/* Left column */}
                <div className="space-y-8">
                    {cv.summary && (
                        <section>
                            <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8f135] mb-3">
                                Profile
                            </h2>
                            <p className="text-xs leading-relaxed text-[#aaa]">{cv.summary}</p>
                        </section>
                    )}

                    {cv.skills.length > 0 && (
                        <section>
                            <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8f135] mb-3">
                                Skills
                            </h2>
                            <ul className="space-y-1.5">
                                {cv.skills.map((s, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-[#bbb]">
                                        <span className="inline-block h-px w-3 bg-[#c8f135]" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {cv.education.length > 0 && (
                        <section>
                            <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8f135] mb-3">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {cv.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="text-xs font-bold text-[#f0ece4]">{edu.degree}</p>
                                        <p className="text-xs text-[#888]">{edu.school}</p>
                                        {edu.period && <p className="text-[10px] text-[#555]">{edu.period}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right column */}
                <div>
                    {cv.experience.length > 0 && (
                        <section>
                            <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8f135] mb-5">
                                Experience
                            </h2>
                            <div className="space-y-7">
                                {cv.experience.map((job, i) => (
                                    <div key={i} className="relative pl-4 border-l border-[#ffffff15]">
                                        <div className="absolute -left-[3px] top-1 h-1.5 w-1.5 rounded-full bg-[#c8f135]" />
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-bold text-[#f0ece4] uppercase tracking-wide">
                                                {job.role}
                                            </h3>
                                            <span className="text-[10px] text-[#555] shrink-0 ml-2">{job.period}</span>
                                        </div>
                                        <p className="text-xs text-[#777] mb-2">{job.company}</p>
                                        {job.bullets?.length > 0 && (
                                            <ul className="space-y-1 text-xs text-[#999]">
                                                {job.bullets.map((b, j) => (
                                                    <li key={j} className="flex gap-2">
                                                        <span className="text-[#c8f135] mt-0.5 shrink-0">›</span>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 h-px w-full bg-[#ffffff10]" />
        </article>
    )
})

export default TemplateNoir