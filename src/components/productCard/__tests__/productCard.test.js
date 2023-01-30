import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ProductCard from "..";

const MockProductCard = () => {
  const productData = {
    name: "Paneer Tikkaa",
    price: 200,
    rating: 0,
    image: "http://localhost:1337/uploads/food1_a5d9aa8255.webp",
    amount: 1,
    id: 45, 
  };
  return (
    <BrowserRouter>
      <ProductCard
        details={productData}
        isSelected={() => null}
        handleClick={() => null}
      />
    </BrowserRouter>
  );
};

describe("Product Card Component", () => {
  it("Should render product card correctly", () => {
    render(<MockProductCard />);
    const image = screen.getByRole("img");
    const button = screen.getByRole("button");
    const foodTitle = screen.getByRole("heading");
    expect(image).toBeInTheDocument();
    expect(foodTitle).toHaveTextContent("Paneer Tikkaa");
    expect(button).toHaveTextContent(/Add to cart/i);
  });
});
