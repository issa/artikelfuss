//; -*- mode: rjsx;-*-
import React, { useState } from "react";

import GameVersions from "./game-versions";

function FoundGame({ game = {}, chooseVersion }) {
  const { name, objectid: id, objecttype: type } = game;
  const [showDetails, setShowDetails] = useState(false);

  function handleClick(event) {
    setShowDetails(true);
  }

  return (
    <li onClick={handleClick}>
      {name}
      {showDetails && <GameVersions id={id} chooseVersion={chooseVersion} />}
    </li>
  );
}

export default FoundGame;
