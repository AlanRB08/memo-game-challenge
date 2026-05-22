# Memory Game Challenge

An accessible memory game built as a frontend technical challenge. Flip the cards, find every cosmic pair before the timer runs out.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for tooling and dev server
- **Tailwind CSS v4** for styling
- **Vitest** + **Testing Library** for tests

## Getting started

```bash
npm install
npm run dev
```

The app runs at the URL Vite prints in the terminal (default `http://localhost:5173`).

## Available scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run test`     | Run tests in watch mode              |
| `npm run test:run` | Run tests once (CI mode)             |

## How it works

The game shows 8 cards (4 pairs). Flip two cards: if they match they stay revealed, otherwise they flip back. Match all pairs before the 30-second timer reaches zero to win. The audio toggle controls background music and sound effects.

## Technical decisions

- **CSS-only card flip** — the 3D flip uses native CSS transforms (`transform-style: preserve-3d`) instead of an animation library, keeping the bundle smaller and the interaction smooth.
- **Board locking during checks** — while a pair is being evaluated the board is disabled, preventing double-clicks and race conditions.
- **Accessibility** — interactive cards are real `<button>` elements with `aria-pressed` and visible focus rings, the match feedback uses an `aria-live` region, and animations respect `prefers-reduced-motion`.
- **Timer feedback** — the ticking sound speeds up as time runs low to build tension without relying only on the visual countdown.

## Testing

Tests cover the result screen and the game board rendering. Run them with `npm run test`.
