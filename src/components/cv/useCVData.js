export function useCVSections(data) {
  if (!data) return null
  return {
    fullName: data.fullName,
    title: data.title,
    email: data.email,
    phone: data.phone,
    location: data.location,
    linkedin: data.linkedin,
    summary: data.summary,
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    education: data.education ?? [],
  }
}
