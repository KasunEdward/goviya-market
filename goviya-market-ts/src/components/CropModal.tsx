import { useEffect } from 'react'
import type { FC } from 'react'
import type { Crop, Lang, Translations } from '@/types'

interface CropModalProps {
  crop: Crop | null
  lang: Lang
  t: Translations
  onClose: () => void
}

const CropModal: FC<CropModalProps> = ({ crop, lang, t, onClose }) => {
  const m = t.modal

  // Lock body scroll when modal is open
  useEffect(() => {
    if (crop) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [crop])

  if (!crop) return null

  const name    = crop.name[lang]        ?? crop.name.en
  const variety = crop.variety[lang]     ?? crop.variety.en
  const desc    = crop.description[lang] ?? crop.description.en

  const details = [
    { label: m.qty,  value: `${crop.qty} kg` },
    { label: m.min,  value: `${crop.minOrder} kg` },
    { label: m.harv, value: crop.harvestDate },
    { label: m.dist, value: `${crop.city}, ${crop.district}` },
  ]

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Dim */}
      <div className="absolute inset-0 bg-black/50" />

      {/*
        On mobile  → full-width bottom sheet, slides up from bottom edge
        On sm+     → centred floating card with max-width
      */}
      <div
        className="
          relative w-full bg-white overflow-y-auto
          rounded-t-3xl sm:rounded-2xl
          max-h-[92vh] sm:max-w-lg sm:mx-4
          animate-fade-up
        "
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
      >
        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start px-5 pt-3 sm:pt-5 pb-0">
          <div>
            <div className="text-base sm:text-lg font-black text-gray-900">{name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{variety} • {crop.district}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm flex items-center
                       justify-center hover:bg-gray-200 transition-colors shrink-0 ml-3 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pt-4 pb-4">
          {/* Hero price section */}
          <div className="bg-green-50 rounded-xl p-4 sm:p-5 text-center mb-4">
            <div className="text-4xl sm:text-5xl mb-2">{crop.emoji}</div>
            <div className="text-2xl sm:text-3xl font-black text-green-700">
              LKR {crop.price}
              <span className="text-sm font-normal text-gray-500">/kg</span>
            </div>
            {crop.organic && (
              <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-0.5 rounded-full text-xs font-bold">
                🌿 Organic Certified
              </span>
            )}
          </div>

          {/* Detail grid — 2-col on all sizes */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {details.map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-[9px] text-gray-400 uppercase tracking-wide font-bold mb-1">
                  {label}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-800">{value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-3.5 mb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            {desc}
          </div>

          {/* Farmer */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 mb-4">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">
              {m.farmer}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                style={{ background: crop.farmer.color }}
              >
                {crop.farmer.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{crop.farmer.name}</div>
                <div className="text-xs text-gray-500">📍 {crop.city}, {crop.district}</div>
              </div>
              <div className="ml-auto text-right shrink-0">
                <div className="text-sm font-black text-amber-600">⭐ {crop.farmer.rating}</div>
                <div className="text-[10px] text-gray-400">{crop.farmer.sales} sales</div>
              </div>
            </div>
            <div className="text-xs font-bold text-green-700">✅ {m.verified}</div>
          </div>

          {/* Contact — stacked on xs, row on sm+ */}
          <div className="flex flex-col xs:flex-row gap-2">
            <button className="flex-1 py-3 bg-green-700 text-white text-xs sm:text-sm font-bold rounded-xl
                               hover:bg-green-800 active:scale-95 transition-all touch-manipulation">
              📞 {m.call}
            </button>
            <button
              className="flex-1 py-3 text-white text-xs sm:text-sm font-bold rounded-xl
                         active:scale-95 transition-all touch-manipulation"
              style={{ background: '#25D366' }}
            >
              💬 {m.wa}
            </button>
            <button className="flex-1 py-3 bg-sky-600 text-white text-xs sm:text-sm font-bold rounded-xl
                               hover:bg-sky-700 active:scale-95 transition-all touch-manipulation">
              ✉️ {m.em}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropModal
