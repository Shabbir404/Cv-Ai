import { domToPng } from 'modern-screenshot'
import { jsPDF } from 'jspdf'

const A4_W_MM = 210
const A4_H_MM = 297
const A4_W_PX = 794

function waitForImages(root) {
  const images = root.querySelectorAll('img')
  return Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve()
            return
          }
          const done = () => resolve()
          img.onload = done
          img.onerror = done
          if (img.decode) {
            img.decode().then(done).catch(done)
          }
        }),
    ),
  )
}

async function waitForFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready
  }
}

function unlockScrollParent(element) {
  const scrollParent = element.closest('[data-cv-preview-scroll]')
  if (!scrollParent) return () => {}

  const prev = {
    maxHeight: scrollParent.style.maxHeight,
    overflow: scrollParent.style.overflow,
  }
  scrollParent.style.maxHeight = 'none'
  scrollParent.style.overflow = 'visible'
  return () => {
    scrollParent.style.maxHeight = prev.maxHeight
    scrollParent.style.overflow = prev.overflow
  }
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
  })
}

function addImageToPdf(pdf, dataUrl, img) {
  const pageW = A4_W_MM
  const pageH = A4_H_MM
  const imgH = (img.height / img.width) * pageW

  if (imgH <= pageH) {
    pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, imgH)
    return
  }

  let offsetY = 0
  let page = 0
  while (offsetY < imgH) {
    if (page > 0) pdf.addPage()
    pdf.addImage(dataUrl, 'PNG', 0, -offsetY, pageW, imgH)
    offsetY += pageH
    page += 1
  }
}

export async function downloadCVAsPDF(element, filename = 'cv.pdf') {
  if (!element) throw new Error('Nothing to export')

  const restoreScroll = unlockScrollParent(element)
  const prevWidth = element.style.width
  const prevMinWidth = element.style.minWidth

  element.style.width = `${A4_W_PX}px`
  element.style.minWidth = `${A4_W_PX}px`

  try {
    await waitForFonts()
    await waitForImages(element)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

    const dataUrl = await domToPng(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      width: element.offsetWidth,
      height: element.offsetHeight,
    })

    const img = await loadImage(dataUrl)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    addImageToPdf(pdf, dataUrl, img)
    pdf.save(filename)
  } finally {
    element.style.width = prevWidth
    element.style.minWidth = prevMinWidth
    restoreScroll()
  }
}
