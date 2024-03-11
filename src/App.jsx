import { useState, createContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Homepage from "./components/Homepage";
import WorldOne from "./components/WorldOne";
import WorldTwo from "./components/WorldTwo";
import WorldThree from "./components/WorldThree";
import Characters from "./components/Characters";
import LeaderboardPage from "./components/LeaderBoardPage";
import LeaderBoard from "./components/LeaderBoard";

// Import character images
import beachImg from "./images/beach.jpg";
import hollywoodImg from "./images/hollywood.jpg";
import redWaldoImg from "./images/redWaldo.svg";
import smBeachImg from "./images/smBeach.jpg";
import smhollywoodImg from "./images/smhollywood.jpg";
import smRedWaldoImg from "./images/smRedWaldo.svg";
import smspaceImg from "./images/smspace.jpg";
import smtrackImg from "./images/smtrack.jpg";
import smWaldoImg from "./images/smWaldo.svg";
import smWhitebeardImg from "./images/smWhitebeard.svg";
import smWilmaImg from "./images/smWilma.svg";
import spaceImg from "./images/space.jpg";
import trackImg from "./images/track.svg";
import waldoImg from "./images/waldo.svg";
import waldoImg from "./images/waldo.png";
import WhitebeardImg from "./images/Whitebeard.svg";
import WilmaImg from "./images/Wilma.svg";

// import Styles
import "./styles/App.css";
import "./styles/worldPage.css";

export const WinContext = createContext();

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState({ hasError: false, msg: "" });
  const { name } = useParams();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let object = {};

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    fetch(`https://waldo-tag-api.fly.dev/leaderboard/${name}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        setGameWon(false);
        navigate(`/leaderboard/${name}`);
        return response.json();
      })
      .catch((err) => {
        err
          .json()
          .then((jsonError) => {
            setError((prev) => ({
              ...prev,
              hasError: true,
              msg: jsonError.errors,
            }));
          })
          .catch((genericError) => {
            console.log(err.statusText);
          });
      });
  };

  let modalClassName;

  if (name === "waldo-tag" || name === "waldo" || name === "memesupreme") {
    modalClassName = gameWon === true ? "modalOpen" : "";
  } else {
    modalClassName = "";
  }

  return (
    <WinContext.Provider value={{ gameWon, setGameWon, error, handleSubmit }}>
      <div id="App" className={modalClassName}>
        {pathname === "/leaderboard/waldo" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"waldo-tag"} />
          </>
        ) : pathname === "/leaderboard/waldo" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"waldo"} />
          </>
        ) : pathname === "/leaderboard/memesupreme" ? (
          <>
            <Header></Header>
            <LeaderBoard world={"memesupreme"} />
          </>
        ) : name === "waldo-tag" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Mario", image: marioImg },
                  { pos: 2, name: "Blastoise", image: blastoiseImg },
                  { pos: 3, name: "Crono", image: cronoImg },
                ]}
              />
            </Header>
            <Timer world={"waldo-tag"} />
            <WorldOne />
          </>
        ) : name === "waldo" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Waldo", image: waldoImg },
                  { pos: 2, name: "RedWaldo", image: redWaldoImg },
                  { pos: 3, name: "Whitebeard", image: WhitebeardImg },
                ]}
              />
            </Header>
            <Timer world={"waldo"} />
            <WorldTwo />
          </>
        ) : name === "memesupreme" ? (
          <>
            <Header>
              <Characters
                charactersData={[
                  { pos: 1, name: "Waldo", image: waldoImg },
                  { pos: 2, name: "Track", image: trackImg },
                  { pos: 3, name: "Wilma", image: WilmaImg },
                ]}
              />
            </Header>
            <Timer world={"memesupreme"} />
            <WorldThree />
          </>
        ) : name === "leaderboard" ? (
          <>
            <Header></Header>
            <LeaderboardPage />
          </>
        ) : name === undefined ? (
          <>
            <Header></Header>
            <Homepage />
          </>
        ) : (
          <div>Error</div>
        )}
      </div>
    </WinContext.Provider>
  );
}

export default App;