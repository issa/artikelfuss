//; -*- mode: rjsx;-*-
import React from "react";
import styled from "styled-components/macro";

function UnstyledSearchBar({ className, query, handleSearch }) {
  return (
    <label className={className}>
      Suchen: <input type="search" value={query} onChange={handleSearch} />
    </label>
  );
}

const SearchBar = styled(UnstyledSearchBar)`
  padding: 0.5em;
  display: block;
  height: 2em;
  background: #3f3a60;
  color: white;

  input {
    border: 1px solid #ccc;
    height: 2rem;
    border-radius: 0.125rem;
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
