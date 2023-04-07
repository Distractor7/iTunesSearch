import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Favourites from "../components/favourites";
import "../setupTests";
import "cross-fetch/polyfill";

describe("Favourites component", () => {
  it("should render the Favourites component correctly", () => {
    render(<Favourites />);
    const favouritesHeading = screen.getByRole("heading", {
      name: /favourites/i,
    });
    expect(favouritesHeading).toBeInTheDocument();
  });
});
