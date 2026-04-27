# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start webpack dev server with HMR (accessible on local network)
npm run build    # Production build → dist/ (content-hashed, minified)
```

No test runner is configured.

## Architecture

This is a **Three.js ATM simulation** — a single-page vanilla JS app that layers a 3D bank scene under an HTML ATM interface overlay. There is no framework; state lives in plain variables inside `src/script.js`.

### Key files

- [src/script.js](src/script.js) — the entire application (~443 lines). All 3D scene setup, animation, and ATM logic lives here.
- [src/index.html](src/index.html) — HTML template with the canvas element and the ATM overlay DOM (`#start-overlay`, `#atm-screen`, hardware buttons, keypad).
- [src/style.css](src/style.css) — all styling, including ATM theming and overlay positioning.
- [bundler/](bundler/) — Webpack configs (common/dev/prod split).

### Two-tier rendering model

The visual experience has two independent layers that cooperate:

1. **Three.js canvas** (z-index 1) — 3D bank room, procedurally-built ATM machine, and character model made entirely from primitives (no external model files). GSAP timelines drive character walk-up, arm gestures, and card/cash props.

2. **HTML overlay** (z-index 10) — Two phases:
   - `#start-overlay`: "Walk Up to ATM" button; hidden after character animation starts.
   - `#atm-screen`: Full ATM interface (hardware buttons, keypad, screen div). Appears after the card-insertion animation.

### ATM state machine

`currentState` drives all UI logic. States and transitions:

```
WELCOME → PIN → MENU → WITHDRAWAL / BALANCE / OTHER_AMOUNT → PROCESSING → SUCCESS → (reset)
```

- `renderState()` — re-draws `#screen-content` innerHTML on every state change.
- `handleHwButton(side, index)` — routes hardware button clicks (L1–L4, R1–R4) based on the current state.
- `triggerDispense(amount)` — kicks off PROCESSING → SUCCESS and then the dispense animation.

Hardcoded demo data: any 4-digit PIN is accepted; account balance is fixed at 5000 GHS.

### Animation

GSAP timelines sequence the character walk-up (on start), arm/hand click feedback (on every button press), and the cash-dispense + walk-away sequence (on transaction success). The character is built from pivot groups (`armPivotR`, etc.) so rotations animate naturally.

### Bundler

Entry: `src/script.js`. Static assets (models directory) are copied from `static/` via CopyWebpackPlugin. CSS is extracted in production via MiniCSSExtractPlugin.
