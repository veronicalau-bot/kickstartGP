# Graduate Profile Simulator

A bilingual booth game that teaches students how to curate a clear, rights-ready Graduate Profile. Players capture rotating profile materials, see their choices update a live profile, and receive an industry-view score.

## Game flow

Each step begins with a short explanation. The 30-second timer starts only after the player chooses `Start this step`. All candidates stay in fixed positions while a light moves through the available tiles at a regular rhythm. The player presses the capture button, `Space`, or `Enter` when the light reaches the intended material.

1. Profile picture: capture one clear, recognisable portrait.
2. Personal details: capture one accurate, complete, publication-ready details card.
3. Experience: capture four credits that clearly explain the student's role and context.
4. Photo gallery: capture six clear, varied and rights-cleared images.

After each timed step, the updated profile is shown before the player continues. The completed page is then assessed from an industry viewer's perspective.

## Run locally

Requirements: Node.js 22 or later and npm.

```powershell
npm install
npm run dev -- --host=127.0.0.1
```

Open `http://localhost:5173/`. For a booth, open the browser in full-screen or kiosk mode and keep the page at 100% zoom.

## Single-button booth control

The entire default game can be played with `Enter` only:

- Welcome: start the game
- Step briefing: begin the 30-second round
- Timed round: capture the currently lit material
- Step complete: continue to the next step
- Results: play again

During the automatic industry scan, input is deliberately ignored. Held-key repeat is also ignored, so one press cannot skip across two screens.

For a physical booth button, use a USB arcade button encoder or programmable accessibility switch that identifies itself as a standard USB HID keyboard and sends one `Enter` key press/release per activation. No custom driver or browser permission is required. Configure the device to send `Enter`, not a macro, and disable rapid-fire/turbo mode. Keep a normal keyboard connected during setup and testing.

Mouse and touch remain available for staff and fallback operation, but players do not need them to complete the default Chinese-language game.

## Quality checks

```powershell
npm test
npm run lint
npm run build
```

The production files are written to `dist/` and can be deployed to static hosting. The game has no API, login, analytics, or persistent player data.

## Content and images

The prototype uses fictional student details together with 5 supplied portrait images in `public/assets/portraits/` and 8 supplied portfolio images in `public/assets/gallery/`. Their paths are mapped to individual materials in `src/game/content.ts` and the same image is used in the option board, live preview and final profile.

Before public use:

1. Record the source, creator, approval status, usage scope, and expiry date of every image in an asset manifest.
2. Keep the deliberately watermarked example fictional; do not use a photographer's real proof image as the negative example.
3. Obtain approval before using institutional logos or representing the simulator as an official submission channel.

Do not copy student names, credits, portraits, or production photographs from the live Graduate Profile platform without documented permission.

## Project map

- `src/game/content.ts`: bilingual fictional materials and scoring traits
- `src/game/scoring.ts`: score, badge, and feedback logic
- `src/game/useGameMachine.ts`: timers, rotation, capture, and round transitions
- `src/App.tsx`: game screens and live Graduate Profile preview
- `src/game.css`: responsive presentation and motion behavior# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
