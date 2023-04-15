import React from "react";

import "./Card.css";

const Card = ({ characters, getEpisodeNames, fetchBySingleKey }) => {
  return (
    <>
      <h1>Characters of Rick & Morty</h1>
      <div className="container">
        {characters?.map((character, index) => (
          <div key={index} className="card">
            <img src={character.image} alt="" className="card__image" />
            <div className="card__info">
              <h3>Name: {character.name}</h3>
              <h3>Gender: {character.gender}</h3>
              <h3>Species: {character.species}</h3>
              <h3>Location: {character.location.name}</h3>
              <h3>Origin: {character.origin.name}</h3>
              <h3>Episodes: {getEpisodeNames(character.episode)}</h3>
              <h3>
                Name of the Location:{" "}
                {fetchBySingleKey(character.location.url, "name")}
              </h3>
              <h3>
                Dimension of the Location:{" "}
                {fetchBySingleKey(character.location.url, "dimension")}
              </h3>
              <h3>
                Amount of residents: {fetchBySingleKey(character.location.url)}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
