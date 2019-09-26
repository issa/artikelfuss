//; -*- mode: rjsx;-*-
import React, { useMemo, useState } from "react";
import styled from "styled-components/macro";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsync } from "react-async-hook";

import FoundGames from "./found-games";
import Header from "./header";
import SearchBar from "./search-bar";
import Spieleinfo from "./spieleinfo";

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
  const [query, setQuery, search] = useSearchGame("gloomh");

  function handleSearch({ target }) {
    setQuery(target.value);
  }

  function chooseVersion(game, version) {
    console.log(game, version);
  }

  return (
    <div className={props.className}>
      <main>
        <Header>Fairplay Spieleinfo</Header>

        <SearchBar query={query} handleSearch={handleSearch} />

        <FoundGames search={search} chooseVersion={chooseVersion} />
      </main>
      <Spieleinfo />
    </div>
  );
}

const StyledApp = styled(App)`
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 0 auto;
    max-height: calc(100vh - 5rem);
    overflow-y: scroll;
  }

  ${Spieleinfo} {
    flex: 0 5rem;
    box-shadow: inset 0px 3px 5px #aaa;
  }
`;

export default StyledApp;
