import { useState } from 'react'
import type { FC } from 'react'
import type { Crop, CropCategory, Lang, SortOption, Translations } from '@/types'
import crops from '@/data/crops'
import CropCard from './CropCard'
import CropModal from './CropModal'

interface BrowsePageProps {
  lang: Lang
  t: Translations
  saved: Set<number>
  toggleSave: (id: number) => void
}

const CAT_IDS: Array<'all' | CropCategory> = [
  'all', 'vegetables', 'fruits', 'grains', 'spices',
]

const BrowsePage: FC<BrowsePageProps> = ({ lang, t, saved, toggleSave }) => {
  const [query,    setQuery]    = useState<string>('')
  const [category, setCategory] = useState<'all' | CropCategory>('all')
  const [sort,     setSort]     = useState<SortOption>(0)
  const [modal,    setModal]    = useState<Crop | null>(null)
  const [showSort, setShowSort] = useState(false)

  const br = t.browse

  const filtered: Crop[] = crops
    .filter((c) => {
      const matchCat = category === 'all' || c.category === category
      const q = query.toLowerCase()
      const matchQ =
        !q ||
        c.name.en.toLowerCase().includes(q) ||
        (c.name[lang] ?? '').toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      return matchCat && matchQ
    })
    .sort((a, b) => {
      if (sort === 1) return a.price - b.price
      if (sort === 2) return b.price - a.price
      if (sort === 3) return b.qty - a.qty
      return b.id - a.id
    })

  return (
    <div className="pt-5 sm:pt-8">
      {modal && (
        <CropModal crop={modal} lang={lang} t={t} onClose={() => setModal(null)} />
      )}

      <div className="section-label">{br.label}</div>
      <div className="section-heading">{br.heading}</div>
      <div className="section-sub">{br.sub}</div>

      {/* ── Search bar ── */}
      <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl
                      px-3 sm:px-4 py-1.5 mb-3 focus-within:border-green-400 transition-colors">
        <span className="text-gray-400 shrink-0">🔍</span>
        <input
          className="flex-1 border-none outline-none text-sm font-sans text-gray-800
                     placeholder-gray-400 bg-transparent min-w-0"
          placeholder={br.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="shrink-0 px-3 sm:px-4 py-1.5 bg-green-700 text-white text-xs font-bold
                     rounded-xl hover:bg-green-800 active:scale-95 transition-all touch-manipulation"
        >
          {br.searchBtn}
        </button>
      </div>

      {/* ── Category chips + sort — horizontal scroll on mobile ── */}
      <div className="flex items-center gap-2 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto
                      scrollbar-none pb-1">
        {br.cats.map((label, i) => (
          <button
            key={i}
            className={`chip shrink-0 ${category === CAT_IDS[i] ? 'chip-active' : ''}`}
            onClick={() => setCategory(CAT_IDS[i])}
          >
            {label}
          </button>
        ))}

        {/* Sort button — icon on mobile, full label on sm+ */}
        <button
          onClick={() => setShowSort((s) => !s)}
          className="shrink-0 ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full
                     border-2 border-gray-200 bg-white text-gray-600 text-xs font-semibold
                     hover:border-green-400 transition-colors active:scale-95 touch-manipulation"
        >
          <span>⇅</span>
          <span className="hidden sm:inline">{br.sortLabel}</span>
          <span className="hidden sm:inline">{br.sorts[sort]}</span>
        </button>
      </div>

      {/* Sort dropdown (mobile-friendly) */}
      {showSort && (
        <div className="mb-4 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg
                        sm:hidden">
          {br.sorts.map((s, i) => (
            <button
              key={i}
              onClick={() => { setSort(i as SortOption); setShowSort(false) }}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors
                          border-b border-gray-100 last:border-0 ${
                sort === i ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Desktop sort (hidden on mobile) */}
      <div className="hidden sm:flex justify-end mb-4 -mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{br.sortLabel}</span>
          <select
            className="select-field !w-auto text-xs"
            value={sort}
            onChange={(e) => setSort(Number(e.target.value) as SortOption)}
          >
            {br.sorts.map((s, i) => <option key={i} value={i}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* ── Results count ── */}
      {filtered.length > 0 && (
        <div className="text-xs text-gray-400 mb-3">
          {filtered.length} crop{filtered.length !== 1 ? 's' : ''} found
        </div>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🌾</div>
          <div className="text-base font-bold text-gray-600 mb-2">{br.noResults}</div>
          <div className="text-sm">{br.noResultsSub}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((c) => (
            <CropCard
              key={c.id}
              crop={c}
              lang={lang}
              t={t}
              onView={setModal}
              saved={saved.has(c.id)}
              onSave={toggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BrowsePage
