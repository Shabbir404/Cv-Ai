import TemplateSidebar from './TemplateSidebar'
import TemplateMinimal from './TemplateMinimal'
import TemplateClassic from './TemplateClassic'
import TemplateSwiss from './Templateswiss'
import TemplateNoir from './Templatenoir'
import TemplateModernSplit from './ModernSplit'
import TemplateExecutive from './ExecutiveDark'
import TemplateBoldHeader from './TemplateBoldHeader'


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
  {
    id: 'noir',
    name: 'Noir',
    description: 'Dark editorial style',
    component: TemplateNoir,
    thumbClass: 'bg-[#0e0e0e]',
  },
  {
    id: 'swiss',
    name: 'Swiss',
    description: 'International typographic style',
    component: TemplateSwiss,
    thumbClass: 'bg-white',
  },
  {
    id: 'modern-split',
    name: 'Modern Split',
    description: 'Split layout with modern design',
    component: TemplateModernSplit,
    thumbClass: 'bg-slate-200',
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    description: 'Sleek dark design for professionals',
    component: TemplateExecutive,
    thumbClass: 'bg-gray-800',
  },
  {
    id: 'bold-header',
    name: 'Bold Header',
    description: 'Prominent header with bold typography',
    component: TemplateBoldHeader,
    thumbClass: 'bg-indigo-700',
  },

]

export function getTemplate(id) {
  return CV_TEMPLATES.find((t) => t.id === id) ?? CV_TEMPLATES[0]
}
