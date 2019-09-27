//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

import MissingImage from "./missing-image";
import ThumbnailImage from "./thumbnail-image";

const GameVersion = styled(function({ className, version, chooseVersion }) {
  return (
    <li className={className} onClick={() => chooseVersion(version)}>
      {version.images ? (
        <ThumbnailImage src={version.images.thumb} />
      ) : (
        <MissingImage />
      )}
      [{version.objectid}] {version.name}
    </li>
  );
})`
  display: flex;

  &:hover {
    background: #ccc;
  }

  padding: .5em;

  &:not(:last-child) {
    border-bottom: 1px solid #d1d4d7;
  }

  ${ThumbnailImage}, ${MissingImage} {
    margin-right: 1em;
  }
`;

export default GameVersion;
