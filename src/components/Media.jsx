import { useEffect, useMemo, useState } from 'react'
import media from '../data/media.json'

const sourceLogos = {
  'Jamestown Foundation': '/logos/jamestown.png',
}

function stripHtml(value = '') {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseFeedItems(items = []) {
  return items.map((item, index) => {
    const source =
      item.author ||
      item.source ||
      item.categories?.[0] ||
      'Google News'

    const date = item.pubDate
      ? new Date(item.pubDate).toLocaleDateString('en-SG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : ''

    return {
      id: item.guid || item.link || `${item.title}-${index}`,
      title: item.title || 'Untitled',
      source,
      date,
      description: stripHtml(item.description || item.content || ''),
      url: item.link || '#',
      logo: item.logo,
    }
  })
}

function getOutletIcon(item) {
  if (item.logo) return item.logo
  if (item.source && sourceLogos[item.source]) return sourceLogos[item.source]

  if (!item.url?.startsWith('http')) return null

  try {
    const domain = new URL(item.url).origin
    return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(domain)}&sz=64`
  } catch {
    return null
  }
}

function MediaCard({ item, featured = false }) {
  const outletIcon = getOutletIcon(item)

  return (
    <a
      href={item.url}
      target={item.url?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`card wrap-safe block p-6 transition hover:border-slate-300 ${
        featured ? 'border-teal-200 bg-teal-50/40' : ''
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="wrap-safe flex-1">
          <div className="flex items-center">
            {outletIcon && (
              <img
                src={outletIcon}
                alt=""
                className="h-8 w-auto max-w-[140px] rounded-sm object-contain opacity-90"
                loading="lazy"
              />
            )}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            {item.title}
          </h3>
        </div>
        <span className="text-sm text-slate-500">{item.date}</span>
      </div>

      {item.description && (
        <p className="mt-4 text-slate-600">{item.description}</p>
      )}
    </a>
  )
}

export default function Media() {
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const highlighted = media.highlighted || []
  const fallbackItems = media.fallback_items || media.items || []
  const feedConfig = media.feed || {}

  useEffect(() => {
    let isMounted = true

    async function loadFeed() {
      if (!feedConfig.url) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(feedConfig.url)
        if (!response.ok) {
          throw new Error(`Feed request failed with status ${response.status}`)
        }

        const data = await response.json()
        const parsedItems = parseFeedItems(data.items || [])

        if (isMounted) {
          setFeedItems(parsedItems)
          setError(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(true)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadFeed()

    return () => {
      isMounted = false
    }
  }, [feedConfig.url])

  const visibleFeedItems = useMemo(() => {
    const highlightedUrls = new Set(highlighted.map((item) => item.url))
    return feedItems.filter((item) => !highlightedUrls.has(item.url))
  }, [feedItems, highlighted])

  const itemsToShow = visibleFeedItems.length > 0 ? visibleFeedItems : fallbackItems

  return (
    <section id="media" className="bg-slate-50 py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Media</p>

        <div className="mb-10">
          <h2 className="section-title">Media mentions</h2>
          <p className="section-copy mt-3">
            Coverage, interviews, and mentions in outside publications.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent mentions
          </h3>
          {loading ? (
            <span className="text-sm text-slate-400">Loading…</span>
          ) : error ? (
            <span className="text-sm text-slate-400">Feed unavailable</span>
          ) : (
            <span className="text-sm text-slate-400">Updated automatically</span>
          )}
        </div>

        <div className="grid gap-6">
          {itemsToShow.map((item, index) => (
            <MediaCard
              key={item.id || item.url || item.title || index}
              item={item}
            />
          ))}
        </div>

        {highlighted.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Selected mentions
              </h3>
              <span className="text-sm text-slate-400">Selected</span>
            </div>

            <div className="grid gap-6">
              {highlighted.map((item, index) => (
                <MediaCard
                  key={item.id || item.url || item.title || index}
                  item={item}
                  featured
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
