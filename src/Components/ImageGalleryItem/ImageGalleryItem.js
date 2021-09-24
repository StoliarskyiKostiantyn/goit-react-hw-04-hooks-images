import { Component } from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem";

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL, openModal } = this.props;
    return (
      <li key={webformatURL} className={s.ImageGalleryItem}>
        <a>
          <img
            onClick={openModal}
            src={webformatURL}
            alt={tags}
            data-big_image={largeImageURL}
            className={s.ImageGalleryItem_image}
          />
        </a>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  search: PropTypes.string.isRequired,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
