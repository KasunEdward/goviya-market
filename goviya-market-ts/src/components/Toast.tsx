import type { FC } from 'react'
import type { ToastState } from '@/types'

type ToastProps = ToastState

const Toast: FC<ToastProps> = ({ msg, type }) => (
  <div
    className={`
      fixed z-[200] flex items-center gap-2 px-4 py-3 rounded-2xl
      text-white text-xs font-bold shadow-2xl animate-fade-up
      /* Mobile: full-width banner above bottom nav */
      bottom-20 left-4 right-4
      /* sm+: compact pill in corner */
      sm:bottom-5 sm:right-5 sm:left-auto sm:w-auto sm:rounded-xl
      ${type === 'error' ? 'bg-red-600' : 'bg-green-700'}
    `}
  >
    <span>{type === 'error' ? '❌' : '✅'}</span>
    <span className="flex-1 sm:flex-none">{msg}</span>
  </div>
)

export default Toast
