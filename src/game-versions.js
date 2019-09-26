//; -*- mode: rjsx;-*-
import React from "react";
import { useAsync } from "react-async-hook";

import GameVersion from "./game-version";
import { findVersions } from "./api";

function GameVersions({ id, chooseVersion }) {
  const asyncThing = useAsync(findVersions, [id, "thing"]);

  const getVersion = version => (
    <GameVersion
      key={version.objectid}
      version={version}
      chooseVersion={chooseVersion}
    />
  );

  //const getItems = result => result.item.links.boardgameversion;

  return (
    <div>
      {asyncThing.loading && <div>Loading</div>}
      {asyncThing.error && <div>Error: {asyncThing.error.message}</div>}
      {asyncThing.result && <ul>{asyncThing.result.items.map(getVersion)}</ul>}
    </div>
  );
}

export default GameVersions;
