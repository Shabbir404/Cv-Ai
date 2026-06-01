import { GoogleGenerativeAI } from '@google/generative-ai'

const CV_SCHEMA = `Return ONLY valid JSON (no markdown) matching this shape:
{
  "fullName": "string",
  "title": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "linkedin": "string or empty",
  "summary": "2-3 sentence professional summary tailored to the job",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "role": "string",
      "company": "string",
      "period": "human-readable period",
      "bullets": ["achievement with metrics where possible"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "school": "string",
      "period": "string"
    }
  ]
}`

export async function generateCV(jobDescription, candidateProfile) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Add VITE_GEMINI_API_KEY to your .env file')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const profileJson = JSON.stringify(candidateProfile, null, 2)

  const prompt = `You are an expert CV writer. Create a tailored, ATS-friendly CV for this job.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE DATA (JSON — use as source of truth; enhance wording for the role, do not invent employers or degrees):
${profileJson}

RULES:
- Derive skills primarily from the job description requirements; merge with candidate extraSkills if provided.
- Map candidate experience entries to CV experience with strong bullet points aligned to the job.
- Use duration and joinedDate to build accurate period strings.
- If candidate has currentJob, use that title unless the job description suggests a better aligned title.
- Keep email, phone, location, linkedin from candidate data.
- Write 3-5 bullets per major experience where possible.

${CV_SCHEMA}`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const jsonStr = text.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '')
  return JSON.parse(jsonStr)
}
