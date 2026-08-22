import writing from '../data/writing.json'

function WritingLogo({ src, alt, className }) {
  if (!src) return null

  return <img src={src} alt={alt} className={className} loading="lazy" />
}

export default function Writing() {
  const newsletter = writing.featured_newsletter
  const articles = writing.articles || []
  const chineseLanguagePublications = writing.chinese_language_publications || []

  return (
    <section id="writing" className="py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Writing</p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Newsletter & public writing</h2>
            <p className="section-copy mt-3">Public-facing work alongside academic research.</p>
          </div>
        </div>

        {newsletter && (
          <a
            href={newsletter.url}
            target={newsletter.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="card wrap-safe mb-10 block border-teal-200 bg-teal-50/30 p-6 transition hover:border-teal-300"
          >
            <div className="flex flex-wrap items-start gap-4">
              <WritingLogo
                src={newsletter.logo}
                alt={`${newsletter.title} logo`}
                className="h-20 w-20 shrink-0 rounded-2xl bg-white object-contain p-2 shadow-sm ring-1 ring-slate-200"
              />
              <div className="wrap-safe flex-1">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                  Newsletter
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{newsletter.title}</h3>
                <p className="mt-4 max-w-2xl text-slate-600">{newsletter.description}</p>
              </div>
            </div>
            <span className="mt-5 inline-flex text-sm font-medium text-blue-600">{newsletter.label}</span>
          </a>
        )}

        {articles.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Selected articles</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((post) => (
                <a
                  key={post.title}
                  href={post.url}
                  target={post.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="card wrap-safe block p-6 transition hover:border-slate-300"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <WritingLogo
                      src={post.logo}
                      alt=""
                      className="h-6 w-6 shrink-0 rounded-sm bg-white object-contain p-0.5 ring-1 ring-slate-200"
                    />
                    {post.source && <p className="wrap-safe text-sm text-slate-400">{post.source}</p>}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-4 text-slate-600">{post.description}</p>
                  <span className="mt-5 inline-flex text-sm font-medium text-blue-600">{post.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={articles.length > 0 ? 'mt-10' : ''}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Chinese language publications</h3>

          {chineseLanguagePublications.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {chineseLanguagePublications.map((post) => (
                <a
                  key={post.title}
                  href={post.url}
                  target={post.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="card wrap-safe block p-6 transition hover:border-slate-300"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <WritingLogo
                      src={post.logo}
                      alt=""
                      className="h-5 w-5 shrink-0 rounded-sm bg-white object-contain p-0.5 ring-1 ring-slate-200"
                    />
                    {post.source && <p className="wrap-safe text-sm text-slate-400">{post.source}</p>}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-4 text-slate-600">{post.description}</p>
                  <span className="mt-5 inline-flex text-sm font-medium text-blue-600">{post.label}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Chinese-language publications can be added here.</p>
          )}
        </div>
      </div>
    </section>
  )
}
