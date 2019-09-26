//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

import FoundGame from "./found-game";

const FoundGames = styled(function({ className, search, chooseVersion }) {
  return (
    <div className={className}>
      {search.loading && <div>loading...</div>}
      {search.error && <div>Error: {search.error.message}</div>}
      {search.result && (
        <div>
          <div>Results: {search.result.length}</div>
          <ul>
            {search.result.map(game => (
              <FoundGame
                key={game.name}
                game={game}
                chooseVersion={chooseVersion}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})``;

export default FoundGames;
