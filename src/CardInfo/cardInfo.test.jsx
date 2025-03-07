import { render, screen, fireEvent } from "@testing-library/react";
import CardInfo from "./cardInfo";
// import { describe } from "vitest";
import { BrowserRouter, createMemoryRouter, RouterProvider } from "react-router-dom";

describe("cardInfo", () =>{
    beforeEach(() => {
        render(
            <BrowserRouter>
                <CardInfo />
            </BrowserRouter>
        );
      });

    test("Renders the App", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("Set Name:")).toBeInTheDocument();
    });
})