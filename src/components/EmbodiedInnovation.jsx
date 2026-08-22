import { useMemo, useState } from 'react'
import { navigateTo } from '../App'

const cities = [
  { name: 'Beijing', region: 'North', road: 600, permits: 34, fleet: 850, policy: 'Commercial pilots', companies: ['Baidu Apollo', 'Pony.ai', 'WeRide'] },
  { name: 'Shanghai', region: 'East', road: 1003, permits: 28, fleet: 720, policy: 'Demonstration zone', companies: ['SAIC', 'AutoX', 'Momenta'] },
  { name: 'Shenzhen', region: 'South', road: 771, permits: 26, fleet: 690, policy: 'Driverless testing', companies: ['DeepRoute.ai', 'Pony.ai', 'BYD'] },
  { name: 'Guangzhou', region: 'South', road: 833, permits: 22, fleet: 610, policy: 'Robotaxi pilots', companies: ['WeRide', 'Pony.ai', 'GAC'] },
  { name: 'Wuhan', region: 'Central', road: 3379, permits: 19, fleet: 1000, policy: 'Large-scale service', companies: ['Baidu Apollo', 'Dongfeng'] },
  { name: 'Chongqing', region: 'West', road: 500, permits: 14, fleet: 320, policy: 'Complex-road testing', companies: ['Changan', 'Baidu Apollo'] },
]

const layers = [
  { id: 'compute', label: 'Compute & sensing', color: '#0f766e', detail: 'Lidar, chips, edge compute, high-precision positioning', actors: ['Hesai', 'RoboSense', 'Huawei', 'Black Sesame'] },
  { id: 'software', label: 'Autonomy stack', color: '#2563eb', detail: 'Perception, planning, simulation, mapping, fleet operations', actors: ['Baidu Apollo', 'Momenta', 'Pony.ai', 'WeRide'] },
  { id: 'vehicle', label: 'Vehicle platforms', color: '#7c3aed', detail: 'Passenger EVs, purpose-built robotaxis, commercial vehicles', actors: ['BYD', 'Geely', 'SAIC', 'GAC', 'Dongfeng'] },
  { id: 'infrastructure', label: 'Roadside infrastructure', color: '#d97706', detail: 'Connected roads, roadside units, intelligent intersections, cloud control', actors: ['Local governments', 'Telecom operators', 'Zone developers'] },
  { id: 'governance', label: 'Pilots & regulation', color: '#be123c', detail: 'Test permits, demonstration zones, safety rules, commercial licensing', actors: ['Municipal governments', 'MIIT', 'MPS', 'MOT'] },
]

const milestones = [
  { year: 2015, label: 'National strategy', text: 'Made in China 2025 places intelligent connected vehicles on the industrial-policy agenda.' },
  { year: 2017, label: 'Open platforms', text: 'Apollo opens its autonomous driving platform, accelerating an ecosystem approach to development.' },
  { year: 2019, label: 'City pilots', text: 'Municipal test zones expand and vehicle-road coordination becomes a core infrastructure model.' },
  { year: 2021, label: 'Commercialization', text: 'Robotaxi operators begin charging passengers in selected demonstration areas.' },
  { year: 2023, label: 'Driverless scale', text: 'Multiple cities widen fully driverless testing and road access.' },
  { year: 2025, label: 'Integration', text: 'Competition shifts toward fleet economics, vehicle integration, and repeatable urban deployment.' },
]

function Metric({ value, label, note }) {
  return (
    <div className="border-t border-slate-700 pt-4">
      <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-200">{label}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{note}</p>
    </div>
  )
}

