import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Comment from "..";

const MockComment = () => {
  return (
    <BrowserRouter>
      <Comment chooseRating={() => null} />
    </BrowserRouter>
  );
};

describe("Product Card Component", () => {
  it("Should render product card correctly", () => {
    render(<MockComment />);
  });
});
