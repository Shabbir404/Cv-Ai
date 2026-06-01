import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import CVPreview from '../CVPreview'
import TemplatePicker from './TemplatePicker'
import FullscreenCVModal from './FullscreenCVModal'

export default function CVPreviewPanel({
  cvData,
  loading,
  showPreview,
  templateId,
  onTemplateChange,
  cvRef,
}) {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <>
      <div className="xl:sticky xl:top-20 xl:self-start">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Live preview
          </p>
          {cvData && showPreview && (
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Large view
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500">Crafting your tailored CV…</p>
            </motion.div>
          )}
          {!loading && showPreview && cvData && (
            <motion.div
              key={`preview-${templateId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                data-cv-preview-scroll
                className="max-h-[520px] overflow-auto rounded-2xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200"
              >
                <CVPreview ref={cvRef} data={cvData} templateId={templateId} />
              </div>
              <TemplatePicker selectedId={templateId} onSelect={onTemplateChange} />
            </motion.div>
          )}
          {!loading && !showPreview && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[480px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-400"
            >
              Your CV preview will appear here after generation.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FullscreenCVModal
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        data={cvData}
        templateId={templateId}
      />
    </>
  )
}
