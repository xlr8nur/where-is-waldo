import { useNavigate } from "react-router-dom";
import Img1 from "../images/waldo-tag.png";
import Img2 from "../images/waldo & waldo-tag.png";
import Img3 from "../images/memesupreme.jpg";
import "../styles/homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/${e}`);
  };

  return (
    <div className="homepage">
      <h2>Game Worlds</h2>
      <div className="pageImgContainer">
        <div
          className="pageImgWrapper"
          onClick={() => handleClick("waldo-tag")}
        >
          <img src={Img1} alt=""></img>
          <h3>waldo tag</h3>
        </div>
        <div className="pageImgWrapper" onClick={() => handleClick("isord")}>
          <img src={Img2} alt=""></img>
          <h3>Isord</h3>
        </div>
        <div
          className="pageImgWrapper"
          onClick={() => handleClick("memesupreme")}
        >
          <img src={Img3} alt=""></img>
          <h3>Memesupreme</h3>
        </div>
      </div>
    </div>
  );
};

export default Homepage;