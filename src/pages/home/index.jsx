import "./index.css";
import FoodLogo from "../../assets/images/FoodLogo.webp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <div>
          <h3 className="tracking-in-expand">Welcome to Foodo!</h3>
          <h3 className="tracking-in-expand">Hungry ?</h3>
          <Link to="/store">
            <button className="banner-button">Go to Store</button>
          </Link>
        </div>
        <div className="banner-image">
          <img src={FoodLogo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
