//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

import FoundGame from "./found-game";

const FoundGames = styled(function({ className, search, gameID, chooseGame }) {
  return (
    <div className={className}>
      {search.loading && <div>loading...</div>}
      {search.error && <div>Error: {search.error.message}</div>}
      {search.result && (
        <div>
          <ul>
            {search.result.map(game => (
              <FoundGame
                key={game.name}
                active={game.objectid === gameID}
                game={game}
                onClick={() => chooseGame(game.objectid)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default FoundGames;
