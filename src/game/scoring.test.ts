import { describe, expect, it } from 'vitest'
import { materials } from './content'
import { scoreProfile } from './scoring'

const byId = (collection: keyof typeof materials, id: string) => {
  const material = materials[collection].find((item) => item.id === id)
  if (!material) throw new Error(`Missing test material: ${id}`)
  return material
}

describe('scoreProfile', () => {
  it('provides bilingual improvement guidance for every material', () => {
    const allMaterials = Object.values(materials).flat()

    expect(allMaterials).toHaveLength(24)
    expect(allMaterials.every((material) => material.improvement['zh-HK'].length > 0)).toBe(true)
    expect(allMaterials.every((material) => material.improvement.en.length > 0)).toBe(true)
  })

  it('awards Showcase Ready to a complete rights-cleared profile', () => {
    const result = scoreProfile({
      portrait: byId('portrait', 'portrait-clean'),
      details: byId('details', 'details-complete'),
      experiences: [
        byId('experience', 'credit-complete-1'),
        byId('experience', 'credit-complete-2'),
        byId('experience', 'credit-skill'),
        byId('experience', 'credit-social'),
      ],
      gallery: [
        byId('gallery', 'gallery-rehearsal'),
        byId('gallery', 'gallery-performance'),
        byId('gallery', 'gallery-backstage'),
        byId('gallery', 'gallery-portrait'),
        byId('gallery', 'gallery-repeat'),
        byId('gallery', 'gallery-ensemble'),
      ],
    })

    expect(result.score.total).toBeGreaterThanOrEqual(90)
    expect(result.badge).toBe('showcase')
    expect(result.score.rights).toBe(15)
  })

  it('does not reward an empty profile', () => {
    const result = scoreProfile({ experiences: [], gallery: [] })

    expect(result.score.total).toBe(0)
    expect(result.badge).toBe('build')
  })

  it('scores complete public details above incomplete private details', () => {
    const completeDetails = byId('details', 'details-complete')
    const privateDetails = byId('details', 'details-private')
    const complete = scoreProfile({
      details: completeDetails,
      experiences: [],
      gallery: [],
    })
    const incomplete = scoreProfile({
      details: privateDetails,
      experiences: [],
      gallery: [],
    })

    expect(completeDetails.profile?.socialPlatforms).toEqual(['facebook', 'instagram'])
    expect(privateDetails.profile?.socialPlatforms).toEqual([])
    expect(complete.score.profileInfo).toBe(15)
    expect(incomplete.score.profileInfo).toBeLessThan(complete.score.profileInfo)
    expect(incomplete.feedback.some((item) => item.en.includes('formal name'))).toBe(true)
  })

  it('deducts rights readiness for a watermarked image', () => {
    const safeGallery = [
      byId('gallery', 'gallery-rehearsal'),
      byId('gallery', 'gallery-performance'),
      byId('gallery', 'gallery-backstage'),
      byId('gallery', 'gallery-portrait'),
      byId('gallery', 'gallery-repeat'),
      byId('gallery', 'gallery-ensemble'),
    ]
    const unsafeGallery = [...safeGallery.slice(0, 5), byId('gallery', 'gallery-watermark')]

    const safe = scoreProfile({ experiences: [], gallery: safeGallery })
    const unsafe = scoreProfile({ experiences: [], gallery: unsafeGallery })

    expect(unsafe.score.rights).toBeLessThan(safe.score.rights)
    expect(unsafe.feedback.some((item) => item.en.includes('watermarks'))).toBe(true)
  })
})