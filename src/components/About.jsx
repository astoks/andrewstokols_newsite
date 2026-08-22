import site from '../data/site.json'

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">About</p>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="wrap-safe">
            <h2 className="section-title">About me</h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
              {site.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Research interests</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {site.research_interests.map((interest) => (
                  <span key={interest} className="pill">{interest}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="wrap-safe space-y-6">
            <figure className="card wrap-safe overflow-hidden">
              <img
                src="/images/hero.JPG"
                alt={`${site.first_name} ${site.last_name}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>

            <div className="card wrap-safe p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Education</h3>
              <div className="mt-5 space-y-5">
                {site.education.map((item) => (
                  <div key={`${item.year}-${item.degree}`}>
                    <p className="text-sm text-slate-400">{item.year}</p>
                    <p className="mt-1 font-medium text-slate-900">{item.degree} in {item.field}</p>
                    <p className="text-sm text-slate-500">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card wrap-safe p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Links</h3>
              <div className="mt-5 grid gap-3 text-sm">
                <a className="text-slate-700 hover:text-teal-700" href={site.smu_profile_url} target="_blank" rel="noreferrer">SMU faculty profile</a>
                <a className="text-slate-700 hover:text-teal-700" href={site.scholar_url} target="_blank" rel="noreferrer">Google Scholar</a>
                <a className="text-slate-700 hover:text-teal-700" href={site.orcid_url} target="_blank" rel="noreferrer">ORCID</a>
                <a className="text-slate-700 hover:text-teal-700" href={site.substack_url} target="_blank" rel="noreferrer">{site.substack_name}</a>
                <a className="text-slate-700 hover:text-teal-700" href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
