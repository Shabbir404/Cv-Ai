import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, Eye, RotateCcw } from 'lucide-react'
import CVPreview from '../components/CVPreview'
import { generateCV } from '../lib/gemini'
import { downloadCVAsPDF } from '../lib/pdf'

const PROFILE_PLACEHOLDER = `Name: Jane Doe
Email: jane@email.com | Phone: +1 555 0100 | Location: London, UK
LinkedIn: linkedin.com/in/janedoe

Current title: Senior Software Engineer

Experience:
- Acme Corp, Senior Software Engineer, 2021–Present
  Built React apps, led team of 4, reduced load time 40%
- Beta Ltd, Software Engineer, 2018–2021
  Full-stack development with Node and PostgreSQL

Education:
- BSc Computer Science, University of Example, 2018

Skills: React, TypeScript, Node.js, AWS, Agile, system design`

export default function Builder() {
  const [jobDescription, setJobDescription] = useState('')
  const [profile, setProfile] = useState(PROFILE_PLACEHOLDER)
  const [cvData, setCvData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const cvRef = useRef(null)

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Paste a job description first.')
      return
    }
    setError('')
    setLoading(true)
    setCvData(null)
    try {
      const data = await generateCV(jobDescription, profile)
      setCvData(data)
      setShowPreview(true)
    } catch (err) {
      setError(err.message || 'Failed to generate CV')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!cvRef.current || !cvData) return
    setDownloading(true)
    try {
      const name = cvData.fullName?.replace(/\s+/g, '_') || 'cv'
      await downloadCVAsPDF(cvRef.current, `${name}_CV.pdf`)
    } catch {
      setError('PDF export failed. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleReset = () => {
    setCvData(null)
    setShowPreview(false)
    setError('')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">CV Builder</h1>
        <p className="mt-2 text-muted">
          Paste the job description and your profile — AI will craft a tailored CV.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label htmlFor="job" className="block text-sm font-semibold text-ink">
              Job description
            </label>
            <textarea
              id="job"
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting here…"
              className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label htmlFor="profile" className="block text-sm font-semibold text-ink">
              Your profile
            </label>
            <textarea
              id="profile"
              rows={10}
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-600 disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? 'Generating…' : 'Generate CV'}
            </button>
            {cvData && (
              <>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-slate-400"
                >
                  <Eye className="h-4 w-4" />
                  {showPreview ? 'Hide preview' : 'Preview'}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-slate-400 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {downloading ? 'Exporting…' : 'Download PDF'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted hover:text-ink"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8"
              >
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <p className="mt-4 text-sm text-muted">Crafting your tailored CV…</p>
              </motion.div>
            )}
            {!loading && showPreview && cvData && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <CVPreview ref={cvRef} data={cvData} />
              </motion.div>
            )}
            {!loading && !showPreview && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center text-sm text-muted"
              >
                Your CV preview will appear here after generation.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {cvData && !showPreview && (
        <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
          <CVPreview ref={cvRef} data={cvData} />
        </div>
      )}
    </div>
  )
}
