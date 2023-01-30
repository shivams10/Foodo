import { render,screen } from "@testing-library/react";
import ProductDetails from "..";
import axios from "axios";

describe("Product Details component", () => {
  it("should render product details component correctly", async () => {

    axios.get.mockImplementation(() => Promise.resolve());
    render(<ProductDetails />)
    
    const image = screen.getByRole("img");
    const submitButton = screen.getByRole("button",{name:/Submit/});
    expect(image).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
}); 