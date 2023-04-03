// login

const getMoviesFromApi = (filters) => {
  console.log('Se están pidiendo las películas de la app', filters.genre, filters.sort);


  return fetch(`http://localhost:4000/movies?genre=${filters.genre}`)
    .then(response => response.json())
    .then((data) => {

      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
