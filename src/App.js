//; -*- mode: rjsx;-*-
import React, { useMemo, useState } from "react";
import styled from "styled-components/macro";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsync } from "react-async-hook";

import SearchBar from "./search-bar";
import Spieleinfo from "./spieleinfo";
import VersionFinder from "./version-finder";

import { searchGame } from "./api";

const useSearchGame = (initialText = "") => {
  // Handle the input text state
  const [inputText, setInputText] = useState(initialText);

  // Debounce the original search async function
  const debouncedSearchGame = useMemo(
    () => AwesomeDebouncePromise(searchGame, 300),
    []
  );

  const search = useAsync(
    async text => {
      if (text.trim().length < 3) {
        return [];
      } else {
        return debouncedSearchGame(text);
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText]
  );

  // Return everything needed for the hook consumer
  return [inputText, setInputText, search];
};

function App(props) {
  const [gameID, setGameID] = useState();
  const [version, setVersion] = useState();
  const [query, setQuery, search] = useSearchGame();

  function handleSearch({ target }) {
    setQuery(target.value);
    setGameID(null);
    setVersion(null);
  }

  function chooseGame(game) {
    setGameID(game);
  }

  function chooseVersion(newVersion) {
    setVersion(newVersion);
  }

  return (
    <div className={props.className}>
      <main>
        <SearchBar query={query} handleSearch={handleSearch} />

        <VersionFinder
          search={search}
          gameID={gameID}
          version={version}
          chooseGame={chooseGame}
          chooseVersion={chooseVersion}
        />

        <Spieleinfo gameID={gameID} version={version} />
      </main>
    </div>
  );
}

const StyledApp = styled(App)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  ${SearchBar} {
  }

  ${VersionFinder} {
    flex-grow: 1;
    overflow: hidden;
    min-height: 0;
  }

  ${Spieleinfo} {
    box-shadow: 0 -2px 0 0 #f5f5f5;
  }
`;

export default StyledApp;
