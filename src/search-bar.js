//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

function UnstyledSearchBar({ className, query, handleSearch }) {
  return (
    <label className={className}>
      Spiel suchen: <input type="search" placeholder="Spieltitel" value={query} onChange={handleSearch} />
    </label>
  );
}

const SearchBar = styled(UnstyledSearchBar)`
  padding: 0.5rem;
  display: block;
  height: 2rem;
  background: #3f3a60;
  color: white;

  input {
    border: 1px solid #ccc;
    height: 2rem;
    border-radius: 0.125rem;
    margin-left: 0.5rem;
    padding: 0 0.5rem;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    border-color: #09f;
    box-shadow: 0 0 3px #8cf;
  }
`;

export default SearchBar;
