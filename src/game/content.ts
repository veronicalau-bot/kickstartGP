import type { LocalizedText, Material, RoundId } from './types'

export const text = (zh: string, en: string): LocalizedText => ({
  'zh-HK': zh,
  en,
})

export const student = {
  name: text('王一心 Chris Wong', 'Chris Wong 王一心'),
  programme: text('藝術學士（榮譽）學位', 'Bachelor of Fine Arts (Honours)'),
  major: text('表演', 'Acting'),
  year: '2026',
}

export const roundCopy: Record<RoundId, { eyebrow: LocalizedText; title: LocalizedText; instruction: LocalizedText; goal: LocalizedText; lookFor: LocalizedText; avoid: LocalizedText }> = {
  portrait: {
    eyebrow: text('第一幕 · 第一印象', 'ACT I · FIRST IMPRESSION'),
    title: text('捕捉你的 Profile Pic', 'Capture your profile picture'),
    instruction: text('亮光會規律移動；當它停在理想個人照時，立即按下選取。', 'The light moves in a steady rhythm. Capture when it lands on your ideal portrait.'),
    goal: text('在 30 秒內選出一張最適合放在頁首的個人照。', 'Choose the strongest image for the top of your profile in 30 seconds.'),
    lookFor: text('清晰、單人、光線充足，讓人立即認出你。', 'Look for a clear, well-lit solo image that identifies you immediately.'),
    avoid: text('避免多人合照、遠景、模糊或濾鏡過重。', 'Avoid group shots, distant images, blur, and heavy filters.'),
  },
  details: {
    eyebrow: text('第二幕 · 基本資料', 'ACT II · THE ESSENTIALS'),
    title: text('選出完整的個人資料', 'Choose complete personal details'),
    instruction: text('亮光會逐格移動；在最完整而適合公開的資料卡亮起時按下選取。', 'The light moves tile by tile. Capture the most complete, publication-ready details card.'),
    goal: text('在 30 秒內找出一組完整、準確的公開資料。', 'Find one complete and accurate set of public details in 30 seconds.'),
    lookFor: text('正式姓名、課程、主修、畢業年份及專業聯絡方式。', 'Look for a formal name, programme, major, graduation year and professional contact.'),
    avoid: text('避免暱稱、錯誤年份、私人電話或欠缺主修。', 'Avoid nicknames, incorrect years, private phone numbers, or a missing major.'),
  },
  experience: {
    eyebrow: text('第三幕 · 你的履歷', 'ACT III · YOUR CREDITS'),
    title: text('組合演出與作品經驗', 'Build your experience'),
    instruction: text('跟隨亮光，在適當一刻選取 4 項能清楚展示工作內容的經驗。', 'Follow the light and capture 4 clear credits at the right moment.'),
    goal: text('在 30 秒內選出 4 項最能說明你做過甚麼的資料。', 'Capture 4 credits that best explain what you have done in 30 seconds.'),
    lookFor: text('作品名、角色／職責、製作單位或場地，以及年份。', 'Look for the title, role or contribution, producer or venue, and year.'),
    avoid: text('避免過於籠統、分類錯誤或與專業能力無關的內容。', 'Avoid vague, miscategorised, or professionally irrelevant entries.'),
  },
  gallery: {
    eyebrow: text('第四幕 · 視覺證據', 'ACT IV · VISUAL EVIDENCE'),
    title: text('策展你的 Photo Gallery', 'Curate your photo gallery'),
    instruction: text('跟隨亮光，在適當一刻選取 6 張清晰、多元並已確認使用權的相片。', 'Follow the light and capture 6 clear, varied, rights-cleared images at the right moment.'),
    goal: text('在 30 秒內為相片集選取 6 張具代表性的圖片。', 'Curate 6 representative gallery images in 30 seconds.'),
    lookFor: text('清晰、多元、能展示作品和創作過程，而且已獲授權。', 'Look for clear, varied, rights-cleared evidence of your work and process.'),
    avoid: text('避免水印、低解像度、內容重複或主體不清。', 'Avoid watermarks, low resolution, repetition, and an unclear subject.'),
  },
}

