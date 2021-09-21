import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
const modalPortal = document.querySelector('#modal-root');
export default class Modal extends Component {
  ref = React.createRef();
  componentDidMount() {
    this.ref.current.addEventListener(
      'click',
      this.props.closeModal,
    );
    window.addEventListener(
      'keydown',
      this.props.closeModal,
    );
  }
  componentWillUnmount() {
    this.ref.current.removeEventListener(
      'click',
      this.props.closeModal,
    );
    window.removeEventListener(
      'keydown',
      this.props.closeModal,
    );
  }
  render() {
    return createPortal(
      <div ref={this.ref} className={s.Overlay}>
        <img src={this.props.url} alt="" />
      </div>,
      modalPortal,
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
