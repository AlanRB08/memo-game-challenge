import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GameScreen } from "./GameScreen";

describe("GameScreen", () => {
  it("renders 8 memory cards", () => {
    render(<GameScreen onGameEnd={() => {}} />);

    const cards = screen.getAllByRole("button", {
      name: /hidden memory card/i,
    });

    expect(cards).toHaveLength(8);
  });
});
