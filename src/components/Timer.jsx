import { useState, useEffect, useContext } from "react";
import { WinContext } from "../App";
import Player from "./Player";

import "../styles/header.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const { gameWon } = useContext(WinContext);

  // sets time for every 10 milliseconds
  useEffect(() => {
    let interval;

    if (gameWon === false) {
      interval = setInterval(() => {
        setTime((count) => count + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [gameWon]);

  return (
    <div className="timer">
      <p>
        <span className="minutes">
          {("0" + Math.floor((time % 360000) / 6000)).slice(-2)}:
        </span>
        <span className="seconds">
          {("0" + Math.floor((time % 6000) / 100)).slice(-2)}:
        </span>
        <span className="milliseconds">{("0" + (time % 100)).slice(-2)}</span>
      </p>
      {gameWon === true && <Player time={time} />}
    </div>
  );
};

export default Timer;