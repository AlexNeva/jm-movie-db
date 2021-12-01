import React, { useEffect, useState } from 'react';
import MovieList from './MovieList/MovieList';


function App() {

  const [options, setOptions] = useState(
    {
      movies: [],
      searchTerm: 'return',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
  );

  const API_KEY = '7d69d7ca3c0fc515994ec1af1752bd66';



  const getMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${options.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setOptions({
          ...options, movies: [...data.results], totalResults: data.total_results
        })
      })
  }





  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





  return (
    <div className="container">
      <MovieList movies={options.movies} />
    </div>
  );
}

export default App;