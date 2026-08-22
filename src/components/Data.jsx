import data from '../data/data.json'
import { navigateTo } from '../App'

export default function Data() {
  const items = data.items || []

  if (!items.length) return null

  return (
    <section id="data" className="py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Data</p>
        <div className="mb-10 max-w-3xl">
          <h2 className="section-title">Data projects</h2>
          <p className="section-copy mt-3">
            Interactive trackers, datasets, and tools built alongside ongoing research.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="card wrap-safe flex h-full flex-col overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <div className="flex h-full flex-col p-6">
                {item.label && (
                  <p className="eyebrow mb-3 text-[0.7rem] text-teal-700">{item.label}</p>
                )}
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {item.url && (
                    <a
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                      onClick={item.url.startsWith('/') ? (event) => { event.preventDefault(); navigateTo(item.url) } : undefined}
                      className="btn-primary"
                    >
                      Open project
                    </a>
                  )}
                  {item.projectHref && (
                    <a href={item.projectHref} className="btn-secondary">
                      Related research
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
