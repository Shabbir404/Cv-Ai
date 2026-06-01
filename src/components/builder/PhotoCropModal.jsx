import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { cropAndCompressPhoto } from '../../lib/image'

export default function PhotoCropModal({ open, imageSrc, onClose, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedPixels, setCroppedPixels] = useState(null)
  const [saving, setSaving] = useState(false)

  const onCropComplete = useCallback((_area, pixels) => {
    setCroppedPixels(pixels)
  }, [])

  const handleSave = async () => {
    if (!croppedPixels || !imageSrc) return
    setSaving(true)
    try {
      const photo = await cropAndCompressPhoto(imageSrc, croppedPixels)
      onSave(photo)
      onClose()
    } catch {
      alert('Could not process image. Try another file.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && imageSrc && (
        <div className="fixed inset-0 z-[110] flex flex-col bg-slate-900">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Crop your photo</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="px-4 py-2 text-center text-xs text-slate-400">
            Drag to position · Pinch or slide to zoom · Face should be centered
          </p>

          <div className="relative flex-1 min-h-[240px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="space-y-4 border-t border-white/10 bg-slate-900 px-4 py-4">
            <div className="flex items-center gap-3">
              <ZoomIn className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-white/20 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !croppedPixels}
                className="flex-1 rounded-lg bg-white py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Use photo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
