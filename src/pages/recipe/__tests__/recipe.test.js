import {render, screen} from "@testing-library/react";
import axios from "axios";

import Recipe from ".."

describe("Recipe", ()=> {
    it("Render Recipe ", () => {
        render(<Recipe />)
        const pageHeading = screen.getByRole("heading",  { level: 1 });
        const inputField = screen.getByRole("textbox")
        expect(pageHeading).toBeInTheDocument();
        expect(pageHeading).toHaveTextContent("Recipe");
        expect(inputField).toBeInTheDocument();
    })
}); 
