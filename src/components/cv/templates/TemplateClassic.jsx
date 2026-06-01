import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'
import '../cv-export.css'

const TemplateClassic = forwardRef(function TemplateClassic({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  return (
    <article ref={ref} className="cv-classic" data-cv-export>
      <header>
        {cv.photo && (
          <CVPhoto src={cv.photo} alt={cv.fullName} className="cv-classic-photo" />
        )}
        <h1 className="cv-classic-name">{cv.fullName}</h1>
        <p className="cv-classic-title">{cv.title}</p>
        <p className="cv-classic-contact">
          {[cv.email, cv.phone, cv.location].filter(Boolean).join('  |  ')}
        </p>
      </header>
      <div className="cv-classic-body">
        {cv.summary && (
          <section className="cv-classic-section">
            <h2 className="cv-classic-h2">Summary</h2>
            <p className="cv-classic-center">{cv.summary}</p>
          </section>
        )}
        {cv.skills.length > 0 && (
          <section className="cv-classic-section">
            <h2 className="cv-classic-h2">Skills</h2>
            <p className="cv-classic-center">{cv.skills.join('  ·  ')}</p>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section className="cv-classic-section">
            <h2 className="cv-classic-h2 cv-classic-h2-line">Experience</h2>
            {cv.experience.map((job, i) => (
              <div key={i} className="cv-job-block">
                <div className="cv-classic-exp-header">
                  <h3 className="cv-job-role">{job.role}</h3>
                  <span className="cv-job-period">{job.period}</span>
                </div>
                <p className="cv-classic-company">{job.company}</p>
                <ul className="cv-classic-list">
                  {job.bullets?.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="cv-classic-h2 cv-classic-h2-line">Education</h2>
            <div className="cv-classic-center">
              {cv.education.map((edu, i) => (
                <p key={i}>
                  <span style={{ fontWeight: 600 }}>{edu.degree}</span>
                  {' — '}
                  {edu.school}
                  {edu.period && (
                    <span style={{ color: '#94a3b8' }}> ({edu.period})</span>
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
