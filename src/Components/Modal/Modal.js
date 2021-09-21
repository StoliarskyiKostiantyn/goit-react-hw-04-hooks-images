import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
const modalPortal = document.querySelector("#modal-root");
export default function Modal({ url, closeModal }) {
  useEffect(() => {
    const backdropRef = document.querySelector(".backdrop");
    backdropRef.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModal);
    return () => {
      backdropRef.removeEventListener("click", closeModal);
      window.removeEventListener("keydown", closeModal);
    };
  });
  return createPortal(
    <div className={s.backdrop}>
      <img src={url} alt="" />
    </div>,
    modalPortal
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
