import site from '../data/site.json'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f3e8_0%,#f5f4ed_42%,#eff4f1_100%)]" />
        <img
          src="/images/hero.png"
          alt=""
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-right-top opacity-[0.96]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,232,1)_0%,rgba(247,243,232,0.96)_16%,rgba(247,243,232,0.72)_30%,rgba(247,243,232,0.26)_44%,rgba(247,243,232,0.08)_58%,rgba(247,243,232,0.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,232,0.06)_0%,rgba(247,243,232,0.01)_30%,rgba(247,243,232,0.1)_100%)]" />
      </div>

      <div className="container-page relative z-10 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end">
        <div className="wrap-safe">
          <p className="eyebrow mb-5">Urban studies · infrastructure · digital political economy</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            {site.first_name} <span className="text-blue-600">{site.last_name}</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-700">
            {site.title}, {site.institution}
          </p>
          <p className="mt-1 text-sm text-slate-500">{site.department}</p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">{site.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">View projects</a>
            <a href={site.substack_url} target="_blank" rel="noreferrer" className="btn-accent">{site.substack_name}</a>
          </div>
        </div>

        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </section>
  )
}
