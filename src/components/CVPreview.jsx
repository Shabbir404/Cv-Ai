import { forwardRef } from 'react'
import { getTemplate } from './cv/templates'

const CVPreview = forwardRef(function CVPreview({ data, templateId = 'sidebar' }, ref) {
  if (!data) return null
  const { component: Template } = getTemplate(templateId)
  return <Template ref={ref} data={data} />
})

export default CVPreview
