import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  beforeEach(() => {
    // Arrange
    render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    );
  });

  test("Renders the App", () => {
    // Act
    //   No Act steps needed
    // Assert
    expect(screen.getByText("Magic Digital Collection")).toBeInTheDocument();
  });

});