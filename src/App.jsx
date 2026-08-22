import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedProjects from './components/FeaturedProjects'
import Research from './components/Research'
import Design from './components/Design'
import Data from './components/Data'
import Writing from './components/Writing'
import Media from './components/Media'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EmbodiedInnovation from './components/EmbodiedInnovation'
import projects from './data/projects.json'

export function navigateTo(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function normalizeProjectContent(project) {
  if (project.contentBlocks?.length) {
    return project.contentBlocks
  }

  if (!project.content) {
    return []
  }

  return project.content.split('\n\n').map((paragraph) => ({
    type: 'text',
    content: paragraph,
  }))
}

function ProjectContentBlock({ block }) {
  if (block.type === 'text') {
    return (
      <section className="mt-6 first:mt-0">
        {block.title && (
          <h3 className="wrap-safe mb-4 text-2xl font-semibold tracking-tight text-slate-900">
            {block.title}
          </h3>
        )}
        {String(block.content)
          .split('\n\n')
          .map((paragraph, index) => (
            <p key={index} className="wrap-safe mt-6 text-lg leading-8 text-slate-600 first:mt-0">
              {paragraph}
            </p>
          ))}
      </section>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img
          src={encodeURI(block.src)}
          alt={block.alt || ''}
          className="w-full object-cover"
        />
        {(block.caption || block.credit) && (
          <figcaption className="wrap-safe px-5 py-4 text-sm text-slate-500">
            {block.caption}
            {block.caption && block.credit ? ' ' : ''}
            {block.credit ? <span>{block.credit}</span> : null}
          </figcaption>
        )}
      </figure>
    )
  }

  if (block.type === 'table') {
    const isComparisonTable = block.variant === 'comparison'
    const headerColors = block.headerColors || []

    return (
      <section className="wrap-safe mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {(block.title || block.description) && (
          <div className="px-6 pt-6">
            {block.title && <h3 className="wrap-safe text-xl font-semibold text-slate-900">{block.title}</h3>}
            {block.description && <p className="wrap-safe mt-2 text-sm leading-6 text-slate-500">{block.description}</p>}
          </div>
        )}
        <div className={block.title || block.description ? 'mt-5 overflow-x-auto' : 'overflow-x-auto'}>
          <table className="min-w-full table-fixed text-left text-sm">
            <thead>
              <tr>
                {block.columns?.map((column, index) => (
                  <th
                    key={typeof column === 'string' ? column : column.label}
                    className={`wrap-safe px-4 py-3 text-sm font-semibold ${
                      isComparisonTable ? 'text-white' : 'uppercase tracking-[0.16em] text-slate-400'
                    }`}
                    style={isComparisonTable ? { backgroundColor: headerColors[index] || '#0f172a' } : undefined}
                  >
                    {typeof column === 'string' ? column : column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, index) => (
                <tr
                  key={`${row[0]}-${index}`}
                  className={isComparisonTable ? (index % 2 === 0 ? 'bg-white' : 'bg-slate-100/90') : 'border-t border-slate-200 bg-white'}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cellIndex}-${cell}`}
                      className={`wrap-safe px-4 py-4 align-top text-slate-600 ${
                        isComparisonTable && cellIndex === 0 ? 'w-52 font-semibold text-slate-700' : ''
                      }`}
                    >
                      {String(cell).split('\n').map((line, lineIndex) => (
                        <span key={lineIndex} className={lineIndex > 0 ? 'mt-1 block' : 'block'}>
                          {line}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {block.caption && <p className="wrap-safe px-6 py-4 text-sm text-slate-500">{block.caption}</p>}
      </section>
    )
  }

  if (block.type === 'barChart') {
    return (
      <section className="wrap-safe mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {block.title && <h3 className="wrap-safe text-xl font-semibold text-slate-900">{block.title}</h3>}
        {block.description && <p className="wrap-safe mt-2 text-sm leading-6 text-slate-500">{block.description}</p>}
        <div className="mt-6 space-y-4">
          {block.items?.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <p className="wrap-safe font-medium text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-500">{item.value}%</p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${Math.max(0, Math.min(item.value, 100))}%` }}
                />
              </div>
              {item.note && <p className="wrap-safe mt-2 text-sm text-slate-500">{item.note}</p>}
            </div>
          ))}
        </div>
        {block.caption && <p className="wrap-safe mt-4 text-sm text-slate-500">{block.caption}</p>}
      </section>
    )
  }

  if (block.type === 'iframe') {
    return (
      <section className="mt-10">
        {block.title && (
          <h3 className="wrap-safe mb-4 text-2xl font-semibold tracking-tight text-slate-900">
            {block.title}
          </h3>
        )}
        <iframe
          src={block.src}
          title={block.title || 'Embedded content'}
          width="100%"
          height="600"
          frameBorder="0"
          className="rounded-2xl border border-slate-200"
        ></iframe>
      </section>
    )
  }

  if (block.type === 'link') {
    return (
      <section className="mt-6">
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="wrap-safe inline-flex max-w-full items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {block.label}
        </a>
      </section>
    )
  }

  return null
}

