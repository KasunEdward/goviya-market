import { useState } from 'react'
import type { FC, ChangeEvent } from 'react'
import type { PostFormState, ToastType, Translations } from '@/types'

interface CropOption { e: string; l: string }

const CROP_OPTIONS: CropOption[] = [
  { e: '🧅', l: 'Onion'   }, { e: '🍅', l: 'Tomato'  }, { e: '🥕', l: 'Carrot'  },
  { e: '🥬', l: 'Greens'  }, { e: '🌶', l: 'Chilli'  }, { e: '🍈', l: 'Pumpkin' },
  { e: '🍌', l: 'Banana'  }, { e: '🫚', l: 'Coconut' }, { e: '🥭', l: 'Mango'   },
  { e: '🌾', l: 'Rice'    }, { e: '🫘', l: 'Pulses'  }, { e: '🧄', l: 'Garlic'  },
  { e: '🥦', l: 'Cabbage' }, { e: '🍠', l: 'Yam'     }, { e: '🥜', l: 'Nuts'    },
]

const INITIAL_FORM: PostFormState = {
  cropType: '', variety: '', description: '',
  price: '', minOrder: '', available: '',
  harvestDate: '', district: '', city: '',
  farmerName: '', phone: '',
  organic: false, notes: '',
}

interface PostPageProps {
  t: Translations
  showToast: (msg: string, type?: ToastType) => void
}

const PostPage: FC<PostPageProps> = ({ t, showToast }) => {
  const p = t.post
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null)
  const [form, setForm] = useState<PostFormState>(INITIAL_FORM)

  function set<K extends keyof PostFormState>(key: K, value: PostFormState[K]): void {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (): void => {
    if (!form.farmerName || !form.price || !form.district) {
      showToast('Please fill all required fields', 'error')
      return
    }
    showToast(p.ok, 'success')
    setForm(INITIAL_FORM)
    setSelectedCrop(null)
  }

  return (
    <div className="pt-5 sm:pt-8 pb-24 md:pb-8">
      <div className="section-label">{p.label}</div>
      <div className="section-heading">{p.heading}</div>
      <div className="section-sub">{p.sub}</div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 max-w-2xl mx-auto">

        {/* ── Section 1: Crop Info ── */}
        <div className="mb-6 sm:mb-7">
          <div className="form-section-title">🌱 {p.s1}</div>

          {/* Crop picker — 4 cols on mobile, 5 on sm+ */}
          <div className="mb-4">
            <label className="form-label">{p.lCrop}</label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {CROP_OPTIONS.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setSelectedCrop(i); set('cropType', c.l) }}
                  className={`p-2 border-2 rounded-xl text-center transition-all active:scale-95 touch-manipulation ${
                    selectedCrop === i
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <span className="block text-xl sm:text-2xl mb-0.5">{c.e}</span>
                  <span className="block text-[9px] sm:text-[10px] font-semibold text-gray-600 leading-tight">
                    {c.l}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Variety + date — single col on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="form-label">{p.lVar}</label>
              <input
                className="input-field"
                placeholder={p.pVar}
                value={form.variety}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('variety', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">
                {p.lHarv} <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="input-field"
                value={form.harvestDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('harvestDate', e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">{p.lDesc}</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder={p.pDesc}
                value={form.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Pricing ── */}
        <div className="mb-6 sm:mb-7">
          <div className="form-section-title">💰 {p.s2}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="form-label">
                {p.lPrice} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="input-field"
                placeholder={p.pPrice}
                value={form.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('price', e.target.value)}
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">LKR per kg</span>
            </div>
            <div>
              <label className="form-label">
                {p.lAvail} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                className="input-field"
                placeholder={p.pAvail}
                value={form.available}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('available', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">{p.lMinOrd}</label>
              <input
                type="number"
                inputMode="numeric"
                className="input-field"
                placeholder={p.pMin}
                value={form.minOrder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('minOrder', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 pt-1 sm:pt-5">
              <input
                type="checkbox"
                id="organic"
                checked={form.organic}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('organic', e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-green-600 rounded"
              />
              <label htmlFor="organic" className="text-sm font-bold text-gray-700 cursor-pointer">
                🌿 {p.lOrganic}
              </label>
            </div>
          </div>
        </div>

        {/* ── Section 3: Location ── */}
        <div className="mb-6 sm:mb-7">
          <div className="form-section-title">📍 {p.s3}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="form-label">
                {p.lDist} <span className="text-red-500">*</span>
              </label>
              <select
                className="select-field"
                value={form.district}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => set('district', e.target.value)}
              >
                <option value="">Select district…</option>
                {p.districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">{p.lCity}</label>
              <input
                className="input-field"
                placeholder={p.pCity}
                value={form.city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('city', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">
                {p.lName} <span className="text-red-500">*</span>
              </label>
              <input
                className="input-field"
                placeholder={p.pName}
                value={form.farmerName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('farmerName', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">
                {p.lPhone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="input-field"
                placeholder={p.pPhone}
                value={form.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('phone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Section 4: Notes ── */}
        <div className="mb-5 sm:mb-6">
          <div className="form-section-title">📝 {p.s4}</div>
          <textarea
            className="input-field resize-none w-full"
            rows={3}
            placeholder={p.pNotes}
            value={form.notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('notes', e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 bg-green-700 text-white font-extrabold text-sm sm:text-base
                     rounded-xl hover:bg-green-800 transition-all active:scale-95 touch-manipulation"
        >
          {p.submit} →
        </button>
      </div>
    </div>
  )
}

export default PostPage
