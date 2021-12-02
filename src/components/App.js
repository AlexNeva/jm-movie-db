import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MovieList from './MovieList/MovieList';
import MoviesService from '../API/MoviesService';



function App() {

  const [options, setOptions] = useState(
    {
      movies: [],
      searchTerm: 'return',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      loading: true,
    }
  );

  // const API_KEY = '7d69d7ca3c0fc515994ec1af1752bd66';

  const moviesService = new MoviesService();



  const getMovies = () => {
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${options.searchTerm}`)
    //   .then(data => data.json())
    //   .then(data => {
    //     console.log(data);
    //     setOptions({
    //       ...options, movies: [...data.results], totalResults: data.total_results
    //     })
    //   })
    moviesService.getTermsMovies(options.searchTerm)
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

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;



  return (
    <div className="container">
      {
        options.loading ? <MovieList movies={options.movies} /> : <Spin indicator={antIcon} />
      }
    </div>
  );
}

export default App;