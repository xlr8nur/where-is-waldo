import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import trackImg from "../images/track.jpg";
import "../styles/leaderboard.css";

const LeaderBoard = ({ world }) => {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://waldo-tag-api.fly.dev/leaderboard/${world}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.statusText);
      });
  }, []);

  return (
    <div className="leaderBoardWrapper">
      {loading === false && (
        <>
          <h2>
            {world}
            <br />
            Leader Board
          </h2>
          <div className="leaderBoard">
            <header className="leaderBoardHeader">
              <h3>Rank</h3>
              <h3>Player</h3>
              <h3>Time</h3>
              <h3>Date</h3>
            </header>
            <section className="leaderBoardContent">
              {players.length === 0 ? (
                <div className="emptyIndicator">
                  <img src={EmptyImg} alt="" />
                  <p>Nothing in Leaderboard</p>
                </div>
              ) : (
                players.map((player, index) => {
                  let dateFormat = format(
                    new Date(player.timestamp),
                    "do MMM yyyy"
                  );
                  const minutes = (
                    "0" + Math.floor((player.scoreTime % 360000) / 6000)
                  ).slice(-2);
                  const seconds = (
                    "0" + Math.floor((player.scoreTime % 6000) / 100)
                  ).slice(-2);
                  const milliseconds = ("0" + (player.scoreTime % 100)).slice(
                    -2
                  );

                  return (
                    <div key={index} className="leaderBoardPlayer">
                      <p>{index + 1}</p>
                      <p>{player.playerName}</p>
                      <p>{`${minutes}m ${seconds}s ${milliseconds}ms`}</p>
                      <p>{dateFormat}</p>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

LeaderBoard.propTypes = {
  world: PropTypes.string,
};

export default LeaderBoard;