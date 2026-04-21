import { useState } from 'react'
import type { FC } from 'react'
import type { Lang, Page, Translations } from '@/types'

interface NavbarProps {
  page: Page
  setPage: (page: Page) => void
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LANG_LABELS: Record<Lang, string> = { en: 'EN', si: 'සිං', ta: 'தமி' }

const Navbar: FC<NavbarProps> = ({ page, setPage, lang, setLang, t }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'browse',    label: t.nav.browse,    icon: '🌿' },
    { id: 'post',      label: t.nav.post,      icon: '➕' },
    { id: 'dashboard', label: t.nav.dashboard, icon: '📊' },
  ]

  const isActive = (id: Page): boolean =>
    page === id || (page === 'home' && id === 'browse')

  const navigate = (p: Page): void => {
    setPage(p)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Top bar ─────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/97 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-base shrink-0">
              🌾
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-extrabold text-green-800 leading-tight">
                {t.appName}
              </div>
              <div className="text-[9px] text-gray-400 leading-tight hidden sm:block">
                {t.tagline}
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`nav-btn ${isActive(id) ? 'nav-btn-active' : ''}`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate('login')}
              className="ml-1 px-3 py-1.5 bg-green-700 text-white text-xs font-bold rounded-lg
                         hover:bg-green-800 transition-colors"
            >
              {t.nav.login}
            </button>
            {/* Language picker */}
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5 ml-2">
              {(['en', 'si', 'ta'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    lang === l
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: lang switcher + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {(['en', 'si', 'ta'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    lang === l ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5
                         rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-200 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            menuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-sm font-semibold transition-colors ${
                              isActive(id)
                                ? 'bg-green-50 text-green-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
              >
                <span className="text-lg">{icon}</span>
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate('login')}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl
                         text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">👤</span>
              {t.nav.login}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile bottom tab bar ──────────────────── */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around px-1 py-1">
          {[
            ...navItems,
            { id: 'login' as Page, label: t.nav.login, icon: '👤' },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`mobile-nav-btn ${isActive(id) ? 'mobile-nav-btn-active' : ''}`}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="truncate w-14 text-center">{label}</span>
              {isActive(id) && (
                <span className="block w-4 h-0.5 rounded-full bg-green-600 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
