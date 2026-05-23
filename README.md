# Memory Game Challenge

A memory card game built with React and TypeScript as part of a frontend technical challenge. Flip the cards, find every cosmic pair, and beat the 30-second timer.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run test`     | Run tests in watch mode              |
| `npm run test:run` | Run tests once                       |

## How It Works

The game shows 8 hidden cards (4 matching pairs). The player flips two cards at a time — matching pairs stay revealed, non-matching pairs flip back after a short feedback delay. The goal is to find all pairs before the 30-second timer runs out.

- Winning saves your completion time to `localStorage` as a personal best
- The move counter tracks how many pairs you attempted
- Sound effects and background music can be toggled at any time

## Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Vitest** + **Testing Library**

## Project Structure

```
src/
├── assets/        # Icons, SVGs, and audio files
├── components/    # UI components and screen-level components
├── data/          # Card definitions and shuffle logic
├── App.tsx        # Screen flow: start → game → result
├── main.tsx       # React entry point
└── index.css      # Global styles, animations, Tailwind config
```

## Technical Decisions

**Framework:** React made sense here because the game is driven by interactive state — flipped cards, matched cards, a live timer, and audio that reacts to game events. TypeScript keeps the component props and game state honest without adding much overhead for a project this size.

**Screen flow:** Instead of a router, I used a simple state machine in `App.tsx` with a `screen` variable (`"start" | "game" | "result"`). A router would've been overkill for three screens with no URL navigation needs.

**Board locking:** While two cards are being evaluated for a match, the board is temporarily locked. This prevents race conditions from fast double-clicks and keeps the game state predictable.

**Match feedback as a toast:** The match/no-match result appears as a small overlay near the bottom of the screen instead of blocking the board. It avoids layout shift and lets the player keep track of what they flipped.

**CSS-only card flip:** The 3D card flip is done with CSS `perspective` and `rotateY` transforms, no animation library needed. It keeps things lightweight and easy to reason about.

**Audio:** Sound effects use the Web Audio API directly (`new Audio()`). The background music and ticking clock use refs to control playback across renders without re-initializing on every state update.

**Best time:** Stored in `localStorage` with a safe parse on read. If the stored value is missing or invalid, it defaults to null and the display shows `--`.

**Shuffle algorithm:** Fisher-Yates instead of `array.sort(() => Math.random() - 0.5)`, which produces a biased shuffle.

## Accessibility

- Cards are `<button>` elements with descriptive `aria-label` values that update based on their state
- Match feedback uses an `aria-live` region so screen readers announce the result
- Decorative images are hidden from assistive technology with `aria-hidden`
- Focus states are visible on all interactive elements
- Animations respect `prefers-reduced-motion`

## Testing

Tests cover the main game interactions: board rendering, move counter behavior, localStorage reads, and timer expiration. Run them with:

```bash
npm run test:run
```
