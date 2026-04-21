import type { FC } from 'react'
import type { Crop, Lang, Translations } from '@/types'

interface CropCardProps {
  crop: Crop
  lang: Lang
  t: Translations
  onView: (crop: Crop) => void
  saved: boolean
  onSave: (id: number) => void
}

const CropCard: FC<CropCardProps> = ({ crop, lang, t, onView, saved, onSave }) => {
  const br      = t.browse
  const name    = crop.name[lang]    ?? crop.name.en
  const variety = crop.variety[lang] ?? crop.variety.en

  const badgeClass =
    crop.badge === 'fresh'     ? 'badge-fresh' :
    crop.badge === 'certified' ? 'badge-certified' :
                                 'badge-urgent'
  const badgeText =
    crop.badge === 'fresh'     ? '🌱 Fresh' :
    crop.badge === 'certified' ? '✅ Certified' :
                                 '⚡ Limited'

  return (
    <div className="card animate-fade-up" onClick={() => onView(crop)}>
      {/* Top */}
      <div className="p-3.5 sm:p-4 pb-3 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <span className="text-3xl sm:text-4xl leading-none">{crop.emoji}</span>
          <span className={badgeClass}>{badgeText}</span>
        </div>
        <div className="text-sm sm:text-base font-extrabold text-gray-900 mb-0.5 leading-snug">
          {name}
        </div>
        <div className="text-xs text-gray-500">{variety}</div>
        <div className="flex gap-2 mt-1.5 flex-wrap">
          <span className="text-[10px] text-gray-500">📍 {crop.city}</span>
          <span className="text-[10px] text-gray-500">🏷 {crop.district}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 sm:p-4 pb-3">
        <div className="flex items-baseline gap-1 mb-2.5">
          <span className="text-lg sm:text-xl font-black text-green-700">LKR {crop.price}</span>
          <span className="text-xs text-gray-500">{br.perKg}</span>
        </div>

        <div className="flex justify-between mb-2.5 gap-1">
          <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-lg text-[10px] font-bold">
            📦 {br.qty}: {crop.qty} kg
          </span>
          <span className="bg-sky-50 text-sky-800 border border-sky-100 px-2 py-1 rounded-lg text-[10px] font-bold">
            🗓 {crop.harvestDate.slice(5).replace('-', '/')}
          </span>
        </div>

        {/* Farmer row */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100">
          <div
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-black text-white shrink-0"
            style={{ background: crop.farmer.color }}
          >
            {crop.farmer.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-700 truncate">{crop.farmer.name}</div>
            <div className="text-[9px] text-gray-400">📍 {crop.city}</div>
          </div>
          <div className="ml-auto text-xs font-black text-amber-600 shrink-0">
            ⭐ {crop.farmer.rating}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex gap-2 px-3.5 sm:px-4 pb-3.5 sm:pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex-1 py-2 sm:py-2.5 bg-green-700 text-white text-xs font-bold rounded-xl
                     hover:bg-green-800 active:scale-95 transition-all touch-manipulation"
          onClick={() => onView(crop)}
        >
          {br.contact}
        </button>
        <button
          className={`px-3 py-2 rounded-xl border-2 text-sm transition-all active:scale-95 touch-manipulation ${
            saved
              ? 'border-amber-400 text-amber-500 bg-amber-50'
              : 'border-gray-200 text-gray-400 hover:border-amber-400 hover:text-amber-500'
          }`}
          onClick={() => onSave(crop.id)}
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>
    </div>
  )
}

export default CropCard
