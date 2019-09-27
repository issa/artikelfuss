//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";
import { useAsync } from "react-async-hook";

import GameVersion from "./game-version";
import { findVersions } from "./api";

function GameVersions({ className, gameID, chooseVersion }) {
  const asyncThing = useAsync(findVersions, [gameID]);

  const getVersion = version => (
    <GameVersion
      key={version.objectid}
      version={version}
      chooseVersion={chooseVersion}
    />
  );

  //const getItems = result => result.item.links.boardgameversion;

  return (
    <div className={className}>
      {asyncThing.loading && <div>Loading</div>}
      {asyncThing.error && <div>Error: {asyncThing.error.message}</div>}
      {asyncThing.result && asyncThing.result.items && (
        <ul>{asyncThing.result.items.map(getVersion)}</ul>
      )}
    </div>
  );
}

const StyledGameVersions = styled(GameVersions)`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 1em;
  }
`;

export default StyledGameVersions;
