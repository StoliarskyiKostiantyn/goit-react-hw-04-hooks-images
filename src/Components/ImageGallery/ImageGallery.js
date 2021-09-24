import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import api from "../../services/imgAPI";
export default function ImageGallery({ search, hideLoader }) {
  const [page, setPage] = useState(1);
  const [modalUrl, setModalUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [response, setResponse] = useState([]);

  let mainPage = page;
  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const openModal = (evt) => {
    if (evt.target.nodeName === "IMG") {
      setModalIsOpen(true);
      setModalUrl(evt.target.dataset.big_image);
    }
  };
  const closeModal = (evt) => {
    if (evt.target.nodeName === "DIV" || evt.code === "Escape") {
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    const list = document.querySelector("ul");
    list.addEventListener("click", openModal);
    return () => {
      list.removeEventListener("click", openModal);
    };
  }, []);
  useEffect(() => {
    mainPage = 1;
    setResponse([]);
    fetchImagesByName();
  }, [search]);
  const fetchImagesByName = () => {
    const errorMessage = `Изображений по ключевому слову ${search} не найдено`;
    return api
      .fetchImg(search, page)
      .then((data) => {
        if (data.hits.length === 0) {
          return Promise.reject(new Error(errorMessage));
        }
        return setResponse((response) => [...response, ...data.hits]);
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        hideLoader();
      });
  };

  return (
    <>
      <div>
        <ul className={s.ImageGallery}>
          {response.map((item) => {
            const { webformatURL, tags, largeImageURL } = item;
            return (
              <ImageGalleryItem
                key={webformatURL}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                openModal={(evt) => openModal(evt)}
                hideLoader={hideLoader}
                search={search}
                setPage={setPage}
                page={page}
                scroll={scroll}
              />
            );
          })}
        </ul>
      </div>
      <Button onClick={() => setPage((page) => page + 1)} />
      {modalIsOpen && (
        <Modal url={modalUrl} closeModal={(evt) => closeModal(evt)} />
      )}
    </>
  );
}
ImageGallery.propTypes = {
  hideLoader: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