function ProjectPage({ project }) {
  const contentBlocks = normalizeProjectContent(project)
  const resourceLinks = project.Publications || project.publications || project.links || []
  const detailSections = [
    { label: 'Category', value: project.category },
    { label: 'Timeline', value: project.year },
    { label: 'Status', value: project.status },
    { label: 'Collaborators', value: project.collaborators },
    { label: 'Affiliations', value: project.affiliations },
    { label: 'Regions', value: project.regions },
    { label: 'Methods', value: project.methods },
    { label: 'Themes', value: project.themes },
  ].filter((item) => item.value && (!Array.isArray(item.value) || item.value.length > 0))

  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50 pt-32 pb-16">
        <div className="container-page">
          <button
            type="button"
            onClick={() => navigateTo('/#projects')}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to projects
          </button>

          <div className="wrap-safe mt-6 max-w-4xl">
            <p className="eyebrow wrap-safe mb-4">{project.category}</p>
            <h1 className="project-title wrap-safe text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="wrap-safe">{project.year}</span>
            </div>
            {project.description && (
              <p className="wrap-safe mt-4 text-base font-medium text-slate-500">{project.description}</p>
            )}
            <p className="wrap-safe mt-8 text-xl leading-8 text-slate-600">{project.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.7fr)]">
          <article className="wrap-safe max-w-3xl">
            {project.images?.length > 0 && (
              <div className="mb-10 grid gap-6">
                {project.images.map((image, index) => (
                  <figure
                    key={`${image.src}-${index}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <img
                      src={encodeURI(image.src)}
                      alt={image.alt || project.title}
                      className="w-full object-cover"
                    />
                    {image.caption && (
                      <figcaption className="wrap-safe px-4 py-3 text-sm text-slate-500">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div className="prose prose-slate wrap-safe max-w-none">
              {contentBlocks.length > 0 ? (
                contentBlocks.map((block, index) => (
                  <ProjectContentBlock key={`${block.type}-${block.title || index}`} block={block} />
                ))
              ) : (
                <div className="wrap-safe mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                  Add content blocks to <code>src/data/projects.json</code> using <code>text</code>, <code>image</code>, <code>table</code>, or <code>barChart</code>.
                </div>
              )}
            </div>
          </article>

          <aside className="wrap-safe space-y-6">
            <div className="card wrap-safe p-6">
              <h2 className="wrap-safe text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Project details
              </h2>
              <div className="mt-5 space-y-4 text-sm">
                {detailSections.map((item) => (
                  <div key={item.label} className="wrap-safe">
                    <p className="text-slate-400">{item.label}</p>
                    <p className="wrap-safe mt-1 font-medium text-slate-900">
                      {Array.isArray(item.value) ? item.value.join(', ') : item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {resourceLinks.length > 0 && (
              <div className="card wrap-safe p-6">
                <h2 className="wrap-safe text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {project.Publications || project.publications ? 'Publications' : 'Links'}
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {resourceLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="wrap-safe rounded-xl border border-slate-200 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50"
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      <p className="wrap-safe text-sm font-medium text-slate-900">{link.label}</p>
                      {link.journal && (
                        <p className="wrap-safe mt-1 text-sm text-slate-500">{link.journal}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects />
      <Research />
      <Media />
      <Writing />
      <Data />
      <Design />
      <Contact />
    </main>
  )
}

export default function App() {
  const [route, setRoute] = useState(`${window.location.pathname}${window.location.hash}`)

  useEffect(() => {
    const handleRouteChange = () => {
      const nextRoute = `${window.location.pathname}${window.location.hash}`
      setRoute(nextRoute)

      if (window.location.hash) {
        window.requestAnimationFrame(() => {
          const target = document.querySelector(window.location.hash)
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }

      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handleRouteChange)
    window.addEventListener('hashchange', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('hashchange', handleRouteChange)
    }
  }, [])

  const pathOnly = route.split('#')[0]
  const project = useMemo(() => {
    const match = pathOnly.match(/^\/projects\/([^/]+)\/?$/)
    return match ? projects.projects.find((item) => item.slug === match[1]) : null
  }, [pathOnly])

  const isEmbodiedInnovation = pathOnly === '/data/embodied-innovation-china' || pathOnly === '/data/embodied-innovation-china/'

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      {isEmbodiedInnovation ? <EmbodiedInnovation /> : project ? <ProjectPage project={project} /> : <HomePage />}
      <Footer />
    </div>
  )
}
