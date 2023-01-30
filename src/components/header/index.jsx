import { CiApple } from "react-icons/ci";
import "./index.css";
const Header = () => {
  return (
    <div className="header">
      <CiApple data-testid="food-icon" className="header-title" />
      <div data-testid="display-foodo" className="header-title">Foodo</div>
    </div>
  );
};

export default Header;
