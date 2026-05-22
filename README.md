# Memory Game Challenge

An accessible and responsive memory game built with React and TypeScript as part of a frontend technical challenge. Flip the cards, find every cosmic pair, and beat the timer before it reaches zero.

## Overview

The game presents 8 memory cards with 4 matching pairs. The player flips two cards at a time. Matching cards stay revealed, while non-matching cards flip back after visual feedback. The player wins by finding all pairs before the 30-second timer ends.

This project focuses on clean UI, responsive behavior, accessibility, sound feedback, and tested game interactions.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Vitest**
- **Testing Library**

## Framework Choice

This project uses **React** because the game is built around interactive UI state, reusable components, and frequent user interactions. **TypeScript** adds type safety to the game logic and component props, while **Vite** provides a fast development environment and a simple production build setup.

**Tailwind CSS** was chosen to build the responsive layout, visual states, and animations quickly while keeping styles close to the components.

## Project Structure

```txt
src/
├── assets/        # Images, icons, and audio files
├── components/    # Reusable UI and game screen components
├── data/          # Card data used to build the game board
├── App.tsx        # Main screen flow between start, game, and result
├── main.tsx       # React entry point
└── index.css      # Global styles, animations, and Tailwind setup
```

The structure keeps the game split into small, focused parts: screen-level components handle the main game flow, reusable components handle UI pieces, and data stays separate from rendering logic.

## Features

- Animated start screen
- Responsive memory card grid
- 3D card flip animation
- Shuffled card data on each game
- Match and no-match feedback as a non-blocking toast
- 30-second countdown timer
- Final countdown ticking sound
- Ticking speed increases as time runs out
- Win and lose result screens
- Move counter
- Best time saved locally with `localStorage`
- Background music and sound effects
- Mute/unmute control
- Accessible buttons, focus states, and live feedback
- Reduced motion support
- Unit and interaction tests with Vitest and Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at the URL printed by Vite in the terminal. By default:

```txt
http://localhost:5173
```

## Available Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run test`     | Run tests in watch mode              |
| `npm run test:run` | Run tests once                       |

## How the Game Works

1. The player starts the game from the animated start screen.
2. The board displays 8 hidden cards.
3. The player flips two cards per attempt.
4. If the cards match, they stay revealed.
5. If the cards do not match, they flip back after feedback.
6. Each pair attempt increases the move counter by one.
7. The player wins by matching all pairs before the timer reaches zero.
8. The player loses if the timer reaches zero first.
9. When the player wins, the best completion time is saved locally.

## Technical Decisions

### CSS-only card flip

The card flip animation uses native CSS transforms instead of an animation library. This keeps the interaction lightweight and avoids adding unnecessary dependencies.

### Board locking during pair validation

The board is temporarily locked while two selected cards are being checked. This prevents double-clicks, invalid extra flips, and race conditions during game state updates.

### Non-blocking match feedback

Match and no-match feedback appears as a toast near the bottom of the screen. This avoids layout shift and keeps the board stable while the player continues interacting with the game.

### Local best time

The best time is stored in `localStorage` only when the player wins. Invalid or missing stored values are handled safely.

### Sound design

The game uses separate sound effects for card flips, correct matches, incorrect matches, background music, and the final countdown. Audio volume is controlled per effect to keep the experience balanced.

### Accessibility

The project includes several accessibility considerations:

- Cards are interactive `<button>` elements.
- Cards expose pressed state with `aria-pressed`.
- Match feedback uses an `aria-live` region.
- Decorative images are hidden from assistive technology.
- Focus states are visible.
- Animations respect `prefers-reduced-motion`.

## Testing

The project uses **Vitest** and **Testing Library**.

Current tests cover:

- Result screen rendering for win and lose states
- Play again interaction
- Game board rendering
- Move counter behavior
- Saved best time from `localStorage`

Run tests in watch mode:

```bash
npm run test
```

Run tests once:

```bash
npm run test:run
```

## Quality Checks

Before committing important changes, run:

```bash
npm run lint
npm run test:run
npm run build
```

## Project Status

The project currently includes the core gameplay, responsive layout, sound controls, timer, result screens, saved best time, and basic interaction tests.

Possible future improvements:

- Win celebration animation
- Visual shuffle animation before the game starts
- Reveal remaining cards after losing
- Additional test coverage for timer behavior
- Demo screenshots or GIF in this README
