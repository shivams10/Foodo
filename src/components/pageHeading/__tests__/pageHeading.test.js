import { render, screen } from "@testing-library/react";
import PageHeading from "..";

test("should render page heading component", () => {
  render(<PageHeading />);
  const heading = screen.getByTestId("page-heading");
  const headingElement = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
});
