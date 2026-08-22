import site from '../data/site.json'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="container-page wrap-safe flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href={site.substack_url} target="_blank" rel="noreferrer" className="hover:text-slate-900">{site.substack_name}</a>
          <a href={site.orcid_url} target="_blank" rel="noreferrer" className="hover:text-slate-900">ORCID</a>
          <a href={site.smu_profile_url} target="_blank" rel="noreferrer" className="hover:text-slate-900">SMU</a>
        </div>
      </div>
    </footer>
  )
}
