import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import CVPreview from '../CVPreview'

export default function FullscreenCVModal({ open, onClose, data, templateId }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && data && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/95">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <p className="text-sm font-medium text-white">Full screen preview</p>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-auto p-4 sm:p-8"
          >
            <div className="mx-auto max-w-[210mm] shadow-2xl">
              <CVPreview data={data} templateId={templateId} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
