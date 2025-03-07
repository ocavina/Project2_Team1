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

    test("Renders the Add Button", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("Add")).toBeInTheDocument();
    });

    test("Renders the Back Button", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("Back")).toBeInTheDocument();
    });

    test("Renders the My Collection Button", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("My Collection")).toBeInTheDocument();
    });


    test("Redirects the User to Another Page when Collection is Clicked", () => {
        fireEvent.click(screen.getByText("My Collection"));
        expect(window.location.pathname).toBe("/collection");
    });
})