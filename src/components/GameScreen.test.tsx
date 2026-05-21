import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GameScreen } from "./GameScreen";

describe("GameScreen", () => {
  it("renders the game board with 8 memory cards", () => {
    render(<GameScreen onGameEnd={() => {}} />);

    const cards = screen.getAllByRole("button", { name: /memory card/i });

    expect(cards).toHaveLength(8);
  });
});
