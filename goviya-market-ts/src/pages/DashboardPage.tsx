import { useState } from 'react'
import type { FC } from 'react'
import type { DashboardListing, Lang, ListingStatus, Message, StatCard, Translations } from '@/types'
import crops from '@/data/crops'

interface DashboardPageProps {
  lang: Lang
  t: Translations
}

const MESSAGES: Message[] = [
  { from: 'Lakshmi Trading Co.', msg: 'Interested in 500kg tomatoes. Can you deliver to Colombo?', time: '2h ago', emoji: '🍅', unread: true  },
  { from: 'Ravi Wholesale Market', msg: 'What is your best price for 1000kg onions?',              time: '5h ago', emoji: '🧅', unread: true  },
  { from: 'Fresh Foods Ltd',       msg: 'Need organic carrots. Can you certify organic?',           time: '1d ago', emoji: '🥕', unread: false },
]

const STATUS_SEQUENCE: ListingStatus[] = ['active', 'sold', 'active', 'pending', 'active']

const DashboardPage: FC<DashboardPageProps> = ({ lang, t }) => {
  const d = t.dash
  const [activeTab, setActiveTab] = useState<number>(0)

  const listings: DashboardListing[] = crops.slice(0, 5).map((c, i) => ({
    ...c,
    status: STATUS_SEQUENCE[i],
    views: [182, 94, 231, 67, 145][i],
  }))

  const statCards: StatCard[] = [
    { icon: '📋', num: '5',       label: d.stats[0], change: '↑ 2',   up: true  },
    { icon: '👁', num: '1,240',   label: d.stats[1], change: '↑ 18%', up: true  },
    { icon: '💬', num: '47',      label: d.stats[2], change: '↓ 3%',  up: false },
    { icon: '💰', num: '142,000', label: d.stats[3], change: '↑ 12%', up: true  },
  ]

  const statusColor: Record<ListingStatus, string> = {
    active:  'text-green-700',
    sold:    'text-gray-500',
    pending: 'text-amber-600',
  }
  const dotColor: Record<ListingStatus, string> = {
    active:  'bg-green-400',
    sold:    'bg-gray-400',
    pending: 'bg-amber-400',
  }

  return (
    <div className="pt-5 sm:pt-8 pb-24 md:pb-8">
      <div className="section-label">{d.label}</div>
      <div className="section-heading">{d.heading}</div>
      <div className="section-sub">{d.sub}</div>

      {/* ── Stat cards — 2-col mobile, 4-col desktop ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="text-xl sm:text-2xl mb-1.5 sm:mb-2">{s.icon}</div>
            <div className="text-xl sm:text-2xl font-black text-gray-900">{s.num}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            <span
              className={`inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                s.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}
            >
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tabs — scrollable on mobile ── */}
      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit mb-5 sm:mb-6 max-w-full overflow-x-auto">
        {d.tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap touch-manipulation ${
              activeTab === i
                ? 'bg-white text-gray-900 font-bold shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab 0: Listings — horizontal scroll on mobile ── */}
      {activeTab === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3 bg-gray-50
                            border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
              {d.thdrs.map((h) => <div key={h}>{h}</div>)}
            </div>
            {listings.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-5 py-3.5
                           border-b border-gray-100 last:border-0 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{c.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{c.name[lang] ?? c.name.en}</div>
                    <div className="text-[10px] text-gray-400">{c.variety[lang] ?? c.variety.en}</div>
                  </div>
                </div>
                <div className="text-sm font-black text-green-700">LKR {c.price}</div>
                <div className="text-xs text-gray-700">{c.qty} kg</div>
                <div className="text-xs text-gray-700">{c.harvestDate}</div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor[c.status]}`} />
                  <span className={`text-xs font-bold capitalize ${statusColor[c.status]}`}>{c.status}</span>
                </div>
                <div>
                  <button className="px-2.5 py-1 border border-gray-200 rounded-lg text-[11px] text-gray-600
                                     hover:border-green-400 hover:text-green-700 transition-colors">
                    {d.edit}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-gray-100">
            {listings.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-4">
                <span className="text-2xl shrink-0">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">{c.name[lang] ?? c.name.en}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-black text-green-700">LKR {c.price}/kg</span>
                    <span className="text-[10px] text-gray-400">{c.qty} kg</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor[c.status]}`} />
                    <span className={`text-[10px] font-bold capitalize ${statusColor[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <button className="px-2 py-0.5 border border-gray-200 rounded-lg text-[10px] text-gray-600
                                     hover:border-green-400 hover:text-green-700 transition-colors">
                    {d.edit}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 1: Analytics placeholder ── */}
      {activeTab === 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-5xl mb-4">📊</div>
          <div className="text-base font-bold text-gray-600 mb-2">Analytics Dashboard</div>
          <div className="text-sm text-gray-400">Charts and insights coming soon</div>
        </div>
      )}

      {/* ── Tab 2: Messages ── */}
      {activeTab === 2 && (
        <div className="space-y-2.5 sm:space-y-3">
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-3.5 sm:p-4 flex gap-3
                         items-start cursor-pointer hover:border-green-300 active:bg-gray-50 transition-colors"
            >
              <span className="text-2xl shrink-0">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-bold text-gray-900 truncate pr-2">{m.from}</div>
                  <div className="text-[10px] text-gray-400 shrink-0">{m.time}</div>
                </div>
                <div className="text-xs text-gray-600 truncate">{m.msg}</div>
              </div>
              {m.unread && (
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
