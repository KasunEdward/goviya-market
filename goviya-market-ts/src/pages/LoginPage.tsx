import type { FC } from 'react'
import type { ToastType } from '@/types'

interface LoginPageProps {
  showToast: (msg: string, type?: ToastType) => void
}

const LoginPage: FC<LoginPageProps> = ({ showToast }) => (
  <div className="pt-8 pb-28 md:pb-16 max-w-sm mx-auto text-center px-1">
    <div className="text-5xl mb-4">🔐</div>
    <div className="text-2xl font-black text-gray-900 mb-2">Login / Register</div>
    <div className="text-sm text-gray-500 mb-8">
      Farmer verification &amp; secure login coming soon
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 text-left">
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input className="input-field" type="tel" placeholder="📱 +94 77 XXX XXXX" />
      </div>
      <div className="mb-5">
        <label className="form-label">Password</label>
        <input type="password" className="input-field" placeholder="🔑 Enter password" />
      </div>
      <button
        type="button"
        onClick={() => showToast('Login feature coming soon!')}
        className="w-full py-3.5 bg-green-700 text-white font-extrabold text-sm rounded-xl
                   hover:bg-green-800 active:scale-95 transition-all touch-manipulation"
      >
        Login →
      </button>
      <p className="text-xs text-gray-500 text-center mt-4">
        New farmer?{' '}
        <a href="#" className="text-green-700 font-bold hover:underline">
          Register here
        </a>
      </p>
    </div>
  </div>
)

export default LoginPage
