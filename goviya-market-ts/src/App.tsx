import { useState, useCallback } from 'react'
import type { FC } from 'react'
import { useLang } from '@/hooks/useLang'
import type { Page, ToastState, ToastType } from '@/types'

import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import BrowsePage    from '@/pages/BrowsePage'
import PostPage      from '@/pages/PostPage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage     from '@/pages/LoginPage'
import Footer        from '@/components/Footer'
import Toast         from '@/components/Toast'

const TOAST_DURATION_MS = 3000

const App: FC = () => {
  const { lang, setLang, t } = useLang()

  const [page,  setPage]  = useState<Page>('home')
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((msg: string, type: ToastType = 'success'): void => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), TOAST_DURATION_MS)
  }, [])

  const toggleSave = useCallback((id: number): void => {
    setSaved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />

      {/* Hero only on home page */}
      {page === 'home' && <Hero t={t} setPage={setPage} />}

      {/*
        Main content area:
        - pb-20 on mobile so content clears the fixed bottom nav bar (h ≈ 64px)
        - md:pb-0 removes that extra padding on desktop (no bottom nav)
      */}
      <main className="max-w-6xl mx-auto px-4 pb-20 md:pb-8">
        {(page === 'home' || page === 'browse') && (
          <BrowsePage lang={lang} t={t} saved={saved} toggleSave={toggleSave} />
        )}
        {page === 'post' && (
          <PostPage t={t} showToast={showToast} />
        )}
        {page === 'dashboard' && (
          <DashboardPage lang={lang} t={t} />
        )}
        {page === 'login' && (
          <LoginPage showToast={showToast} />
        )}
      </main>

      <Footer t={t} />

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}

export default App
