import { Plus, Trash2 } from 'lucide-react'
import { COUNTRIES } from '../../data/countries'
import { emptyExperience, emptyEducation } from '../../lib/profile'
import { Label, Input, Select, YesNo, Section } from './FormControls'

function DurationFields({ entry, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <Label>Years</Label>
        <Input
          type="number"
          min="0"
          placeholder="0"
          value={entry.years}
          onChange={(e) => onChange({ years: e.target.value })}
        />
      </div>
      <div>
        <Label>Months</Label>
        <Input
          type="number"
          min="0"
          max="11"
          placeholder="0"
          value={entry.months}
          onChange={(e) => onChange({ months: e.target.value })}
        />
      </div>
      <div>
        <Label>Days</Label>
        <Input
          type="number"
          min="0"
          max="30"
          placeholder="0"
          value={entry.days}
          onChange={(e) => onChange({ days: e.target.value })}
        />
      </div>
    </div>
  )
}

export default function ProfileForm({ profile, setProfile }) {
  const update = (patch) => setProfile((p) => ({ ...p, ...patch }))

  const updateExperience = (id, patch) => {
    setProfile((p) => ({
      ...p,
      experiences: p.experiences.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }

  const updateEducation = (id, patch) => {
    setProfile((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }

  return (
    <div className="space-y-5">
      <Section title="Personal details">
        <div>
          <Label htmlFor="fullName">Your name</Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            value={profile.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={profile.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 555 000 0000"
              value={profile.phone}
              onChange={(e) => update({ phone: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              id="country"
              value={profile.country}
              onChange={(e) => update({ country: e.target.value })}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="London"
              value={profile.city}
              onChange={(e) => update({ city: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/username"
            value={profile.linkedin}
            onChange={(e) => update({ linkedin: e.target.value })}
          />
        </div>
      </Section>

      <Section title="Current job" desc="Are you employed right now?">
        <Label>Currently working?</Label>
        <YesNo
          value={profile.hasCurrentJob}
          onChange={(v) => update({ hasCurrentJob: v, currentJobTitle: v ? profile.currentJobTitle : '' })}
        />
        {profile.hasCurrentJob && (
          <div>
            <Label htmlFor="currentJobTitle">Job title</Label>
            <Input
              id="currentJobTitle"
              placeholder="Senior Product Designer"
              value={profile.currentJobTitle}
              onChange={(e) => update({ currentJobTitle: e.target.value })}
            />
          </div>
        )}
      </Section>

      <Section
        title="Experience"
        desc="Companies or projects you have worked on. Add as many as you need."
      >
        <Label>Do you have work experience?</Label>
        <YesNo
          value={profile.hasExperience}
          onChange={(v) =>
            update({
              hasExperience: v,
              experiences: v ? profile.experiences : [emptyExperience()],
            })
          }
        />

        {profile.hasExperience && (
          <div className="space-y-4">
            {profile.experiences.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-lg border border-slate-100 bg-slate-50/80 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Entry {index + 1}
                  </span>
                  {profile.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        update({
                          experiences: profile.experiences.filter((e) => e.id !== entry.id),
                        })
                      }
                      className="rounded p-1 text-slate-400 hover:bg-white hover:text-red-600"
                      aria-label="Remove entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Type</Label>
                    <div className="mt-2 flex gap-2">
                      {['company', 'project'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateExperience(entry.id, { type })}
                          className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                            entry.type === type
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>
                      {entry.type === 'company' ? 'Company name' : 'Project name'}
                    </Label>
                    <Input
                      placeholder={entry.type === 'company' ? 'Acme Inc.' : 'E-commerce redesign'}
                      value={entry.name}
                      onChange={(e) => updateExperience(entry.id, { name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Your role (optional)</Label>
                    <Input
                      placeholder="Lead Developer"
                      value={entry.role}
                      onChange={(e) => updateExperience(entry.id, { role: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>How long did you work on it?</Label>
                    <DurationFields
                      entry={entry}
                      onChange={(patch) => updateExperience(entry.id, patch)}
                    />
                  </div>

                  {entry.type === 'company' && (
                    <div>
                      <Label htmlFor={`joined-${entry.id}`}>When did you join?</Label>
                      <Input
                        id={`joined-${entry.id}`}
                        type="month"
                        value={entry.joinedDate}
                        onChange={(e) =>
                          updateExperience(entry.id, { joinedDate: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                update({
                  experiences: [...profile.experiences, emptyExperience()],
                })
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
              Add company or project
            </button>
          </div>
        )}
      </Section>

      <Section title="Education">
        {profile.education.map((entry, index) => (
          <div
            key={entry.id}
            className="rounded-lg border border-slate-100 bg-slate-50/80 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Education {index + 1}
              </span>
              {profile.education.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    update({
                      education: profile.education.filter((e) => e.id !== entry.id),
                    })
                  }
                  className="rounded p-1 text-slate-400 hover:bg-white hover:text-red-600"
                  aria-label="Remove education"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <Label>Degree / qualification</Label>
                <Input
                  placeholder="BSc Computer Science"
                  value={entry.degree}
                  onChange={(e) => updateEducation(entry.id, { degree: e.target.value })}
                />
              </div>
              <div>
                <Label>School / university</Label>
                <Input
                  placeholder="University of Example"
                  value={entry.school}
                  onChange={(e) => updateEducation(entry.id, { school: e.target.value })}
                />
              </div>
              <div>
                <Label>Year or period</Label>
                <Input
                  placeholder="2018 – 2022"
                  value={entry.period}
                  onChange={(e) => updateEducation(entry.id, { period: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update({ education: [...profile.education, emptyEducation()] })
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <Plus className="h-4 w-4" />
          Add education
        </button>
      </Section>

      <Section
        title="Extra skills (optional)"
        desc="Skills are mainly inferred from the job description. Add any you want highlighted."
      >
        <Input
          placeholder="e.g. Figma, Python, Public speaking"
          value={profile.extraSkills}
          onChange={(e) => update({ extraSkills: e.target.value })}
        />
      </Section>
    </div>
  )
}
