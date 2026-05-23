import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ResultScreen } from "./ResultScreen";

describe("ResolveScreen", () => {
  it("renders the win message", () => {
    render(<ResultScreen result="won" onPlayAgain={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /you did it/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /play again/i })
    ).toBeInTheDocument();
  });

  it("renders the lose message", () => {
    render(<ResultScreen result="lost" onPlayAgain={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /oops, you were close/i })
    ).toBeInTheDocument();
  });

  it("calls onPlayAgain when the play again button is clicked", async () => {
    const user = userEvent.setup();
    const onPlayAgain = vi.fn();

    render(<ResultScreen result="won" onPlayAgain={onPlayAgain} />);

    await user.click(screen.getByRole("button", { name: /play again/i }));

    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });
});
