import React, { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    sarch: '',
  };
  render() {
    return (
      <>
        <header className={s.Searchbar}>
          <form
            onSubmit={this.props.onSubmit}
            className={s.SearchForm}
          >
            <input
              type="text"
              name="picName"
              value={this.state.search}
              className={s.SearchForm_input}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            ></input>
            <button
              type="submit"
              className={s.SearchForm_button}
            ></button>
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
