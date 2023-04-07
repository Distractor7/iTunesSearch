import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../components/search";

describe("Search component", () => {
  it("should render correctly and match the snapshot", () => {
    const { asFragment } = render(<Search />);
    expect(asFragment()).toMatchSnapshot();
  });
});
