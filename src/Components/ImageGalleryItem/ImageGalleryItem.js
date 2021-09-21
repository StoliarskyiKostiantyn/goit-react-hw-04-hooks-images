import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem';

export default class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, tags, largeImageURL } =
      this.props;
    return (
      <li key={id} className={s.ImageGalleryItem}>
        <a>
          <img
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
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
