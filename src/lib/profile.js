export function emptyExperience() {
  return {
    id: crypto.randomUUID(),
    type: 'company',
    name: '',
    role: '',
    years: '',
    months: '',
    days: '',
    joinedDate: '',
  }
}

export function emptyEducation() {
  return {
    id: crypto.randomUUID(),
    degree: '',
    school: '',
    period: '',
  }
}

export const initialProfile = {
  fullName: '',
  photo: null,
  email: '',
  phone: '',
  linkedin: '',
  country: '',
  city: '',
  hasCurrentJob: false,
  currentJobTitle: '',
  hasExperience: false,
  experiences: [emptyExperience()],
  education: [emptyEducation()],
  extraSkills: '',
}

export function formatProfileForAI(profile) {
  const experiences = profile.hasExperience
    ? profile.experiences
        .filter((e) => e.name.trim())
        .map((e) => ({
          type: e.type,
          name: e.name.trim(),
          role: e.role.trim() || null,
          duration: {
            years: Number(e.years) || 0,
            months: Number(e.months) || 0,
            days: Number(e.days) || 0,
          },
          joinedDate: e.type === 'company' ? e.joinedDate || null : null,
        }))
    : []

  const education = profile.education
    .filter((e) => e.degree.trim() || e.school.trim())
    .map((e) => ({
      degree: e.degree.trim(),
      school: e.school.trim(),
      period: e.period.trim(),
    }))

  const extraSkills = profile.extraSkills
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean)

  return {
    fullName: profile.fullName.trim(),
    email: profile.email.trim(),
    phone: profile.phone.trim(),
    linkedin: profile.linkedin.trim(),
    location: `${profile.city.trim()}, ${profile.country}`.replace(/^,\s*|,\s*$/g, ''),
    currentJob: profile.hasCurrentJob
      ? { title: profile.currentJobTitle.trim() }
      : null,
    experience: experiences,
    education,
    extraSkills,
  }
}

export function validateProfile(profile) {
  if (!profile.fullName.trim()) return 'Enter your name.'
  if (!profile.country) return 'Select your country.'
  if (!profile.city.trim()) return 'Enter your city.'
  if (profile.hasCurrentJob && !profile.currentJobTitle.trim()) {
    return 'Enter your current job title.'
  }
  if (profile.hasExperience) {
    const filled = profile.experiences.filter((e) => e.name.trim())
    if (filled.length === 0) return 'Add at least one company or project.'
  }
  return null
}
