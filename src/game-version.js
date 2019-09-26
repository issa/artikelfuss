//; -*- mode: rjsx;-*-
import React, { useMemo, useState } from "react";
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

  &:first-child {
    margin-top: 1em;
  }

  &:not(:last-child) {
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #d1d4d7;
  }

  ${ThumbnailImage}, ${MissingImage} {
    margin-right: 1em;
  }
`;

export default GameVersion;
