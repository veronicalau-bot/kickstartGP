import './game.css'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { badgeLabel, scoreProfile } from './game/scoring'
import { materials, roundCopy } from './game/content'
import { roundOrder, useGameMachine } from './game/useGameMachine'
import type { Locale, Material, ProfileSelections, Quality, SocialPlatform } from './game/types'

const copy = {
  brand: { 'zh-HK': '畢業生專頁模擬器', en: 'Graduate Profile Simulator' },
  intro: { 'zh-HK': '三分鐘，建立一個讓業界看見你的專頁。', en: 'Three minutes to build a profile the industry can read.' },
  lead: { 'zh-HK': '看準素材。抓緊時機。每一個選擇，都會改變你的第一印象。', en: 'Read the material. Time your capture. Every choice changes your first impression.' },
  start: { 'zh-HK': '開始挑戰', en: 'Start challenge' },
  howToTitle: { 'zh-HK': '玩法非常簡單', en: 'How to play' },
  howToOne: { 'zh-HK': '每個步驟開始前，先閱讀選材目標。', en: 'Read the material goal before each step.' },
  howToTwo: { 'zh-HK': '你有 30 秒，亮光會快速而規律地逐格移動。', en: 'You have 30 seconds as the light moves quickly, tile by tile.' },
  howToThree: { 'zh-HK': '當亮光停在最合適的素材時按下按鈕；該選項會進入你的 Profile。', en: 'Press when the light reaches the strongest material. That choice enters your profile.' },
  beginRound: { 'zh-HK': '開始這一步', en: 'Start this step' },
  nextRound: { 'zh-HK': '前往下一步', en: 'Continue to next step' },
  finishProfile: { 'zh-HK': '交給業界觀眾', en: 'Send to industry view' },
  stepComplete: { 'zh-HK': '步驟完成', en: 'Step complete' },
  selectedCount: { 'zh-HK': '項素材已加入 Profile', en: 'materials added to your profile' },
  noSelection: { 'zh-HK': '時間到了，這一部分會留空。', en: 'Time is up. This section will remain empty.' },
  timeLimit: { 'zh-HK': '30 秒選材時間', en: '30-second selection' },
  lookFor: { 'zh-HK': '尋找', en: 'LOOK FOR' },
  avoid: { 'zh-HK': '避免', en: 'AVOID' },
  capture: { 'zh-HK': '選取素材', en: 'Capture material' },
  selectedMaterial: { 'zh-HK': '你選取了', en: 'You selected' },
  reason: { 'zh-HK': '原因', en: 'Why' },
  improvement: { 'zh-HK': '改善方法', en: 'How to improve' },
  litOption: { 'zh-HK': '亮起的選項', en: 'LIT OPTION' },
  captured: { 'zh-HK': '已選取', en: 'SELECTED' },
  selected: { 'zh-HK': '已選', en: 'SELECTED' },
  programme: { 'zh-HK': '課程', en: 'Programme' },
  major: { 'zh-HK': '主修', en: 'Major' },
  year: { 'zh-HK': '畢業年份', en: 'Graduation Year' },
  contact: { 'zh-HK': '公開聯絡', en: 'Public Contact' },
  experience: { 'zh-HK': '校內及其他演出／作品經驗', en: 'In School & Other Experiences' },
  gallery: { 'zh-HK': '相片集', en: 'Photo Gallery' },
  emptyExperience: { 'zh-HK': '你的作品經驗會出現在這裡', en: 'Your selected credits will appear here' },
  scanning: { 'zh-HK': '業界觀眾正在瀏覽⋯', en: 'An industry viewer is scanning your profile…' },
  scanNote: { 'zh-HK': '他們通常只有數秒，找出你是誰、做過甚麼。', en: 'They often have seconds to learn who you are and what you do.' },
  score: { 'zh-HK': '業界第一印象', en: 'Industry first impression' },
  replay: { 'zh-HK': '重新挑戰', en: 'Play again' },
  motion: { 'zh-HK': '減少動態', en: 'Reduce motion' },
}

const tx = (value: Record<Locale, string>, locale: Locale) => value[locale]

const verdicts: Record<Quality, { label: Record<Locale, string>; symbol: string }> = {
  strong: { label: { 'zh-HK': '適合使用', en: 'Suitable to use' }, symbol: '✓' },
  mixed: { label: { 'zh-HK': '需要改善', en: 'Needs improvement' }, symbol: '!' },
  weak: { label: { 'zh-HK': '不適合公開', en: 'Not suitable to publish' }, symbol: '×' },
}

