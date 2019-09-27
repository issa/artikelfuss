//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";
import { useAsync } from "react-async-hook";

import { findThing } from "./api";

const Spieleinfo = styled(function(props) {
    const asyncGame = useAsync(findThing, [props.gameID, 'thing']);

    const artikelfuss = () =>  (
        <span>
          {asyncGame.result.links.boardgamedesigner.map(person => person.name).join(', ')}
          {": "}
          {props.version.linkedname.toUpperCase()}
          {" "}
          für {asyncGame.result.minplayers} bis {asyncGame.result.maxplayers} Spieler
          mit Illustrationen/Grafik von {asyncGame.result.links.boardgameartist.map(person => person.name).join(', ')}
          {" bei "}
          {props.version.links.boardgamepublisher.map(person => person.name).join(', ')}
          {" "}
          {props.version.yearpublished}
          {",  Spieldauer "}
          {asyncGame.result.minplaytime} – {asyncGame.result.maxplaytime} Minuten
        </span>
    )

  return (
    <footer className={props.className}>
        { asyncGame.result && props.version ? artikelfuss() : null }

    </footer>
  );
})`
  background: #ddd;
  padding: 1em;
  span {
    max-width: 40em;
    font-style: italic;
  }
`;

export default Spieleinfo;
