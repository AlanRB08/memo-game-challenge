import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GameScreen } from "./GameScreen";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

beforeEach(() => {
  vi.restoreAllMocks();

  localStorageMock.clear();
  vi.stubGlobal("localStorage", localStorageMock);

  vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(() =>
    Promise.resolve()
  );

  vi.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(
    () => {}
  );
});
afterEach(() => {
  vi.useRealTimers();
});

describe("GameScreen", () => {
  it("renders 8 memory cards", () => {
    render(<GameScreen onGameEnd={() => {}} />);

    const cards = screen.getAllByRole("button", {
      name: /hidden memory card/i,
    });

    expect(cards).toHaveLength(8);
  });

  it("does not increment moves after flipping only one card", async () => {
    const user = userEvent.setup();

    render(<GameScreen onGameEnd={() => {}} />);

    const cards = screen.getAllByRole("button", {
      name: /hidden memory card/i,
    });

    await user.click(cards[0]);

    expect(screen.getByText(/moves:/i)).toHaveTextContent("Moves: 0");
  });

  it("increments moves after flipping two cards", async () => {
    const user = userEvent.setup();

    render(<GameScreen onGameEnd={() => {}} />);

    const cards = screen.getAllByRole("button", {
      name: /hidden memory card/i,
    });

    await user.click(cards[0]);
    await user.click(cards[1]);

    expect(screen.getByText(/moves:/i)).toHaveTextContent("Moves: 1");
  });

  it("renders saved best time from localStorage", () => {
    localStorage.setItem("memory-game-best-time", "12");

    render(<GameScreen onGameEnd={() => {}} />);

    expect(screen.getByText(/best:/i)).toHaveTextContent("Best: 12s");
  });
  it("ends the game as lost when the timer reaches zero", () => {
    vi.useFakeTimers();

    const onGameEnd = vi.fn();

    render(<GameScreen onGameEnd={onGameEnd} />);

    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(onGameEnd).toHaveBeenCalledTimes(1);
    expect(onGameEnd).toHaveBeenCalledWith("lost", false);
  });
});