function MaterialVisual({ material, compact = false }: { material: Material; compact?: boolean }) {
  return (
    <div
      className={`material-visual visual-${material.round} quality-${material.quality} ${compact ? 'is-compact' : ''}`}
      style={{ '--material-color': material.color } as React.CSSProperties}
      role="img"
      aria-label={material.title.en}
    >
      {material.imageSrc
        ? <img className="material-image" src={material.imageSrc} alt="" draggable="false" />
        : <><span className="visual-light" /><span className="visual-figure"><i /></span>{material.round === 'details' && <span className="visual-details-lines"><i /><i /><i /><i /></span>}</>}
    </div>
  )
}

function SocialLinks({ platforms }: { platforms: SocialPlatform[] }) {
  if (!platforms.length) return <>—</>

  return (
    <span className="social-links">
      {platforms.includes('facebook') && <span className="social-link"><FaFacebookF aria-hidden="true" /> FACEBOOK</span>}
      {platforms.includes('instagram') && <span className="social-link"><FaInstagram aria-hidden="true" /> INSTAGRAM</span>}
    </span>
  )
}

function SelectionFeedback({ material, locale, compact = false }: { material: Material; locale: Locale; compact?: boolean }) {
  const verdict = verdicts[material.quality]

  return (
    <section className={`selection-feedback verdict-${material.quality} ${compact ? 'is-compact' : ''}`} aria-live={compact ? 'polite' : undefined}>
      <header>
        <span className="verdict-symbol" aria-hidden="true">{verdict.symbol}</span>
        <span className="feedback-material"><small>{tx(copy.selectedMaterial, locale)}</small><strong>{tx(material.title, locale)}</strong></span>
        <strong className="verdict-label">{tx(verdict.label, locale)}</strong>
      </header>
      <div className="feedback-details">
        <p><strong>{tx(copy.reason, locale)}</strong><span>{tx(material.note, locale)}</span></p>
        <p><strong>{tx(copy.improvement, locale)}</strong><span>{tx(material.improvement, locale)}</span></p>
      </div>
    </section>
  )
}

function ProfilePreview({ selections, locale, scanning = false }: { selections: ProfileSelections; locale: Locale; scanning?: boolean }) {
  const profile = selections.details?.profile
  return (
    <article className={`profile-preview ${scanning ? 'is-scanning' : ''}`} aria-label={tx(copy.brand, locale)}>
      <div className="profile-brandbar"><span>GRADUATE PROFILE</span><span>ACADEMY OF PERFORMING ARTS</span></div>
      <header className="profile-hero">
        <div className="portrait-frame">
          {selections.portrait ? <MaterialVisual material={selections.portrait} /> : <span className="portrait-placeholder">?</span>}
        </div>
        <div className="profile-identity">
          <p className="profile-kicker">SCHOOL OF DRAMA · 2026</p>
          <h2>{profile ? tx(profile.name, locale) : '—'}</h2>
          <dl>
            <div><dt>{tx(copy.programme, locale)}</dt><dd>{profile ? tx(profile.programme, locale) : '—'}</dd></div>
            <div><dt>{tx(copy.major, locale)}</dt><dd>{profile ? tx(profile.major, locale) : '—'}</dd></div>
            <div><dt>{tx(copy.year, locale)}</dt><dd>{profile?.year ?? '—'}</dd></div>
            <div><dt>{tx(copy.contact, locale)}</dt><dd>{profile ? <SocialLinks platforms={profile.socialPlatforms} /> : '—'}</dd></div>
          </dl>
        </div>
      </header>
      <section className="profile-section">
        <p className="section-number">01</p>
        <h3>{tx(copy.experience, locale)}</h3>
        <div className="timeline">
          {selections.experiences.length ? selections.experiences.map((item) => (
            <div className="timeline-item" key={item.id}>
              <span className="timeline-dot" />
              <strong>{tx(item.title, locale)}</strong>
              <small>{tx(item.detail, locale)}</small>
            </div>
          )) : <p className="empty-copy">{tx(copy.emptyExperience, locale)}</p>}
        </div>
      </section>
      <section className="profile-section gallery-section">
        <p className="section-number">02</p>
        <h3>{tx(copy.gallery, locale)}</h3>
        <div className="gallery-grid">
          {selections.gallery.map((item) => <MaterialVisual key={item.id} material={item} compact />)}
          {Array.from({ length: Math.max(0, 6 - selections.gallery.length) }, (_, index) => <div className="gallery-empty" key={index} />)}
        </div>
      </section>
      {scanning && <div className="scan-line" />}
    </article>
  )
}

