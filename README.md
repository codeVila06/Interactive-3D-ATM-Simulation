# 🏧 Interactive 3D ATM Simulation

> A fully browser-based, interactive 3D ATM simulation built with Three.js, GSAP, and the Web Audio API — no external audio files, no plugins, no server required.

**Course:** C3231 – Computer Graphics & Multimedia  
**Group:** Group 1 CS  
**Project Option:** [A / B / C]

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Group Members](#group-members)

---

## Overview

This project simulates a complete ATM transaction experience inside a web browser. A 3D humanoid character walks up to a UBA-branded ATM, inserts a bank card, and hands control to the user — who can then check balances, withdraw cash, change their PIN, and more, all through a hybrid 2D/3D interface.

Every visual, animation, and sound in the simulation is generated programmatically at runtime. There are **zero audio files** in this project — all sound effects are synthesised live using the Web Audio API.

---

## Features

- 🧍 **Rigged 3D character** with a hierarchical skeleton (shoulder → elbow → forearm → hand)
- 🎬 **Cinematic camera transitions** — smooth flyover from overview to ATM close-up
- 🔊 **Procedural audio** — button clicks, confirmation beeps, and cash dispenser noise are all synthesised in code
- 🗣️ **Text-to-speech guidance** via the Web Speech API for accessibility
- 💳 **Card hand-off animation** — the card reparents from the ATM to the character's hand in world space
- 🔐 **PIN masking** — keystrokes replaced with ● dots in real time
- 🔄 **Finite State Machine** — robust ATM flow with cancel-everywhere navigation
- 💡 **PBR lighting** — four-point rig with emissive screen glow and metalness/roughness materials

---

## Demo

```
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080) in your browser and click **Walk Up** to begin.

> Works on Chrome, Firefox, Edge, and Safari (latest versions). No installation beyond Node.js required.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Three.js](https://threejs.org) | r158 | 3D scene graph and WebGL rendering |
| [GSAP](https://gsap.com) | 3.12 | Procedural animation timelines |
| Web Audio API | W3C Native | Synthesised sound effects |
| Web Speech API | W3C Native | Accessibility text-to-speech |
| Webpack | 5.x | Module bundling and dev server |
| HTML5 / CSS3 | Native | ATM overlay UI and PIN masking |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-group/interactive-atm-simulation.git
cd interactive-atm-simulation

# Install dependencies
npm install
```

### Running in Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
# Output is placed in /dist
```

---

## Project Structure

```
interactive-atm-simulation/
├── dist/                     # Webpack compiled output
│   ├── bundle.js
│   └── index.html
├── src/
│   ├── index.html            # App entry point
│   ├── style.css             # Global styles + ATM overlay
│   └── script.js             # Main application (~2,400 lines)
│       ├── // ── DOM          Button refs and event listeners
│       ├── // ── SCENE        Renderer, camera, scene graph
│       ├── // ── ENVIRONMENT  Walls, floor, lighting rig
│       ├── // ── ATM          ATM mesh construction
│       ├── // ── CHARACTER    Avatar skeleton and materials
│       ├── // ── ANIMATIONS   GSAP timelines
│       ├── // ── AUDIO        Web Audio API synthesiser
│       ├── // ── STATE        FSM transition logic
│       └── // ── RENDER       Animation loop (rAF)
├── package.json
└── webpack.config.js
```

---

## How It Works

### 3D Character

The avatar is built entirely from Three.js primitives — `CylinderGeometry` for limbs, `SphereGeometry` for joints, and `BoxGeometry` for the torso. All parts are parented into a skeleton hierarchy so a single rotation command on the shoulder pivot cascades to the entire arm.

### Animation

All motion is driven by GSAP timelines — no pre-exported animation data. This gives us frame-accurate synchronisation between movement, camera transitions, and audio triggers.

```js
walkTL
  .to(characterGroup.position, { z: 3.2, duration: 3.2, ease: 'power1.inOut' })
  .to(armPivotL.rotation, { x: -Math.PI / 2.4, duration: 0.45 }, "reach")
  .to(camera.position, { x: 0.1, y: 3.1, z: 4.2, duration: 1.5 }, "cardIn");
```

### Procedural Audio

All sound is generated at runtime using the Web Audio API:

```js
// Button click — square wave at 1100 Hz for 30ms
const sfxKey = () => tone(1100, 0.03, 'square', 0.12);

// Cash dispenser — white noise through a bandpass filter
const sfxCash = () => { /* white noise buffer + BiquadFilterNode */ };
```

### ATM State Machine

The transaction flow is a deterministic FSM. Every user action calls `transitionTo(newState)`, which updates the HTML overlay, triggers the relevant 3D animation, and fires the speech synthesiser.

```
IDLE → WELCOME → PIN → MENU → WITHDRAW → DISPENSING → EJECT → IDLE
```

---



---

## Acknowledgements

- [Three.js](https://threejs.org) — Ricardo Cabello (mrdoob) and contributors
- [GSAP](https://gsap.com) — GreenSock LLC
- W3C Web Audio API and Web Speech API specifications
-Jesudunyin.tm
