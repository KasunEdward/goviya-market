import type { FC } from 'react'
import type { Page, Translations } from '@/types'

interface HeroProps {
  t: Translations
  setPage: (page: Page) => void
}

const Hero: FC<HeroProps> = ({ t, setPage }) => {
  const h = t.hero

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a3d1f 0%, #1a5c32 45%, #0d4a26 100%)' }}
    >
      {/* Ambient glow — decorative only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[5%] w-64 h-64 -translate-y-1/2 bg-green-400/5 rounded-full blur-3xl" />
        <div className="absolute top-[10%] right-[5%] w-48 h-48 bg-amber-400/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-14 lg:py-16">
        {/* Two-column on lg+, single on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ── Left / text content ── */}
          <div className="animate-fade-up">
            {/* Live badge */}
            <div className="inline-flex items-center gap-1.5 bg-green-400/15 border border-green-400/30
                            text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
              {h.badge}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-snug text-white mb-3">
              {h.h1a}{' '}
              <em className="text-amber-400 not-italic font-serif">{h.h1em}</em>
              <br />
              {h.h1b}
            </h1>

            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-md">{h.sub}</p>

            {/* CTA buttons — stack on xs, row on sm+ */}
            <div className="flex flex-col xs:flex-row gap-3">
              <button
                className="btn-primary text-center"
                onClick={() => setPage('browse')}
              >
                {h.btn1}
              </button>
              <button
                className="btn-outline text-center"
                onClick={() => setPage('post')}
              >
                {h.btn2}
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-white/10">
              {[
                { n: h.s1n, l: h.s1l },
                { n: h.s2n, l: h.s2l },
                { n: h.s3n, l: h.s3l },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400">{n}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/55 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right / floating cards — hidden on mobile, visible lg+ ── */}
          <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {/* Main card */}
            <div className="bg-white/11 backdrop-blur border border-white/18 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🧅</span>
                <div>
                  <div className="text-sm font-bold">Big Onion • Dambulla</div>
                  <div className="text-[11px] text-white/55">800 kg available</div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xl font-black text-green-400">LKR 85</div>
                  <div className="text-[11px] text-white/50">per kg</div>
                </div>
                <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                  🌱 Fresh
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-3 border-t border-white/12">
                <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center text-[10px] font-black text-white">
                  KP
                </div>
                <div>
                  <div className="text-xs font-bold">Kamal Perera</div>
                  <div className="text-[10px] text-white/45">📍 Dambulla, Matale</div>
                </div>
                <div className="ml-auto bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded text-xs font-black">
                  ⭐ 4.8
                </div>
              </div>
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-4 -right-4 w-48 bg-amber-400/92 text-amber-800 rounded-xl p-3">
              <div className="text-xs font-black mb-1">🍅 Tomato • Organic</div>
              <div className="text-lg font-black">LKR 120/kg</div>
              <div className="text-[10px] mt-0.5 opacity-70">Nuwara Eliya</div>
            </div>
          </div>

          {/* ── Mobile hero quick-stats card (replaces floating cards) ── */}
          <div className="lg:hidden">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-white">
              <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
                {[
                  { emoji: '🧅', name: 'Onion', price: 'LKR 85' },
                  { emoji: '🍅', name: 'Tomato', price: 'LKR 120' },
                  { emoji: '🌾', name: 'Rice', price: 'LKR 145' },
                ].map((item) => (
                  <div key={item.name} className="px-3 first:pl-0 last:pr-0">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-[10px] text-white/60">{item.name}</div>
                    <div className="text-xs font-black text-green-400">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero
