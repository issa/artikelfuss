//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

function FoundGame({ className, game = {}, active, onClick }) {
  const { name } = game;

  return (
    <li className={className} onClick={onClick}>
      {name}
    </li>
  );
}

const StyledFoundGame = styled(FoundGame)`
  margin-left: 0;
  padding-left: 1em;
  line-height: 2em;
  height: 2em;
  border-bottom: 1px solid #d1d4d7;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  cursor: pointer;
  background-color: ${props => (props.active ? "#ddd" : "inherit")};

  &:first-child {
    border-top: 1px solid #d1d4d7;
  }

  &:hover {
    background: #ccc;
  }
`;

export default StyledFoundGame;
