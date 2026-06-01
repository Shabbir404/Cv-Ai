export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
export const ACCEPTED_IMAGE_ACCEPT = '.jpg,.jpeg,.png,image/jpeg,image/png'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const OUTPUT_MAX_PX = 400
const OUTPUT_QUALITY = 0.82

export function validateImageFile(file) {
  if (!file) return 'No file selected.'
  const type = (file.type || '').toLowerCase()
  const name = file.name.toLowerCase()
  const extOk = /\.(jpe?g|png)$/.test(name)
  const typeOk = ACCEPTED_IMAGE_TYPES.includes(type)

  if (!typeOk && !extOk) {
    return 'Only JPG, JPEG, and PNG images are allowed.'
  }
  if (file.size > MAX_FILE_BYTES) {
    return 'Image must be smaller than 10MB.'
  }
  return null
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

export async function cropAndCompressPhoto(imageSrc, pixelCrop) {
  const image = await loadImage(imageSrc)
  const side = Math.min(
    OUTPUT_MAX_PX,
    Math.max(1, Math.round(Math.min(pixelCrop.width, pixelCrop.height))),
  )

  const canvas = document.createElement('canvas')
  canvas.width = side
  canvas.height = side
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    side,
    side,
  )

  return canvas.toDataURL('image/jpeg', OUTPUT_QUALITY)
}
