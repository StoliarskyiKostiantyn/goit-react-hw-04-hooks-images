function fetchImg(search, page) {
  const API_KEY = '21885958-186cb9f8de90f78c5ca194f62';
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    return response.json();
  });
}
const api = { fetchImg };
export default api;
