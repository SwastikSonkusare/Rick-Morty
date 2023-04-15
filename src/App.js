import axios from "axios";
import React, { useEffect, useState } from "react";

import Loader from "./components/Loader/Loader";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);
  let currentCharacters;

  useEffect(() => {
    // Fetching by characters, episodes & location.

    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        setEpisodes(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((response) => {
        setLocations(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getEpisodeNames = (episodeIds) => {
    const episodeNames = [];
    episodeIds.forEach((id) => {
      const episode = episodes.find((episode) => episode.url === id);
      if (episode) {
        episodeNames.push(episode.name);
      }
    });

    return episodeNames.join(", ");
  };

  const fetchBySingleKey = (url, key) => {
    const locationNames = [];
    const dimensionNames = [];
    const residentsAmount = [];

    const location = locations.find((loc) => loc.url === url);

    if (key === "name") {
      if (location) {
        locationNames.push(location.name);
      }

      return locationNames;
    } else if (key === "dimension") {
      if (location) {
        dimensionNames.push(location.dimension);
      }

      return dimensionNames;
    } else {
      const resident = locations.find((loc) => loc.url === url);

      resident?.residents?.forEach((resident) => {
        residentsAmount.push(resident);
      });

      return residentsAmount?.length;
    }
  };

  // Pagination
  if (characters.length) {
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCapsule = indexOfLastCharacter - charactersPerPage;
    currentCharacters = characters?.slice(
      indexOfFirstCapsule,
      indexOfLastCharacter
    );
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card
          characters={currentCharacters}
          getEpisodeNames={getEpisodeNames}
          fetchBySingleKey={fetchBySingleKey}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Pagination
          charactersPerPage={charactersPerPage}
          totalCharacters={characters?.length}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default App;
