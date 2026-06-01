import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'

/**
 * TemplateSwiss — Swiss International Typographic Style
 * Aesthetic: Strict grid, heavy ruled lines, red accents, pure functional design.
 * Font: "Barlow Condensed" + "IBM Plex Mono". Color: white + black + pure red.
 */
const TemplateSwiss = forwardRef(function TemplateSwiss({ data }, ref) {
    const cv = useCVSections(data)
    if (!cv) return null

    return (
        <article
            ref={ref}
            className="mx-auto w-full max-w-[210mm] min-h-[280mm] bg-white"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
            {/* Top header — full bleed black */}
            <header className="bg-black px-10 pt-8 pb-7 flex items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-2 w-2 bg-[#e8000d]" />
                        <p className="text-[9px] uppercase tracking-[0.5em] text-[#999]"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            Curriculum Vitae
                        </p>
                    </div>
                    <h1
                        className="text-[52px] font-black uppercase leading-none text-white"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.01em' }}
                    >
                        {(cv.fullName || '').split(' ').map((word, i) => (
                            <span key={i} className={i % 2 === 1 ? 'text-[#e8000d]' : ''}>{word} </span>
                        ))}
                    </h1>
                </div>
                {cv.photo && (
                    <CVPhoto
                        src={cv.photo}
                        alt={cv.fullName}
                        className="h-28 w-24 object-cover rounded-none border-2 border-[#e8000d]"
                    />
                )}
            </header>

            {/* Meta strip */}
            <div
                className="grid border-b-2 border-black"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
                {[cv.email, cv.phone, cv.location].filter(Boolean).concat(
                    Array(3).fill(null)
                ).slice(0, 3).map((item, i) => (
                    <div
                        key={i}
                        className={`px-4 py-2 text-[10px] text-[#333] ${i < 2 ? 'border-r border-black' : ''}`}
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                        {item || '—'}
                    </div>
                ))}
            </div>

            {/* Title band */}
            <div className="bg-[#e8000d] px-10 py-1.5">
                <p
                    className="text-xs font-black uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                    {cv.title}
                </p>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-[2fr_3fr] border-t border-black">

                {/* Left panel */}
                <div className="border-r-2 border-black px-6 py-7 space-y-8">
                    {cv.summary && (
                        <section>
                            <SectionLabel>Profile</SectionLabel>
                            <p className="mt-2 text-[11px] leading-relaxed text-[#444]">{cv.summary}</p>
                        </section>
                    )}

                    {cv.skills.length > 0 && (
                        <section>
                            <SectionLabel>Skills</SectionLabel>
                            <div className="mt-2 space-y-1">
                                {cv.skills.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="h-px w-3 bg-[#e8000d]" />
                                        <span className="text-[11px] text-[#333]">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {cv.education.length > 0 && (
                        <section>
                            <SectionLabel>Education</SectionLabel>
                            <div className="mt-2 space-y-4">
                                {cv.education.map((edu, i) => (
                                    <div key={i} className="border-l-2 border-[#e8000d] pl-3">
                                        <p className="text-[11px] font-bold text-black uppercase">{edu.degree}</p>
                                        <p className="text-[10px] text-[#666]">{edu.school}</p>
                                        {edu.period && <p className="text-[10px] text-[#999]">{edu.period}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right panel */}
                <div className="px-8 py-7">
                    {cv.experience.length > 0 && (
                        <section>
                            <SectionLabel>Experience</SectionLabel>
                            <div className="mt-4 space-y-6">
                                {cv.experience.map((job, i) => (
                                    <div key={i}>
                                        <div className="flex items-baseline justify-between gap-2 border-b border-[#ddd] pb-1 mb-2">
                                            <h3
                                                className="text-sm font-black uppercase text-black"
                                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                            >
                                                {job.role}
                                            </h3>
                                            <span className="text-[10px] text-[#e8000d] shrink-0">{job.period}</span>
                                        </div>
                                        <p className="text-[10px] uppercase tracking-wider text-[#888] mb-2">{job.company}</p>
                                        {job.bullets?.length > 0 && (
                                            <ul className="space-y-1">
                                                {job.bullets.map((b, j) => (
                                                    <li key={j} className="flex gap-2 text-[11px] text-[#444]">
                                                        <span className="font-mono text-[#e8000d]">–</span>
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

            {/* Footer number */}
            <div className="border-t-2 border-black px-10 py-2 flex justify-between">
                <span className="text-[9px] text-[#ccc] uppercase tracking-widest">01</span>
                <span className="text-[9px] text-[#ccc] uppercase tracking-widest">Résumé</span>
            </div>
        </article>
    )
})

function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#e8000d]" />
            <h2
                className="text-[10px] font-black uppercase tracking-[0.35em] text-black"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
                {children}
            </h2>
        </div>
    )
}

export default TemplateSwiss