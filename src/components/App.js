import React, { useState } from 'react';
import _ from 'lodash';
import { Spin, Alert, Input, Empty, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MovieList from './MovieList/MovieList';
import MoviesService from '../API/MoviesService';




function App() {

  const [options, setOptions] = useState(
    {
      movies: [],
      searchTerm: 'return',
      pageSize: 20,
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      toSearch: false,
      loading: false,
      error: false,
    }
  );


  const moviesService = new MoviesService();



  const getMovies = (terms, pageNumber = 1) => {

    if (terms) {
      setOptions({
        ...options, loading: true
      })

      moviesService.getTermsMovies(terms, pageNumber)
        .then(data => {
          console.log(data);
          setOptions({
            ...options,
            movies: [...data.results],
            totalResults: data.total_results,
            loading: false,
            toSearch: true
          })
        })
        .catch(() => {
          setOptions({ ...options, error: true, loading: false })
        })
    }
  }







  // useEffect(() => {
  //   getMovies();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;



  return (
    <div className="container">
      <Input
        placeholder="Найти фильм"
        style={{ marginBottom: 50 }}
        onChange={_.debounce((evt) => getMovies(evt.target.value.trim()), 500)}
      />
      {
        options.loading
          ? <Spin indicator={antIcon} />
          : null
      }
      {
        options.error
          ? <Alert message="Ошибка" description="Что-то пошло не так. Повторите попытку позже!!!" type="error" showIcon />
          : null
      }
      {
        !options.movies.length && options.toSearch
          ? <Empty description={<span>Фильм не найден!</span>} />
          : null
      }
      {
        options.movies.length
          ? <div>
            <MovieList movies={options.movies} />
            <Pagination
              style={{ display: 'flex', justifyContent: "center", marginTop: 30 }}
              defaultCurrent={1}
              total={options.totalResults}
              defaultPageSize={options.pageSize}
              onChange={(page) => getMovies(options.searchTerm, page)}
            />
          </div>
          : null
      }


    </div>
  );
}

export default App;