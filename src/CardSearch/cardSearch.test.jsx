import { render, screen, fireEvent } from "@testing-library/react";
import CardSearch from "./cardSearch";
import { describe } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";


describe("cardSearch", () =>{
    beforeEach(() => {
        // Arrange
        render(
        <BrowserRouter>
            <CardSearch />
        </BrowserRouter>
        )
      });

    test("Renders the App", () => {
        // Act
        //   No Act steps needed
        // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
})