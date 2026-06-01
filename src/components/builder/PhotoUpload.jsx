import { useRef, useState } from 'react'
import { Camera, Trash2, Pencil } from 'lucide-react'
import { validateImageFile, ACCEPTED_IMAGE_ACCEPT } from '../../lib/image'
import PhotoCropModal from './PhotoCropModal'
import { Label } from './FormControls'

export default function PhotoUpload({ photo, onChange }) {
  const inputRef = useRef(null)
  const [cropSrc, setCropSrc] = useState(null)
  const [cropOpen, setCropOpen] = useState(false)
  const [error, setError] = useState(null)

  const openFile = () => inputRef.current?.click()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    const err = validateImageFile(file)
    if (err) {
      setError(err)
      return
    }
    setError(null)
    const url = URL.createObjectURL(file)
    setCropSrc(url)
    setCropOpen(true)
  }

  const closeCrop = () => {
    setCropOpen(false)
    if (cropSrc?.startsWith('blob:')) {
      URL.revokeObjectURL(cropSrc)
    }
    setCropSrc(null)
  }

  const handleSave = (dataUrl) => {
    onChange(dataUrl)
    closeCrop()
  }

  const handleRemove = () => {
    onChange(null)
    setError(null)
  }

  const handleRecrop = () => {
    if (!photo) return openFile()
    setCropSrc(photo)
    setCropOpen(true)
  }

  return (
    <div>
      <Label>Profile photo (optional)</Label>
      <p className="mt-1 text-xs text-slate-500">JPG, JPEG, or PNG · Cropped and compressed for your CV</p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_ACCEPT}
        className="hidden"
        onChange={handleFile}
      />

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
          {photo ? (
            <img src={photo} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <Camera className="h-8 w-8" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openFile}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {photo ? 'Change photo' : 'Upload photo'}
          </button>
          {photo && (
            <>
              <button
                type="button"
                onClick={handleRecrop}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Re-crop
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <PhotoCropModal
        open={cropOpen}
        imageSrc={cropSrc}
        onClose={closeCrop}
        onSave={handleSave}
      />
    </div>
  )
}
