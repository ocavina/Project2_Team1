import { render, screen, fireEvent } from "@testing-library/react";
import Collection from "./collection";
import { describe } from "vitest";
import { BrowserRouter } from "react-router-dom";


describe("Collection", () =>{
    beforeEach(() => {
        // Arrange
        render(
            <BrowserRouter>
                <Collection />
            </BrowserRouter>
            );
      });

    test("Renders the App", () => {
        // Act
        //   No Act steps needed
        // Assert
    expect(screen.getByText("Your Collection is Empty")).toBeInTheDocument();
    });
})