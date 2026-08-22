import { useEffect, useState } from 'react';

const ORCID_ID = '0000-0002-8501-4780';
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

const TYPE_META = {
  'journal-article': { label: 'Journal Article', color: 'bg-slate-100 text-slate-700' },
  'book-chapter': { label: 'Book Chapter', color: 'bg-slate-100 text-slate-700' },
  'book': { label: 'Book', color: 'bg-slate-100 text-slate-700' },
  'working-paper': { label: 'Working Paper', color: 'bg-slate-100 text-slate-700' },
  'dissertation': { label: 'Dissertation', color: 'bg-slate-100 text-slate-700' },
  'conference-paper': { label: 'Conference Paper', color: 'bg-slate-100 text-slate-700' },
  'report': { label: 'Report', color: 'bg-slate-100 text-slate-700' },
  other: { label: 'Publication', color: 'bg-slate-100 text-slate-700' },
};

function parseWork(group) {
  const w = group['work-summary']?.[0];
  if (!w) return null;

  const title = w.title?.title?.value ?? 'Untitled';
  const venue = w['journal-title']?.value ?? '';
  const year = w['publication-date']?.year?.value ?? '';
  const type = w.type ?? 'other';
  const putCode = w['put-code'];

  const ids = w['external-ids']?.['external-id'] ?? [];
  const doi = ids.find((x) => x['external-id-type'] === 'doi')?.['external-id-value'];
  const fallbackUrl = ids.find((x) => x['external-id-url']?.value)?.['external-id-url']?.value ?? null;

  return {
    title,
    venue,
    year,
    type,
    url: doi ? `https://doi.org/${doi}` : fallbackUrl,
    putCode,
  };
}

function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-5 w-24 rounded-full bg-slate-200" />
        <div className="h-4 w-10 rounded bg-slate-200" />
      </div>
      <div className="h-5 w-4/5 rounded bg-slate-200" />
      <div className="h-4 w-3/5 rounded bg-slate-200" />
    </div>
  );
}

export default function Research() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch(ORCID_API, {
      headers: { Accept: 'application/json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`ORCID API ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const parsed = (data.group ?? [])
          .map(parseWork)
          .filter(Boolean)
          .sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
        setWorks(parsed);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const types = ['all', ...new Set(works.map((w) => w.type))];
  const filtered = filter === 'all' ? works : works.filter((w) => w.type === filter);

  return (
    <section id="research" className="py-24">
      <div className="container-page">
        <p className="eyebrow mb-4">Research</p>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Research &amp; publications</h2>
            <p className="section-copy mt-3">
              Publications are pulled automatically from{' '}
              <a
                href={`https://orcid.org/${ORCID_ID}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                ORCID
              </a>
              .
            </p>
          </div>

          <a
            href={`https://orcid.org/${ORCID_ID}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            View ORCID ↗
          </a>
        </div>

        {!loading && !error && types.length > 2 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={
                  filter === t
                    ? 'wrap-safe rounded-full px-4 py-1.5 text-sm font-medium transition bg-slate-900 text-white'
                    : 'wrap-safe rounded-full px-4 py-1.5 text-sm font-medium transition bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300'
                }
              >
                {t === 'all' ? 'All' : TYPE_META[t]?.label ?? t}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="card p-8 text-center">
            <p className="text-slate-600">Couldn’t load publications right now.</p>
            <a
              href={`https://orcid.org/${ORCID_ID}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
            >
              View on ORCID →
            </a>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((item, i) => (
              <article key={item.putCode ?? i} className="card wrap-safe p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="wrap-safe flex-1">
                    <span
                      className={`wrap-safe inline-block max-w-full rounded-full px-2.5 py-1 text-xs font-semibold ${
                        TYPE_META[item.type]?.color ?? TYPE_META.other.color
                      }`}
                    >
                      {TYPE_META[item.type]?.label ?? 'Publication'}
                    </span>
                    <h3 className="wrap-safe mt-3 text-lg font-semibold text-slate-900 sm:text-xl">
                      {item.title}
                    </h3>
                    {item.venue && (
                      <p className="wrap-safe mt-1 text-sm text-slate-500">{item.venue}</p>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-500">{item.year}</span>
                </div>

                {item.url && (
                  <div className="mt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-slate-900 underline underline-offset-4"
                    >
                      View publication →
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="py-12 text-center text-slate-400">No publications found.</p>
        )}
      </div>
    </section>
  );
}
