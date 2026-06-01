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
      "period": "e.g. Jan 2022 – Present",
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

export async function generateCV(jobDescription, profile) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Add VITE_GEMINI_API_KEY to your .env file')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `You are an expert CV writer. Create a tailored, ATS-friendly CV for this job.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE PROFILE (use as source of truth; enhance wording for the role):
${profile}

${CV_SCHEMA}`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const jsonStr = text.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '')
  return JSON.parse(jsonStr)
}
