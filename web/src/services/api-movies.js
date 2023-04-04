// login

const getMoviesFromApi = (filters) => {

  return fetch(`http://localhost:4000/movies?genre=${filters.genre}&sort=${filters.sort}`)
    .then(response => response.json())
    .then((data) => {

      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
