//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

const Spieleinfo = styled(function(props) {
  return (
    <div className={props.className}>
      <span>Ergebnis</span>
    </div>
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
