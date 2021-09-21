import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import api from '../../services/imgAPI';
export default class ImageGallery extends Component {
  state = {
    page: 1,
    modalUrl: '',
    modalIsOpen: false,
    response: [],
    error: null,
  };
  componentDidMount() {
    const list = document.querySelector('ul');
    const { openModal } = this.props;
    this.fetchImagesByName();
    list.addEventListener('click', openModal);
  }
  componentDidUpdate(prevProps, prevState) {
    const { search, scroll } = this.props;
    const { page } = this.state;
    if (prevProps.search !== search) {
      this.setState({
        response: [],
      });
      this.fetchImagesByName();
    }
    if (prevState.page !== page) {
      this.fetchImagesByName().then(scroll);
    }
  }
  componentWillUnmount() {
    const list = document.querySelector('ul');
    const { openModal } = this.props;
    list.removeEventListener('click', openModal);
  }
  fetchImagesByName = () => {
    const API_KEY = '21885958-186cb9f8de90f78c5ca194f62';
    const { search, page } = this.props;
    const errorMessage = `Изображений по ключевому слову ${search} не найдено`;
    return api
      .fetchImg(search, page)
      .then(data => {
        if (data.hits.length === 0) {
          return Promise.reject(new Error(errorMessage));
        }
        return this.setState(prevState => ({
          response: [...prevState.response, ...data.hits],
        }));
      })
      .catch(error => alert(error.message))
      .finally(() => {
        this.props.hideLoader();
      });
  };
  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  increasePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  openModal = evt => {
    if (evt.target.nodeName === 'IMG') {
      this.setState({
        modalIsOpen: true,
        modalUrl: evt.target.dataset.big_image,
      });
    }
  };

  closeModal = evt => {
    if (
      evt.target.nodeName === 'DIV' ||
      evt.code === 'Escape'
    ) {
      this.setState({
        modalIsOpen: false,
      });
    }
  };
  render() {
    const { modalIsOpen, modalUrl, page } = this.state;
    const { search, hideLoader } = this.props;

    return (
      <>
        <div>
          <ul className={s.ImageGallery}>
            {this.state.response.map(item => {
              const {
                id,
                webformatURL,
                tags,
                largeImageURL,
              } = item;
              return (
                <ImageGalleryItem
                  id={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  largeImageURL={largeImageURL}
                  openModal={this.openModal}
                  hideLoader={hideLoader}
                  search={search}
                  page={page}
                  scroll={this.scroll}
                />
              );
            })}
          </ul>
        </div>
        <Button onClick={this.increasePage} />
        {modalIsOpen && (
          <Modal
            url={modalUrl}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  hideLoader: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  hideLoader: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
