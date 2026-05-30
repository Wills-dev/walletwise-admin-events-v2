import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, afterEach, vi } from "vitest";

import "@testing-library/jest-dom/vitest";

import Button from "./Button";

afterEach(cleanup);

describe("Button Component", () => {
  test("should render correctly with given children", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });
  test("should apply default class names", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toHaveClass(
      "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
      { exact: true }
    );
  });
  test("should apply custom class names", () => {
    render(<Button className="custom-class">Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toHaveClass("custom-class");
  });
  test("should handle onClick event", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
