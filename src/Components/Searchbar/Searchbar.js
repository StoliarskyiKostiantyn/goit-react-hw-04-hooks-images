import React, { useState } from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";
export default function Searchbar({ onSubmit }) {
  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={onSubmit} name="search" className={s.SearchForm}>
          <input
            type="text"
            name="search"
            className={s.SearchForm_input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></input>
          <button type="submit" className={s.SearchForm_button}></button>
        </form>
      </header>
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
