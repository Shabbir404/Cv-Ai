import { forwardRef } from 'react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'
import '../cv-export.css'

const TemplateMinimal = forwardRef(function TemplateMinimal({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  const contact = [cv.email, cv.phone, cv.location, cv.linkedin].filter(Boolean).join(' · ')

  return (
    <article ref={ref} className="cv-minimal" data-cv-export>
      <header className="cv-minimal-header">
        <div className="cv-minimal-header-row">
          {cv.photo && (
            <CVPhoto src={cv.photo} alt={cv.fullName} className="cv-minimal-photo" />
          )}
          <div>
            <h1 className="cv-minimal-name">{cv.fullName}</h1>
            <p className="cv-minimal-title">{cv.title}</p>
            {contact && <p className="cv-minimal-contact">{contact}</p>}
          </div>
        </div>
      </header>
      <div className="cv-minimal-body">
        {cv.summary && (
          <section className="cv-minimal-section">
            <p className="cv-main-text">{cv.summary}</p>
          </section>
        )}
        {cv.skills.length > 0 && (
          <section className="cv-minimal-section">
            <h2 className="cv-minimal-h2">Skills</h2>
            <div className="cv-minimal-pills">
              {cv.skills.map((s) => (
                <span key={s} className="cv-minimal-pill">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section className="cv-minimal-section">
            <h2 className="cv-minimal-h2 cv-minimal-h2-dark">Experience</h2>
            {cv.experience.map((job, i) => (
              <div key={i} className="cv-job-block">
                <div className="cv-job-header">
                  <div>
                    <h3 className="cv-job-role">{job.role}</h3>
                    <p className="cv-edu-school">{job.company}</p>
                  </div>
                  <span className="cv-job-period">{job.period}</span>
                </div>
                {job.bullets?.map((b, j) => (
                  <p key={j} className="cv-job-bullet">
                    {b}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="cv-minimal-h2 cv-minimal-h2-dark">Education</h2>
            {cv.education.map((edu, i) => (
              <div key={i} className="cv-job-block">
                <div className="cv-job-header">
                  <div>
                    <p className="cv-job-role">{edu.degree}</p>
                    <p className="cv-edu-school">{edu.school}</p>
                  </div>
                  <span className="cv-job-period">{edu.period}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  )
})

export default TemplateMinimal
