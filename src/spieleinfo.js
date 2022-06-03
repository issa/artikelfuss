//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";
import { useAsync } from "react-async-hook";
import cogoToast from "cogo-toast";

import { findThing } from "./api";

const CopyClipboard = styled(function(props) {
  async function copyClipboard() {
    const result = await navigator.clipboard.writeText(props.value);
    console.log(result);
    cogoToast.success("Artikelfuß in die Zwischenablage kopiert");
  }

  return (
    <span className={props.className} onClick={copyClipboard}>
      <svg
        viewBox="0 0 14 16"
        version="1.1"
        width="28"
        height="32"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
        ></path>
      </svg>
    </span>
  );
})`
  appearance: none;

  background-color: #eff3f6;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);

  border-radius: 0.25em;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  padding: 3px 10px;
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  &:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
    background-position: -0.5em;
    border-color: rgba(27, 31, 35, 0.35);
  }

  &:active {
    background-color: #e9ecef;
    background-image: none;
    border-color: rgba(27, 31, 35, 0.35);
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
  }

  svg {
    vertical-align: middle;
  }
`;

const Spieleinfo = styled(function(props) {
  const asyncGame = useAsync(findThing, [props.gameID, "thing"]);

  const artikelfuss = () => {
    const {
      links,
      minplayers,
      maxplayers,
      minplaytime,
      maxplaytime,
      minage
    } = asyncGame.result;
    const version = props.version;

    const designers = links.boardgamedesigner.map(p => p.name);
    const artists = links.boardgameartist.map(p => p.name);
    const publishers = version.links.boardgamepublisher.map(p => p.name);

    const join = people => {
      if (people.length === 2) {
        return people.join(" und ");
      } else {
        return people.join(", ");
      }
    };

    const numPlayers =
      minplayers !== maxplayers
        ? `${minplayers} – ${maxplayers}`
        : `${minplayers}`;
    const playtime =
      minplaytime !== maxplaytime
        ? `${minplaytime} – ${maxplaytime}`
        : `${minplaytime}`;

    const age = (minage && +minage !== 0) ? ` ab ${minage} Jahren` : ``;

    return `${join(designers)}: ${version.linkedname.toUpperCase()} für ${numPlayers} Personen${age} mit Illustration von ${join(artists)} bei ${join(publishers)} ${version.yearpublished}, Spieldauer ${playtime} Minuten`;
  };

  function selectWhole(event) {
    event.target.select();
  }

  return (
    <footer className={props.className}>
      {asyncGame.result && props.version && (
        <>
          <input type="text" value={artikelfuss()} onClick={selectWhole} />
          <CopyClipboard value={artikelfuss()} />
        </>
      )}
    </footer>
  );
})`
  background: #ddd;
  padding: 0;
  display: flex;

  input {
    flex-grow: 1;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    font-style: italic;

    min-height: 28px;
    padding: 3px 8px;
    font-size: 20px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export default Spieleinfo;
