import type { FC } from 'react'
import type { Translations } from '@/types'

interface FooterProps {
  t: Translations
}

interface FooterColumn {
  title: string
  links: string[]
}

const COLUMNS: FooterColumn[] = [
  { title: 'Platform', links: ['Browse Crops', 'Post Listing', 'Dashboard', 'Verified Sellers'] },
  { title: 'Support',  links: ['Help Center', 'Contact Us', 'Farmer Guide', 'Buyer Guide'] },
  { title: 'Info',     links: ['About Us', 'Privacy Policy', 'Terms', 'Market Prices'] },
]

const Footer: FC<FooterProps> = ({ t }) => (
  /* Extra bottom padding on mobile so content doesn't hide behind the fixed bottom nav */
  <footer className="bg-gray-900 text-gray-500 pt-10 px-4 pb-24 md:pb-10 mt-12 sm:mt-16">
    <div className="max-w-6xl mx-auto">
      {/* Grid: 1-col xs, 2-col sm, 4-col lg */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand — spans full width on xs */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center text-sm shrink-0">
              🌾
            </div>
            <span className="text-base font-extrabold text-white">{t.appName}</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-600 max-w-xs">
            Connecting farmers and buyers across Sri Lanka. Empowering agriculture with technology.
          </p>
          <p className="text-xs text-gray-700 mt-2">🇱🇰 Made for Sri Lanka</p>
        </div>

        {/* Link columns */}
        {COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wide">{title}</h4>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-xs text-gray-600 hover:text-green-400 transition-colors mb-1.5"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-gray-800 flex flex-col sm:flex-row justify-between
                      gap-1 text-[11px] text-gray-700">
        <span>© 2025 GoviyaMarket. All rights reserved.</span>
        <span>🌾 Empowering Sri Lankan Farmers</span>
      </div>
    </div>
  </footer>
)

export default Footer
