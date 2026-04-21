# 🌾 GoviyaMarket — Sri Lanka Agricultural Platform

**React 18 + Vite + Tailwind CSS + TypeScript** — fully typed, mobile-first responsive marketplace for Sri Lankan farmers and wholesale buyers.

---

## Quick Start

```bash
unzip goviya-market-ts.zip && cd goviya-market-ts
npm install
npm run dev          # → http://localhost:5173
npm run type-check   # zero TypeScript errors
npm run build        # production build
```

---

## Mobile Responsive Design

### Breakpoints
| Name | Width   | Usage |
|------|---------|-------|
| `xs` | 375 px  | Small phones (iPhone SE, Galaxy A series) |
| `sm` | 640 px  | Large phones / small tablets |
| `md` | 768 px  | Tablets (iPad mini) |
| `lg` | 1024 px | Laptops / iPad Pro |
| `xl` | 1280 px | Desktops |

### Mobile-specific features
| Feature | Detail |
|---------|--------|
| **Bottom tab bar** | Fixed nav bar on `<md` with Browse / Post / Dashboard / Login tabs |
| **Hamburger menu** | Animated 3-line → X icon with animated slide-down drawer |
| **Bottom sheet modal** | `CropModal` slides up from screen bottom on mobile; centred card on `sm+` |
| **Drag handle** | Visual pill on mobile modal for gesture affordance |
| **Body scroll lock** | `document.body.style.overflow = 'hidden'` while modal is open |
| **Horizontal chip scroll** | Category filter chips scroll horizontally with `scrollbar-none` |
| **Mobile sort sheet** | Tapping ⇅ opens a full-width list picker instead of a `<select>` |
| **Responsive grid** | Cards: 1 col → 2 col (xs) → 2 col (sm) → 3 col (md) → 4 col (lg) |
| **Mobile dashboard** | Stat cards: 2-col; table replaced by card-list view on `<sm` |
| **iOS input zoom fix** | `font-size: max(16px, 0.875rem)` prevents Safari auto-zoom on focus |
| **Numeric keyboard** | `inputMode="numeric"` on price/qty fields, `type="tel"` on phone |
| **Safe area insets** | `env(safe-area-inset-bottom)` padding for notch / home-indicator devices |
| **Touch feedback** | `active:scale-95` + `touch-manipulation` on all interactive elements |
| **No hover jank** | Hover effects use `sm:hover:*` so they don't fire on touch devices |
| **Toast placement** | Full-width banner above bottom nav on mobile; pill in corner on desktop |
| **Hero layout** | Two-column on `lg+`; single column + mini quick-stats card on mobile |
| **Post form** | 4-col crop picker on mobile (5-col sm+); all inputs full-width stacked |
| **Footer** | 2-col grid on mobile, 4-col on `lg+`; extra bottom padding for bottom nav |

---

## Project Structure

```
src/
├── types/
│   └── index.ts            ← All shared TS interfaces & union types
├── data/
│   ├── crops.ts            ← 12 typed Crop objects (EN / SI / TA)
│   └── translations.ts     ← Record<Lang, Translations>
├── hooks/
│   └── useLang.ts          ← Language state + body class side-effect
├── components/
│   ├── Navbar.tsx          ← Desktop nav + mobile hamburger + bottom tab bar
│   ├── Hero.tsx            ← Two-col desktop / single-col mobile hero
│   ├── BrowsePage.tsx      ← Search, horizontal-scroll filters, responsive grid
│   ├── CropCard.tsx        ← Touch-optimised listing card
│   ├── CropModal.tsx       ← Bottom sheet (mobile) / centred card (desktop)
│   ├── PostPage.tsx        ← Mobile-first multi-section form
│   ├── DashboardPage.tsx   ← 2-col stats, card-list on mobile
│   ├── LoginPage.tsx
│   ├── Footer.tsx          ← Responsive 2→4 col grid
│   └── Toast.tsx           ← Full-width mobile / corner desktop
├── App.tsx                 ← Root with pb-20 md:pb-0 main clearance
├── main.tsx
└── index.css               ← Tailwind + mobile-first @layer components
tailwind.config.ts          ← Custom xs breakpoint + scrollbar-none plugin
```

---

## Next Steps
- Add React Router for URL-based navigation
- Connect Supabase for real data + auth
- Add OTP login via Twilio (phone number verification)
- Add crop photo uploads (Supabase Storage)
- Add real-time chat (Supabase Realtime)
- Add map view with Leaflet + OpenStreetMap showing farms by district
- Add PWA manifest + service worker for offline support
