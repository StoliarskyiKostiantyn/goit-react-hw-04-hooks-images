import "./App.css";
import React, { useState } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Loaders from "./Components/Loader/Loader";
export default function App() {
  const [search, setSearch] = useState("");
  const [loaderAreShown, setLoaderAreShown] = useState(false);
  const handleSubmit = (evt) => {
    const inputValue = evt.target[0].value;
    setLoaderAreShown(true);
    evt.preventDefault();
    if (inputValue.trim() === "") {
      alert("Введите ключевое слово для поиска картинок");
      return;
    }
    setSearch(inputValue);
    evt.target[0].value = "";
  };
  const hideLoader = () => {
    setLoaderAreShown(false);
  };
  const showLoader = () => {
    setLoaderAreShown(true);
  };
  const searchCheck = search === "";
  return (
    <>
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {loaderAreShown && <Loaders />}
        {!searchCheck && (
          <ImageGallery search={search} hideLoader={hideLoader} />
        )}
      </div>
    </>
  );
}