export default function EmbodiedInnovation() {
  const [region, setRegion] = useState('All')
  const [metric, setMetric] = useState('road')
  const [selectedCity, setSelectedCity] = useState(cities[4])
  const [selectedLayer, setSelectedLayer] = useState(layers[1])
  const [year, setYear] = useState(2025)

  const filteredCities = useMemo(
    () => cities.filter((city) => region === 'All' || city.region === region),
    [region],
  )
  const maxValue = Math.max(...filteredCities.map((city) => city[metric]))
  const selectedMilestone = milestones.reduce((latest, item) => item.year <= year ? item : latest, milestones[0])

  return (
    <main className="bg-[#f5f3ee] text-slate-900">
      <section className="relative overflow-hidden bg-[#101820] pb-20 pt-28 text-white">
        <div className="absolute inset-0 opacity-20 embodied-grid" />
        <div className="container-page relative">
          <button type="button" onClick={() => navigateTo('/#data')} className="text-sm text-cyan-300 transition hover:text-white">
            ← Back to data projects
          </button>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.45fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">Interactive research atlas · China</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Embodied Innovation in China
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Explore how autonomous vehicles emerge from a distributed system of software, manufacturing, urban infrastructure, and local state experimentation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Metric value="6" label="Urban systems" note="Selected city profiles" />
              <Metric value="5" label="Industry layers" note="From sensors to governance" />
              <Metric value="2015–25" label="Policy arc" note="A decade of experimentation" />
              <Metric value="3" label="Interactive views" note="Cities, stack, timeline" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-300 py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.4fr]">
            <div>
              <p className="eyebrow">01 · Geography of deployment</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Cities are the proving ground</h2>
              <p className="mt-4 max-w-md leading-7 text-slate-600">Compare the scale and character of municipal autonomous-driving programs. Select a metric, filter by region, then choose a city for detail.</p>
              <div className="mt-8 flex flex-wrap gap-2" aria-label="Region filter">
                {['All', 'North', 'East', 'South', 'Central', 'West'].map((item) => (
                  <button key={item} type="button" onClick={() => setRegion(item)} className={`rounded-full px-4 py-2 text-sm transition ${region === item ? 'bg-slate-900 text-white' : 'border border-stone-300 bg-white/60 text-slate-600 hover:border-slate-500'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-stone-300 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap justify-between gap-4 border-b border-stone-200 pb-5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Deployment indicators</p>
                  <p className="mt-1 text-xs text-slate-500">Select a bar to inspect the city</p>
                </div>
                <div className="flex rounded-lg bg-stone-100 p-1">
                  {[['road', 'Open road km'], ['fleet', 'Pilot fleet'], ['permits', 'Permits']].map(([id, label]) => (
                    <button key={id} type="button" onClick={() => setMetric(id)} className={`rounded-md px-3 py-2 text-xs font-medium ${metric === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="mt-7 space-y-5">
                {filteredCities.map((city) => (
                  <button key={city.name} type="button" onClick={() => setSelectedCity(city)} className="group grid w-full grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 text-left" aria-label={`View ${city.name}`}>
                    <span className={`text-sm font-medium ${selectedCity.name === city.name ? 'text-blue-700' : 'text-slate-700'}`}>{city.name}</span>
                    <span className="h-7 overflow-hidden rounded-sm bg-stone-100">
                      <span className="block h-full origin-left rounded-sm bg-blue-600 transition-all duration-500 group-hover:bg-cyan-600" style={{ width: `${(city[metric] / maxValue) * 100}%` }} />
                    </span>
                    <span className="text-right font-mono text-xs text-slate-500">{city[metric].toLocaleString()}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 grid gap-5 rounded-2xl bg-slate-900 p-6 text-white sm:grid-cols-[1fr_1.5fr]">
                <div><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Selected city</p><p className="mt-2 text-3xl font-semibold">{selectedCity.name}</p><p className="mt-2 text-sm text-slate-400">{selectedCity.policy}</p></div>
                <div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Associated actors</p><div className="mt-3 flex flex-wrap gap-2">{selectedCity.companies.map((company) => <span key={company} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200">{company}</span>)}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <p className="eyebrow">02 · The industrial stack</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Autonomy is more than the vehicle</h2>
            <p className="max-w-xl leading-7 text-slate-600">Select a layer to trace the technical and institutional systems that must align before autonomous driving can operate at urban scale.</p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-3">
              {layers.map((layer, index) => (
                <button key={layer.id} type="button" onClick={() => setSelectedLayer(layer)} className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selectedLayer.id === layer.id ? 'border-slate-900 bg-slate-900 text-white shadow-lg' : 'border-stone-200 bg-[#f5f3ee] hover:border-stone-400'}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-sm text-white" style={{ backgroundColor: layer.color }}>0{index + 1}</span>
                  <span className="font-semibold">{layer.label}</span>
                  <span className="ml-auto text-xl opacity-50">→</span>
                </button>
              ))}
            </div>
            <div className="flex min-h-[360px] flex-col justify-between rounded-3xl p-8 text-white" style={{ backgroundColor: selectedLayer.color }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">Active layer</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">{selectedLayer.label}</h3>
                <p className="mt-4 text-lg leading-8 text-white/80">{selectedLayer.detail}</p>
              </div>
              <div className="mt-10 border-t border-white/25 pt-5"><p className="text-xs uppercase tracking-[0.2em] text-white/60">Representative actors</p><div className="mt-3 flex flex-wrap gap-2">{selectedLayer.actors.map((actor) => <span key={actor} className="rounded-full bg-white/15 px-3 py-1.5 text-sm">{actor}</span>)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101820] py-20 text-white">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">03 · From policy to deployment</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">A decade of coordinated experimentation</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <input type="range" min="2015" max="2025" step="1" value={year} onChange={(event) => setYear(Number(event.target.value))} className="embodied-range w-full" aria-label="Timeline year" />
              <div className="mt-4 flex justify-between font-mono text-xs text-slate-500"><span>2015</span><span>2020</span><span>2025</span></div>
              <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {milestones.map((item) => <button key={item.year} type="button" onClick={() => setYear(item.year)} className={`rounded-xl border px-2 py-3 text-center font-mono text-xs transition ${selectedMilestone.year === item.year ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}>{item.year}</button>)}
              </div>
            </div>
            <div className="border-l border-slate-700 pl-6">
              <p className="font-mono text-5xl text-cyan-300">{year}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{selectedMilestone.label}</p>
              <p className="mt-3 text-lg leading-8 text-slate-200">{selectedMilestone.text}</p>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-700 pt-6 text-xs leading-5 text-slate-500">
            Prototype note: figures and actor groupings are illustrative placeholders for interface development. Replace with sourced project data before publication.
          </div>
        </div>
      </section>
    </main>
  )
}
