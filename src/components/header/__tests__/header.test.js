import {render, screen} from "@testing-library/react";
import Header from "..";

test('should render header component', () => { 
    render(<Header />);
    const headerText = screen.getByTestId("display-foodo");
    const headerLogo = screen.getByTestId("food-icon");
    expect(headerText).toBeInTheDocument();
    expect(headerText).toHaveTextContent("Foodo");
    expect(headerLogo).toBeInTheDocument();
 })