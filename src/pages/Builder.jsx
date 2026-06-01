import { useRef, useState, useEffect } from 'react'
import { Sparkles, Download, Eye, RotateCcw } from 'lucide-react'
import ProfileForm from '../components/builder/ProfileForm'
import CVPreviewPanel from '../components/builder/CVPreviewPanel'
import CVPreview from '../components/CVPreview'
import { CV_TEMPLATES } from '../components/cv/templates'
import { generateCV } from '../lib/gemini'
import { downloadCVAsPDF } from '../lib/pdf'
import {
  initialProfile,
  formatProfileForAI,
  validateProfile,
} from '../lib/profile'

export default function Builder() {
  const [jobDescription, setJobDescription] = useState('')
  const [profile, setProfile] = useState(initialProfile)
  const [cvData, setCvData] = useState(null)
  const [templateId, setTemplateId] = useState(CV_TEMPLATES[0].id)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const cvRef = useRef(null)
  const hiddenCvRef = useRef(null)

  useEffect(() => {
    if (!cvData) return
    setCvData((prev) => (prev ? { ...prev, photo: profile.photo || null } : prev))
  }, [profile.photo])

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Paste a job description first.')
      return
    }
    const validationError = validateProfile(profile)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setLoading(true)
    setCvData(null)
    try {
      const candidate = formatProfileForAI(profile)
      const data = await generateCV(jobDescription, candidate)
      setCvData({ ...data, photo: profile.photo || null })
      setShowPreview(true)
    } catch (err) {
      setError(err.message || 'Failed to generate CV')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!cvData) return
    setDownloading(true)
    setError('')
    try {
      const name = cvData.fullName?.replace(/\s+/g, '_') || 'cv'
      let el = cvRef.current
      if (!showPreview) {
        setShowPreview(true)
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
        el = cvRef.current
      }
      if (!el) throw new Error('Preview not ready')
      await downloadCVAsPDF(el, `${name}_CV.pdf`)
    } catch (err) {
      setError(err.message || 'PDF export failed. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleReset = () => {
    setCvData(null)
    setShowPreview(false)
    setError('')
    setTemplateId(CV_TEMPLATES[0].id)
    setProfile(initialProfile)
    setJobDescription('')
  }

  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            CV Builder
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Fill in your details, paste the job post, and generate a tailored CV.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_minmax(320px,420px)]">
          <div className="space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <label htmlFor="job" className="block text-sm font-semibold text-slate-900">
                Job description
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Paste the full posting — AI will extract required skills from here.
              </p>
              <textarea
                id="job"
                rows={7}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job posting here…"
                className="mt-3 w-full resize-y rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5"
              />
            </section>

            <ProfileForm profile={profile} setProfile={setProfile} />

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="sticky bottom-4 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? 'Generating…' : 'Generate CV'}
              </button>
              {cvData && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="h-4 w-4" />
                    {showPreview ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" />
                    {downloading ? 'Exporting…' : 'PDF'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>

          <CVPreviewPanel
            cvData={cvData}
            loading={loading}
            showPreview={showPreview}
            templateId={templateId}
            onTemplateChange={setTemplateId}
            cvRef={cvRef}
          />
        </div>
      </div>

      {cvData && !showPreview && (
        <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
          <CVPreview ref={hiddenCvRef} data={cvData} templateId={templateId} />
        </div>
      )}
    </div>
  )
}
