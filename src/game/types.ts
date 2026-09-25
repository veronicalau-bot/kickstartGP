export type Locale = 'zh-HK' | 'en'

export type RoundId = 'portrait' | 'details' | 'experience' | 'gallery'

export type Quality = 'strong' | 'mixed' | 'weak'

export type SocialPlatform = 'facebook' | 'instagram'

export type LocalizedText = {
  'zh-HK': string
  en: string
}

export type Material = {
  id: string
  round: RoundId
  title: LocalizedText
  detail: LocalizedText
  note: LocalizedText
  improvement: LocalizedText
  quality: Quality
  color: string
  imageSrc?: string
  profile?: {
    name: LocalizedText
    programme: LocalizedText
    major: LocalizedText
    year: string
    socialPlatforms: SocialPlatform[]
  }
  traits: {
    impression?: number
    profileInfo?: number
    completeness?: number
    curation?: number
    gallery?: number
    rights?: number
  }
}

export type ProfileSelections = {
  portrait?: Material
  details?: Material
  experiences: Material[]
  gallery: Material[]
}

export type ScoreBreakdown = {
  impression: number
  profileInfo: number
  completeness: number
  curation: number
  gallery: number
  rights: number
  total: number
}

export type ScoreResult = {
  score: ScoreBreakdown
  badge: 'showcase' | 'strong' | 'edit' | 'build'
  feedback: LocalizedText[]
}