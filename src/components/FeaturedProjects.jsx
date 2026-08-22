import projects from '../data/projects.json'

function ProjectCard({ project }) {
  const coverImage = project.previewImage || project.images?.[0]
  const previewDescription = project.previewDescription ?? project.description

  return (
    <article className="card flex h-full flex-col overflow-hidden transition hover:border-slate-300">
      {coverImage && (
        <a href={`/projects/${project.slug}`} className="block">
          <img
            src={encodeURI(coverImage.src)}
            alt={coverImage.alt || project.title}
            className="h-56 w-full object-cover"
          />
        </a>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col items-start gap-3">
          <span className="wrap-safe max-w-full rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {project.category}
          </span>
          <div className="wrap-safe w-full">
            <p className="text-sm text-slate-400">{project.year}</p>
            <h3 className="project-title wrap-safe mt-1 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
              {project.title}
            </h3>
          </div>
        </div>

        {previewDescription && (
          <p className="wrap-safe mt-3 text-sm text-slate-500">{previewDescription}</p>
        )}

        <p className="wrap-safe mt-4 text-slate-600">{project.summary}</p>

        <div className="mt-6 pt-2">
          <a href={`/projects/${project.slug}`} className="btn-primary">
            Read more
          </a>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-slate-50 py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Projects</p>
        <div className="mb-10">
          <h2 className="section-title">Featured work</h2>
          <p className="section-copy mt-3">
            Current research projects and longer-term lines of inquiry.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.projects.map((project) => (
            <ProjectCard key={project.slug || project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
