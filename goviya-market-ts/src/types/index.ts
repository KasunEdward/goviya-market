// ─── Language ────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'si' | 'ta'

export type LocaleString = Record<Lang, string>

// ─── Crop ────────────────────────────────────────────────────────────────────

export type CropCategory = 'vegetables' | 'fruits' | 'grains' | 'spices'

export type CropBadge = 'fresh' | 'certified' | 'urgent'

export interface Farmer {
  name: string
  avatar: string
  color: string
  rating: number
  sales: number
  phone: string
}

export interface Crop {
  id: number
  emoji: string
  name: LocaleString
  variety: LocaleString
  category: CropCategory
  price: number
  qty: number
  minOrder: number
  district: string
  city: string
  harvestDate: string
  organic: boolean
  badge: CropBadge
  farmer: Farmer
  description: LocaleString
}

// ─── Post Form ───────────────────────────────────────────────────────────────

export interface PostFormState {
  cropType: string
  variety: string
  description: string
  price: string
  minOrder: string
  available: string
  harvestDate: string
  district: string
  city: string
  farmerName: string
  phone: string
  organic: boolean
  notes: string
}

// ─── Page ────────────────────────────────────────────────────────────────────

export type Page = 'home' | 'browse' | 'post' | 'dashboard' | 'login'

export type SortOption = 0 | 1 | 2 | 3

// ─── Toast ───────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error'

export interface ToastState {
  msg: string
  type: ToastType
}

// ─── Translations ─────────────────────────────────────────────────────────────

export interface NavTranslations {
  browse: string
  post: string
  dashboard: string
  login: string
}

export interface HeroTranslations {
  badge: string
  h1a: string
  h1em: string
  h1b: string
  sub: string
  btn1: string
  btn2: string
  s1n: string
  s1l: string
  s2n: string
  s2l: string
  s3n: string
  s3l: string
}

export interface BrowseTranslations {
  label: string
  heading: string
  sub: string
  searchPlaceholder: string
  searchBtn: string
  sortLabel: string
  sorts: [string, string, string, string]
  cats: [string, string, string, string, string]
  contact: string
  perKg: string
  qty: string
  noResults: string
  noResultsSub: string
}

export interface PostTranslations {
  label: string
  heading: string
  sub: string
  s1: string
  s2: string
  s3: string
  s4: string
  lCrop: string
  lVar: string
  lDesc: string
  lPrice: string
  lMinOrd: string
  lAvail: string
  lHarv: string
  lDist: string
  lCity: string
  lName: string
  lPhone: string
  lOrganic: string
  lNotes: string
  pVar: string
  pDesc: string
  pPrice: string
  pMin: string
  pAvail: string
  pCity: string
  pName: string
  pPhone: string
  pNotes: string
  districts: string[]
  submit: string
  ok: string
}

export interface ModalTranslations {
  qty: string
  harv: string
  dist: string
  org: string
  min: string
  call: string
  wa: string
  em: string
  farmer: string
  verified: string
}

export interface DashTranslations {
  label: string
  heading: string
  sub: string
  tabs: [string, string, string]
  thdrs: [string, string, string, string, string, string]
  stats: [string, string, string, string]
  edit: string
  noListings: string
}

export interface Translations {
  appName: string
  tagline: string
  nav: NavTranslations
  hero: HeroTranslations
  browse: BrowseTranslations
  post: PostTranslations
  modal: ModalTranslations
  dash: DashTranslations
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export type ListingStatus = 'active' | 'sold' | 'pending'

export interface DashboardListing extends Crop {
  status: ListingStatus
  views: number
}

export interface Message {
  from: string
  msg: string
  time: string
  emoji: string
  unread: boolean
}

export interface StatCard {
  icon: string
  num: string
  label: string
  change: string
  up: boolean
}
