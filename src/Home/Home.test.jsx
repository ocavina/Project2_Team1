import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { describe } from "vitest";
import { BrowserRouter } from "react-router-dom";


describe("Home", () =>{
    beforeEach(() => {
        // Arrange
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
      });

    test("Renders the App", () => {
        // Act
        //   No Act steps needed
        // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    // test("Renders the collection button", () => {
    //     // Act
    //     //   No Act steps needed
    //     // Assert
    //     //   Check if the initial count is 0
    //     expect(screen.getByText("My Collection")).toBeInTheDocument();
    //   });
})