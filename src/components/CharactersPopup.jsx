import PropTypes from "prop-types";

const Characters = ({ charactersData, handleClick }) => {
  return (
    <>
      {charactersData.map((character) => {
        let classStr = `character ${character.pos}`;

        return (
          <div
            key={character.pos}
            className={classStr}
            id={character.name}
            onClick={handleClick}
          >
            <img src={character.image} alt="" />
            <h4>{character.name}</h4>
          </div>
        );
      })}
    </>
  );
};

Characters.propTypes = {
  charactersData: PropTypes.array,
  handleClick: PropTypes.func,
};

export default Characters;