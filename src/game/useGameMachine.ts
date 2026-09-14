import { useEffect, useMemo, useState } from 'react'
import { materials } from './content'
import type { Locale, Material, ProfileSelections, RoundId } from './types'

export type Phase = 'welcome' | 'briefing' | 'playing' | 'roundComplete' | 'scan' | 'results'

export const roundOrder: RoundId[] = ['portrait', 'details', 'experience', 'gallery']

const targetCount: Record<RoundId, number> = {
  portrait: 1,
  details: 1,
  experience: 4,
  gallery: 6,
}

const roundTime: Record<RoundId, number> = {
  portrait: 30,
  details: 30,
  experience: 30,
  gallery: 30,
}

const emptySelections = (): ProfileSelections => ({ experiences: [], gallery: [] })

export function useGameMachine() {
  const [phase, setPhase] = useState<Phase>('welcome')
  const [roundIndex, setRoundIndex] = useState(0)
  const [locale, setLocale] = useState<Locale>('zh-HK')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [selections, setSelections] = useState<ProfileSelections>(emptySelections)
  const [activeIndex, setActiveIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [lastCapture, setLastCapture] = useState<Material | null>(null)

  const currentRound = roundOrder[roundIndex]
  const activeRound = phase === 'playing' ? currentRound : null

  const selectedIds = useMemo(() => {
    const ids = new Set<string>()
    if (selections.portrait) ids.add(selections.portrait.id)
    if (selections.details) ids.add(selections.details.id)
    selections.experiences.forEach((item) => ids.add(item.id))
    selections.gallery.forEach((item) => ids.add(item.id))
    return ids
  }, [selections])

  const available = activeRound
    ? materials[activeRound].filter((item) => !selectedIds.has(item.id))
    : []
  const activeMaterial = available.length ? available[activeIndex % available.length] : null

  const finishRound = () => {
    setTimeLeft(0)
    setPhase('roundComplete')
  }

  const start = () => {
    setSelections(emptySelections())
    setRoundIndex(0)
    setActiveIndex(0)
    setLastCapture(null)
    setTimeLeft(0)
    setPhase('briefing')
  }

  const beginRound = () => {
    setActiveIndex(0)
    setLastCapture(null)
    setTimeLeft(roundTime[currentRound])
    setPhase('playing')
  }

  const continueToNextRound = () => {
    if (roundIndex >= roundOrder.length - 1) {
      setPhase('scan')
      return
    }
    setRoundIndex((index) => index + 1)
    setActiveIndex(0)
    setLastCapture(null)
    setPhase('briefing')
  }

  const capture = () => {
    if (!activeRound || !activeMaterial) return

    setLastCapture(activeMaterial)
    if (activeRound === 'portrait' || activeRound === 'details') {
      setSelections((current) => ({ ...current, [activeRound]: activeMaterial }))
      finishRound()
      return
    }

    const collection = activeRound === 'experience' ? 'experiences' : 'gallery'
    const nextItems = [...selections[collection], activeMaterial]
    setSelections((current) => ({ ...current, [collection]: nextItems }))

    if (nextItems.length >= targetCount[activeRound]) {
      finishRound()
    } else {
      setActiveIndex((index) => index % Math.max(available.length - 1, 1))
    }
  }

  useEffect(() => {
    if (!activeRound || available.length < 2) return
    const interval = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % available.length),
      reducedMotion ? 1300 : 650,
    )
    return () => window.clearInterval(interval)
  }, [activeRound, available.length, reducedMotion])

  useEffect(() => {
    if (!activeRound) return
    const timer = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timer)
          finishRound()
          return 0
        }
        return time - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [activeRound])

  useEffect(() => {
    if (phase !== 'scan') return
    const timer = window.setTimeout(() => setPhase('results'), reducedMotion ? 1800 : 4200)
    return () => window.clearTimeout(timer)
  }, [phase, reducedMotion])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.repeat) return

      event.preventDefault()
      if (phase === 'welcome' || phase === 'results') start()
      else if (phase === 'briefing') beginRound()
      else if (phase === 'playing') capture()
      else if (phase === 'roundComplete') continueToNextRound()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const capturedCount = currentRound === 'portrait'
    ? Number(Boolean(selections.portrait))
    : currentRound === 'details'
      ? Number(Boolean(selections.details))
      : currentRound === 'experience'
      ? selections.experiences.length
      : selections.gallery.length

  return {
    phase,
    locale,
    reducedMotion,
    selections,
    currentRound,
    activeRound,
    activeMaterial,
    available,
    activeIndex,
    timeLeft,
    lastCapture,
    capturedCount,
    target: targetCount[currentRound],
    setLocale,
    setReducedMotion,
    setPhase,
    start,
    beginRound,
    continueToNextRound,
    capture,
  }
}