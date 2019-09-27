//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

import FoundGames from "./found-games";
import GameVersions from "./game-versions";

function VersionFinder(props) {
  return (
    <div className={props.className}>
      <FoundGames
        search={props.search}
        gameID={props.gameID}
        chooseGame={props.chooseGame}
      />
      <GameVersions gameID={props.gameID} chooseVersion={props.chooseVersion} />
    </div>
  );
}

const StyledVersionFinder = styled(VersionFinder)`
  display: flex;

  ${FoundGames}, ${GameVersions} {
    flex: 1;
  }

  ${GameVersions} {
    border-left: 1px solid #ddd;
  }
`;

export default StyledVersionFinder;
