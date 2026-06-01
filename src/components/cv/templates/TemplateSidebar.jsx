import { forwardRef } from 'react'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { useCVSections } from '../useCVData'
import CVPhoto from '../CVPhoto'
import '../cv-export.css'

const TemplateSidebar = forwardRef(function TemplateSidebar({ data }, ref) {
  const cv = useCVSections(data)
  if (!cv) return null

  return (
    <article ref={ref} className="cv-export" data-cv-export>
      <aside className="cv-sidebar-aside">
        {cv.photo && (
          <CVPhoto src={cv.photo} alt={cv.fullName} className="cv-sidebar-photo" />
        )}
        <h1 className="cv-sidebar-name">{cv.fullName}</h1>
        <p className="cv-sidebar-title">{cv.title}</p>
        <div className="cv-sidebar-divider">
          {cv.email && (
            <p className="cv-sidebar-contact">
              <Mail className="cv-sidebar-icon" />
              <span>{cv.email}</span>
            </p>
          )}
          {cv.phone && (
            <p className="cv-sidebar-contact">
              <Phone className="cv-sidebar-icon" />
              <span>{cv.phone}</span>
            </p>
          )}
          {cv.location && (
            <p className="cv-sidebar-contact">
              <MapPin className="cv-sidebar-icon" />
              <span>{cv.location}</span>
            </p>
          )}
          {cv.linkedin && (
            <p className="cv-sidebar-contact cv-sidebar-link">
              <Linkedin className="cv-sidebar-icon" />
              <span>{cv.linkedin}</span>
            </p>
          )}
        </div>
        {cv.skills.length > 0 && (
          <div className="cv-sidebar-divider">
            <h2 className="cv-sidebar-label">Skills</h2>
            <ul className="cv-sidebar-skills">
              {cv.skills.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>
      <main className="cv-sidebar-main">
        {cv.summary && (
          <section className="cv-section">
            <h2 className="cv-main-label">About</h2>
            <p className="cv-main-text">{cv.summary}</p>
          </section>
        )}
        {cv.experience.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-main-label cv-main-label-dark">Experience</h2>
            {cv.experience.map((job, i) => (
              <div key={i} className="cv-job-block">
                <div className="cv-job-header">
                  <h3 className="cv-job-role">{job.role}</h3>
                  <span className="cv-job-period">{job.period}</span>
                </div>
                <p className="cv-job-company">{job.company}</p>
                {job.bullets?.map((b, j) => (
                  <p key={j} className="cv-job-bullet">
                    – {b}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}
        {cv.education.length > 0 && (
          <section>
            <h2 className="cv-main-label cv-main-label-dark">Education</h2>
            {cv.education.map((edu, i) => (
              <div key={i} className="cv-job-block">
                <div className="cv-job-header">
                  <div>
                    <h3 className="cv-job-role">{edu.degree}</h3>
                    <p className="cv-edu-school">{edu.school}</p>
                  </div>
                  <span className="cv-job-period">{edu.period}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </article>
  )
})

export default TemplateSidebar
