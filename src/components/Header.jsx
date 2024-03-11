import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/header.css";

const Header = ({ children }) => {
  return (
    <header className="appHeader">
      <Link to={"/"}>photoTag</Link>
      <div className="headerCharacters">{children}</div>
      <nav>
        <Link to={"/leaderboard"}>Leader Board</Link>
      </nav>
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default Header;