function App() {
  const game = useGameMachine()
  const locale = game.locale
  const result = scoreProfile(game.selections)

  if (game.phase === 'welcome') {
    return (
      <main className="welcome-shell">
        <nav className="topbar">
          <div className="wordmark">GP<span>/</span>SIM</div>
          <div className="top-actions">
            <label className="motion-toggle"><input type="checkbox" checked={game.reducedMotion} onChange={(event) => game.setReducedMotion(event.target.checked)} />{tx(copy.motion, locale)}</label>
            <div className="language-switch" aria-label="Language">
              <button className={locale === 'zh-HK' ? 'active' : ''} onClick={() => game.setLocale('zh-HK')}>繁</button>
              <button className={locale === 'en' ? 'active' : ''} onClick={() => game.setLocale('en')}>EN</button>
            </div>
          </div>
        </nav>
        <section className="welcome-content">
          <div className="welcome-copy">
            <p className="eyebrow">THE THREE-MINUTE PROFILE CHALLENGE</p>
            <h1>{tx(copy.brand, locale)}</h1>
            <p className="intro">{tx(copy.intro, locale)}</p>
            <p className="lead">{tx(copy.lead, locale)}</p>
            <div className="how-to">
              <strong>{tx(copy.howToTitle, locale)}</strong>
              {[copy.howToOne, copy.howToTwo, copy.howToThree].map((item, index) => <p key={item.en}><span>{index + 1}</span>{tx(item, locale)}</p>)}
            </div>
            <button className="primary-button" onClick={game.start}><span className="button-label">{tx(copy.start, locale)}</span><span className="button-arrow">→</span></button>
          </div>
          <div className="welcome-stage" aria-hidden="true">
            <div className="stage-orbit orbit-one"><span>01</span><span>02</span><span>03</span><span>04</span></div>
            <div className="stage-center"><span>YOUR</span><strong>PROFILE</strong><span>TAKES THE STAGE</span></div>
          </div>
        </section>
        <footer className="welcome-footer"><span>PROFILE PIC</span><span>PERSONAL DETAILS</span><span>EXPERIENCE</span><span>PHOTO GALLERY</span><span>INDUSTRY VIEW</span></footer>
      </main>
    )
  }

  if (game.phase === 'scan') {
    return (
      <main className="scan-screen">
        <div className="scan-copy"><span className="live-dot" /> <h1>{tx(copy.scanning, locale)}</h1><p>{tx(copy.scanNote, locale)}</p></div>
        <div className="scan-profile"><ProfilePreview selections={game.selections} locale={locale} scanning /></div>
      </main>
    )
  }

  if (game.phase === 'results') {
    return (
      <main className="result-screen">
        <section className="result-summary">
          <p className="eyebrow">FINAL REVIEW</p>
          <p>{tx(copy.score, locale)}</p>
          <div className="score-number">{result.score.total}<span>/100</span></div>
          <h1>{tx(badgeLabel[result.badge], locale)}</h1>
          <div className="score-bars">
            {([
              ['FIRST IMPRESSION', result.score.impression, 15],
              ['PROFILE DETAILS', result.score.profileInfo, 15],
              ['EXPERIENCE', result.score.completeness + result.score.curation, 35],
              ['PORTFOLIO', result.score.gallery, 20],
              ['RIGHTS READY', result.score.rights, 15],
            ] as const).map(([label, value, max]) => <div key={label}><span>{label}</span><div><i style={{ width: `${(value / max) * 100}%` }} /></div><b>{value}/{max}</b></div>)}
          </div>
          <h2 className="feedback-title">Graduate Profiles 小貼示</h2>
          <ul className="feedback-list">{result.feedback.map((item) => <li key={item.en}>{tx(item, locale)}</li>)}</ul>
          <button className="primary-button" onClick={game.start}><span className="button-label">{tx(copy.replay, locale)}</span><span className="button-arrow">↻</span></button>
        </section>
        <div className="result-profile"><ProfilePreview selections={game.selections} locale={locale} /></div>
      </main>
    )
  }

  const round = game.currentRound
  const current = game.activeMaterial

  const progressNav = (
    <nav className="game-nav">
      <div className="wordmark">GP<span>/</span>SIM</div>
      <div className="round-pips" aria-label={`Step ${roundOrder.indexOf(round) + 1} of ${roundOrder.length}`}>
        {roundOrder.map((item, index) => <span key={item} className={item === round ? 'active' : roundOrder.indexOf(item) < roundOrder.indexOf(round) ? 'done' : ''}>{index + 1}</span>)}
      </div>
      <div className="timer"><small>{game.phase === 'playing' ? 'TIME' : `STEP ${roundOrder.indexOf(round) + 1}/4`}</small><strong>{game.phase === 'playing' ? `00:${String(game.timeLeft).padStart(2, '0')}` : '00:30'}</strong></div>
    </nav>
  )

  if (game.phase === 'briefing') {
    return (
      <main className="game-shell interstitial-shell">
        {progressNav}
        <div className="interstitial-layout">
          <section className="briefing-card">
            <p className="eyebrow">{tx(roundCopy[round].eyebrow, locale)}</p>
            <div className="briefing-time"><span>30</span><small>SECONDS</small></div>
            <h1>{tx(roundCopy[round].title, locale)}</h1>
            <p className="briefing-goal">{tx(roundCopy[round].goal, locale)}</p>
            <div className="briefing-rules">
              <div className="rule-good"><strong>{tx(copy.lookFor, locale)}</strong><p>{tx(roundCopy[round].lookFor, locale)}</p></div>
              <div className="rule-avoid"><strong>{tx(copy.avoid, locale)}</strong><p>{tx(roundCopy[round].avoid, locale)}</p></div>
            </div>
            <button className="primary-button" onClick={game.beginRound}><span className="button-label">{tx(copy.beginRound, locale)}</span><span className="button-arrow">→</span></button>
          </section>
          <aside className="interstitial-preview"><div className="preview-label"><span>YOUR PROFILE SO FAR</span><span>{roundOrder.indexOf(round)}/4</span></div><ProfilePreview selections={game.selections} locale={locale} /></aside>
        </div>
      </main>
    )
  }

  if (game.phase === 'roundComplete') {
    const isLastRound = roundOrder.indexOf(round) === roundOrder.length - 1
    return (
      <main className="game-shell interstitial-shell">
        {progressNav}
        <div className="complete-layout">
          <section className="complete-card">
            <div className="complete-mark" aria-hidden="true">{roundOrder.indexOf(round) + 1}</div>
            <p className="eyebrow">{tx(roundCopy[round].eyebrow, locale)}</p>
            <h1>{tx(copy.stepComplete, locale)}</h1>
            {game.capturedCount > 0
              ? <><p className="complete-count"><strong>{game.capturedCount}</strong> {tx(copy.selectedCount, locale)}</p>{game.lastCapture && <SelectionFeedback material={game.lastCapture} locale={locale} />}</>
              : <p className="complete-note">{tx(copy.noSelection, locale)}</p>}
            <button className="primary-button" onClick={game.continueToNextRound}><span className="button-label">{tx(isLastRound ? copy.finishProfile : copy.nextRound, locale)}</span><span className="button-arrow">→</span></button>
          </section>
          <aside className="complete-preview"><div className="preview-label"><span>PROFILE UPDATED</span><span>{roundOrder.indexOf(round) + 1}/4</span></div><ProfilePreview selections={game.selections} locale={locale} /></aside>
        </div>
      </main>
    )
  }

  return (
    <main className="game-shell">
      {progressNav}
      <div className="game-layout">
        <section className="roulette-panel">
          <header className="round-heading"><p className="eyebrow">{tx(roundCopy[round].eyebrow, locale)}</p><h1>{tx(roundCopy[round].title, locale)}</h1><p>{tx(roundCopy[round].instruction, locale)}</p></header>
          <div className={`option-board option-board-${round}`} role="group" aria-label={tx(roundCopy[round].title, locale)}>
            {materials[round].map((material, index) => {
              const isActive = current?.id === material.id
              const isSelected = !game.available.some((item) => item.id === material.id)
              return (
                <div
                  className={`option-tile ${isActive ? 'is-lit' : ''} ${isSelected ? 'is-selected' : ''}`}
                  id={`option-${material.id}`}
                  key={material.id}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="option-number">{String(index + 1).padStart(2, '0')}</span>
                  <MaterialVisual material={material} compact />
                  <div className="option-copy"><strong>{tx(material.title, locale)}</strong><small>{tx(material.detail, locale)}</small></div>
                  {isActive && <span className="light-label">{tx(copy.litOption, locale)}</span>}
                  {isSelected && <span className="selected-label">✓ {tx(copy.captured, locale)}</span>}
                </div>
              )
            })}
          </div>
          <div className="capture-row">
            <div className="slot-count"><strong>{game.capturedCount}</strong><span>/ {game.target} {tx(copy.selected, locale)}</span></div>
            <button className="capture-button" onClick={game.capture} disabled={!current} aria-label={current ? `${tx(copy.capture, locale)}: ${tx(current.title, locale)}` : tx(copy.capture, locale)}><span className="capture-icon">◎</span>{tx(copy.capture, locale)}<small>ENTER</small></button>
          </div>
          {game.lastCapture && <SelectionFeedback material={game.lastCapture} locale={locale} compact />}
        </section>
        <aside className="preview-panel">
          <div className="preview-label"><span>LIVE PROFILE</span><span>{game.capturedCount}/{game.target}</span></div>
          <ProfilePreview selections={game.selections} locale={locale} />
        </aside>
      </div>
    </main>
  )
}

export default App