export const materials: Record<RoundId, Material[]> = {
  portrait: [
    {
      id: 'portrait-clean', round: 'portrait', quality: 'strong', color: '#e6b8a2', imageSrc: '/assets/portraits/portrait-natural.jpg',
      title: text('自然光半身照', 'Natural-light portrait'),
      detail: text('單人 · 清晰 · 背景簡潔', 'Solo · clear · simple background'),
      note: text('清晰焦點，容易留下第一印象', 'A clear focal point makes a strong introduction'),
      traits: { impression: 20 },
    },
    {
      id: 'portrait-stage', round: 'portrait', quality: 'mixed', color: '#54718c', imageSrc: '/assets/portraits/portrait-stage.jpg',
      title: text('遠距離舞台照', 'Distant stage photo'),
      detail: text('氣氛強 · 面孔較難辨認', 'Atmospheric · face is hard to identify'),
      note: text('作品感豐富，但不易辨認你', 'Expressive, but you are difficult to identify'),
      traits: { impression: 11 },
    },
    {
      id: 'portrait-group', round: 'portrait', quality: 'weak', color: '#bd6b5b', imageSrc: '/assets/portraits/portrait-group.jpg',
      title: text('多人合照裁切', 'Cropped group photo'),
      detail: text('構圖擁擠 · 主體不明', 'Crowded · unclear subject'),
      note: text('業界觀眾未必能立即認出你', 'An industry viewer may not know which person is you'),
      traits: { impression: 5 },
    },
    {
      id: 'portrait-studio', round: 'portrait', quality: 'strong', color: '#d8c55f', imageSrc: '/assets/portraits/portrait-studio.jpg',
      title: text('專業形象照', 'Studio portrait'),
      detail: text('光線均勻 · 表情自然', 'Even light · natural expression'),
      note: text('專業而有個人特色', 'Professional with a sense of personality'),
      traits: { impression: 19 },
    },
    {
      id: 'portrait-filter', round: 'portrait', quality: 'weak', color: '#a689b3', imageSrc: '/assets/portraits/portrait-filter.jpg',
      title: text('濾鏡自拍', 'Filtered selfie'),
      detail: text('濾鏡強烈 · 細節流失', 'Heavy filter · detail is lost'),
      note: text('濾鏡削弱作品檔案的可信度', 'The filter weakens the profile’s credibility'),
      traits: { impression: 6 },
    },
  ],
  details: [
    {
      id: 'details-complete', round: 'details', quality: 'strong', color: '#dcebd9',
      title: text('正式雙語姓名＋完整課程資料', 'Formal bilingual name + complete study details'),
      detail: text('主修 · 畢業年份 · 專業電郵俱全', 'Major · graduation year · professional email included'),
      note: text('完整而適合公開，觀眾很快便了解你的背景', 'Complete and publication-ready: your background is easy to understand'),
      profile: {
        name: text('王一心 Chris Wong', 'Chris Wong 王一心'),
        programme: text('藝術學士（榮譽）學位', 'Bachelor of Fine Arts (Honours)'),
        major: text('表演', 'Acting'),
        year: '2026',
        contact: text('chris.wong.portfolio@example.com', 'chris.wong.portfolio@example.com'),
      },
      traits: { profileInfo: 15 },
    },
    {
      id: 'details-missing-major', round: 'details', quality: 'mixed', color: '#d7e8ed',
      title: text('姓名＋課程，但欠缺主修', 'Name + programme, but no major'),
      detail: text('基本資料大致齊全 · 專業方向不明', 'Mostly complete · specialism is unclear'),
      note: text('欠缺主修，業界觀眾未必知道你的專業方向', 'Without a major, your professional direction is unclear'),
      profile: {
        name: text('王一心 Chris Wong', 'Chris Wong 王一心'),
        programme: text('藝術學士（榮譽）學位', 'Bachelor of Fine Arts (Honours)'),
        major: text('未填寫', 'Not provided'),
        year: '2026',
        contact: text('chris.wong.portfolio@example.com', 'chris.wong.portfolio@example.com'),
      },
      traits: { profileInfo: 10 },
    },
    {
      id: 'details-nickname', round: 'details', quality: 'weak', color: '#f4d6cf',
      title: text('暱稱＋社交平台帳號', 'Nickname + social handle'),
      detail: text('「Chris仔」· 欠缺正式中英文姓名', '“Chris W.” · no formal bilingual name'),
      note: text('公開專頁應使用能清楚識別你的正式姓名', 'Use a formal name that identifies you clearly on a public profile'),
      profile: {
        name: text('Chris仔', 'Chris W.'),
        programme: text('Drama', 'Drama'),
        major: text('未填寫', 'Not provided'),
        year: '2026?',
        contact: text('@chris_daily', '@chris_daily'),
      },
      traits: { profileInfo: 4 },
    },
    {
      id: 'details-private', round: 'details', quality: 'weak', color: '#e5ddd6',
      title: text('私人電話＋不完整資料', 'Private phone + incomplete details'),
      detail: text('包含私人電話 · 畢業年份錯誤', 'Private phone included · wrong graduation year'),
      note: text('只提供適合公開的聯絡方法，並核對年份', 'Share only publication-ready contact details and check the year'),
      profile: {
        name: text('王一心', 'WONG Yat Sum'),
        programme: text('藝術學士', 'Bachelor of Fine Arts'),
        major: text('表演', 'Acting'),
        year: '2025',
        contact: text('私人電話：9123 4567', 'Personal mobile: 9123 4567'),
      },
      traits: { profileInfo: 3 },
    },
    {
      id: 'details-english-only', round: 'details', quality: 'mixed', color: '#f0e3b8',
      title: text('準確但只有英文姓名', 'Accurate, but English name only'),
      detail: text('課程資料完整 · 中文姓名欠缺', 'Study details complete · Chinese name missing'),
      note: text('資料準確，但雙語姓名更配合平台展示', 'Accurate, though a bilingual name suits the platform better'),
      profile: {
        name: text('Chris Wong', 'Chris Wong'),
        programme: text('藝術學士（榮譽）學位', 'Bachelor of Fine Arts (Honours)'),
        major: text('表演', 'Acting'),
        year: '2026',
        contact: text('chris.wong.portfolio@example.com', 'chris.wong.portfolio@example.com'),
      },
      traits: { profileInfo: 11 },
    },
  ],
  experience: [
    {
      id: 'credit-complete-1', round: 'experience', quality: 'strong', color: '#efe8f4',
      title: text('《暴風雨》— Ariel', 'The Tempest — Ariel'),
      detail: text('學院製作 · 黑盒劇場 · 2025', 'Academy Production · Black Box · 2025'),
      note: text('作品、角色、場地和年份俱全', 'Title, role, venue and year are all present'),
      traits: { completeness: 7, curation: 5 },
    },
    {
      id: 'credit-vague', round: 'experience', quality: 'weak', color: '#f4d6cf',
      title: text('參與學校演出', 'Performed in school show'),
      detail: text('演員', 'Performer'),
      note: text('欠缺作品名稱、角色及年份', 'The production, role and year are missing'),
      traits: { completeness: 2, curation: 2 },
    },
    {
      id: 'credit-complete-2', round: 'experience', quality: 'strong', color: '#dcebd9',
      title: text('《離岸》— 聯合編作及演員', 'Offshore — Co-deviser & Performer'),
      detail: text('畢業製作 · 演藝劇院 · 2026', 'Graduation Production · Academy Theatre · 2026'),
      note: text('清楚說明創作職責', 'The creative contribution is immediately clear'),
      traits: { completeness: 7, curation: 5 },
    },
    {
      id: 'credit-social', round: 'experience', quality: 'mixed', color: '#d7e8ed',
      title: text('短片《凌晨兩點》', 'Short Film: 2AM'),
      detail: text('網上短片 · 2024', 'Online short · 2024'),
      note: text('有作品脈絡，但仍欠缺角色', 'Useful context, but the role is still missing'),
      traits: { completeness: 4, curation: 4 },
    },
    {
      id: 'credit-skill', round: 'experience', quality: 'strong', color: '#f0e3b8',
      title: text('技能：粵語、英語、舞台搏擊', 'Skills: Cantonese, English, Stage Combat'),
      detail: text('舞台搏擊基礎證書 · 2025', 'Foundation certificate · 2025'),
      note: text('具體技能比籠統形容更有用', 'Specific skills are more useful than broad claims'),
      traits: { completeness: 6, curation: 5 },
    },
    {
      id: 'credit-hobby', round: 'experience', quality: 'weak', color: '#e5ddd6',
      title: text('喜歡看電影和旅行', 'Enjoys films and travelling'),
      detail: text('興趣', 'Interests'),
      note: text('這項資料未能證明專業能力', 'This does not demonstrate a professional capability'),
      traits: { completeness: 3, curation: 1 },
    },
  ],
  gallery: [
    {
      id: 'gallery-rehearsal', round: 'gallery', quality: 'strong', color: '#b64136', imageSrc: '/assets/gallery/gallery-rehearsal.jpg',
      title: text('排練現場', 'Rehearsal in progress'), detail: text('清晰 · 已授權', 'Clear · rights cleared'),
      note: text('展示你的創作過程', 'Shows your creative process'), traits: { gallery: 4, rights: 3 },
    },
    {
      id: 'gallery-performance', round: 'gallery', quality: 'strong', color: '#145f62', imageSrc: '/assets/gallery/gallery-performance.jpg',
      title: text('舞台演出', 'Stage performance'), detail: text('清晰 · 已授權', 'Clear · rights cleared'),
      note: text('有力地呈現表演能力', 'Strong evidence of your performance'), traits: { gallery: 4, rights: 3 },
    },
    {
      id: 'gallery-watermark', round: 'gallery', quality: 'weak', color: '#826a92', imageSrc: '/assets/gallery/gallery-watermark.jpg',
      title: text('攝影師預覽圖', 'Photographer preview'), detail: text('可見水印 · 未獲授權', 'Visible watermark · uncleared'),
      note: text('有水印的圖片不可公開使用', 'A watermarked image is not ready for public use'), traits: { gallery: 2, rights: 0 },
    },
    {
      id: 'gallery-backstage', round: 'gallery', quality: 'strong', color: '#d19b42', imageSrc: '/assets/gallery/gallery-backstage.jpg',
      title: text('後台準備', 'Backstage preparation'), detail: text('故事性強 · 已授權', 'Narrative · rights cleared'),
      note: text('為作品加入幕後脈絡', 'Adds behind-the-scenes context'), traits: { gallery: 4, rights: 3 },
    },
    {
      id: 'gallery-blur', round: 'gallery', quality: 'weak', color: '#6d7372', imageSrc: '/assets/gallery/gallery-blur.jpg',
      title: text('低清動態截圖', 'Low-resolution action still'), detail: text('模糊 · 主體不清', 'Blurred · unclear subject'),
      note: text('解像度不足會削弱作品質感', 'Low resolution weakens the presentation'), traits: { gallery: 1, rights: 2 },
    },
    {
      id: 'gallery-portrait', round: 'gallery', quality: 'strong', color: '#cb806d', imageSrc: '/assets/gallery/gallery-character.jpg',
      title: text('角色造型照', 'Character portrait'), detail: text('清晰 · 已授權', 'Clear · rights cleared'),
      note: text('補充角色與個人面貌', 'Adds character range and personality'), traits: { gallery: 4, rights: 3 },
    },
    {
      id: 'gallery-repeat', round: 'gallery', quality: 'mixed', color: '#8b403b', imageSrc: '/assets/gallery/gallery-repeated.jpg',
      title: text('相似演出角度', 'Repeated performance angle'), detail: text('清晰 · 內容重複', 'Clear · repetitive'),
      note: text('清晰但未能增加新的資訊', 'Clear, but adds little new information'), traits: { gallery: 2, rights: 3 },
    },
    {
      id: 'gallery-ensemble', round: 'gallery', quality: 'mixed', color: '#3c6880', imageSrc: '/assets/gallery/gallery-ensemble.jpg',
      title: text('大合照', 'Large ensemble'), detail: text('已授權 · 難以辨認主體', 'Rights cleared · hard to identify'),
      note: text('團隊脈絡好，但你不夠突出', 'Good team context, but you are not prominent'), traits: { gallery: 2, rights: 3 },
    },
  ],
}