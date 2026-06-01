import TemplateSidebar from './TemplateSidebar'
import TemplateMinimal from './TemplateMinimal'
import TemplateClassic from './TemplateClassic'

export const CV_TEMPLATES = [
  {
    id: 'sidebar',
    name: 'Modern Sidebar',
    description: 'Dark sidebar layout',
    component: TemplateSidebar,
    thumbClass: 'bg-slate-900',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean top header',
    component: TemplateMinimal,
    thumbClass: 'bg-teal-600',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Centered serif style',
    component: TemplateClassic,
    thumbClass: 'bg-amber-800',
  },
]

export function getTemplate(id) {
  return CV_TEMPLATES.find((t) => t.id === id) ?? CV_TEMPLATES[0]
}
