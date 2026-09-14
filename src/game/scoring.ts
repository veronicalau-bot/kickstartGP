import type { LocalizedText, ProfileSelections, ScoreResult } from './types'
import { text } from './content'

const sumTrait = (
  items: NonNullable<ProfileSelections['portrait']>[],
  trait: keyof NonNullable<ProfileSelections['portrait']>['traits'],
) => items.reduce((total, item) => total + (item.traits[trait] ?? 0), 0)

const cap = (value: number, maximum: number) => Math.min(Math.round(value), maximum)

export const badgeLabel: Record<ScoreResult['badge'], LocalizedText> = {
  showcase: text('展示就緒', 'Showcase Ready'),
  strong: text('亮眼第一印象', 'Strong First Impression'),
  edit: text('再編輯一次', 'One More Edit'),
  build: text('建立你的證據', 'Build the Evidence'),
}

export function scoreProfile(selections: ProfileSelections): ScoreResult {
  const portrait = selections.portrait ? [selections.portrait] : []
  const details = selections.details ? [selections.details] : []
  const impression = cap(sumTrait(portrait, 'impression') * (15 / 20), 15)
  const profileInfo = cap(sumTrait(details, 'profileInfo'), 15)
  const completeness = cap(sumTrait(selections.experiences, 'completeness') * (20 / 28), 20)
  const curation = cap(sumTrait(selections.experiences, 'curation') * (15 / 20), 15)
  const gallery = cap(sumTrait(selections.gallery, 'gallery') * (20 / 24), 20)
  const rights = cap(sumTrait(selections.gallery, 'rights') * (15 / 18), 15)
  const total = impression + profileInfo + completeness + curation + gallery + rights

  const badge: ScoreResult['badge'] = total >= 90
    ? 'showcase'
    : total >= 70
      ? 'strong'
      : total >= 50
        ? 'edit'
        : 'build'

  const feedback: LocalizedText[] = []

  if (impression < 14) {
    feedback.push(text('用清晰、單人而光線充足的相片作第一印象。', 'Lead with a clear, well-lit solo portrait.'))
  } else {
    feedback.push(text('你的頭像讓觀眾能迅速認出你。', 'Your portrait makes you immediately recognisable.'))
  }

  if (profileInfo < 11) {
    feedback.push(text('核對正式姓名、課程、主修、畢業年份及公開聯絡方法。', 'Check your formal name, programme, major, graduation year and public contact.'))
  } else {
    feedback.push(text('個人資料完整準確，專業方向清楚。', 'Your personal details are complete and your direction is clear.'))
  }

  if (completeness < 18) {
    feedback.push(text('補上作品、角色／職責、製作單位及年份。', 'Add the title, role, producer or venue, and year.'))
  } else {
    feedback.push(text('演出資料有足夠脈絡，容易快速閱讀。', 'Your credits provide enough context to scan quickly.'))
  }

  const hasUnsafeImage = selections.gallery.some((item) => (item.traits.rights ?? 0) === 0)

  if (hasUnsafeImage || rights < 11) {
    feedback.push(text('提交前移除水印，並逐張確認公開使用權。', 'Remove watermarks and confirm public usage rights before submitting.'))
  } else if (gallery < 14) {
    feedback.push(text('加入不同作品、角度和創作過程，令圖庫更多元。', 'Vary productions, viewpoints and process images in the gallery.'))
  } else {
    feedback.push(text('圖庫清晰、多元，而且已準備好公開展示。', 'The gallery is clear, varied and ready for public display.'))
  }

  return {
    score: { impression, profileInfo, completeness, curation, gallery, rights, total },
    badge,
    feedback,
  }
}