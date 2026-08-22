import { useState } from 'react'
import site from '../data/site.json'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const emailHref = `mailto:${site.email}`

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container-page">
        <div className="card wrap-safe grid gap-8 p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="wrap-safe">
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="section-title">Get in touch</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              I am happy to hear from researchers, journalists, students, and collaborators working on cities, infrastructure, digital economies, and related topics.
            </p>
          </div>

          <div className="wrap-safe grid gap-3 text-sm">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-primary max-w-full justify-center"
            >
              {copied ? 'Email copied' : 'Copy email address'}
            </button>

            <a
              href={emailHref}
              className="max-w-full justify-center text-center text-sm text-slate-500 underline underline-offset-4 hover:text-slate-900"
            >
              {site.email}
            </a>

            <a
              href={site.smu_profile_url}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary max-w-full justify-center"
            >
              SMU profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
