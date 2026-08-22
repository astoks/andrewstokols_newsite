import { useEffect, useState } from 'react'
import gallery from '../data/design.json'
import projects from '../data/projects.json'

const slides = gallery.images
  .map((slide) => {
    const project = projects.projects.find((item) => item.slug === slide.href?.replace('/projects/', ''))
    const matchedImage = project?.contentBlocks?.find(
      (block) => block.type === 'image' && block.src === slide.src,
    )

    return {
      ...slide,
      alt: matchedImage?.alt || slide.alt,
      caption: matchedImage?.caption || slide.title,
      projectTitle: project?.title || slide.project,
    }
  })
  .filter((slide) => slide.src && slide.href)

export default function Design() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  if (!slides.length) return null

  const activeSlide = slides[activeIndex]

  return (
    <section id="graphics" className="bg-slate-50 py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Graphics</p>
        <div className="mb-10 max-w-3xl">
          <h2 className="section-title">Graphics</h2>
          <p className="section-copy mt-3">
            Rotating selection of visual material from projects.
          </p>
        </div>

        <figure className="card overflow-hidden">
          <a
            href={activeSlide.href}
            className="block transition hover:opacity-95"
            aria-label={`View project: ${activeSlide.projectTitle || activeSlide.title}`}
          >
            <div className="relative aspect-[4/3] bg-slate-200 sm:aspect-[16/10]">
              <img
                src={encodeURI(activeSlide.src)}
                alt={activeSlide.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </a>

          <figcaption className="border-t border-slate-200 px-5 py-4 sm:px-6">
            <a
              href={activeSlide.href}
              className="project-title text-base font-medium text-slate-900 underline-offset-4 hover:underline"
            >
              {activeSlide.caption}
            </a>
            {activeSlide.projectTitle && (
              <p className="project-title mt-1 text-sm text-slate-500">{activeSlide.projectTitle}</p>
            )}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
