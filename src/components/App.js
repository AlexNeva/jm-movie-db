/* eslint-disable import/no-cycle */
import React, { useState, useEffect, createContext } from 'react';
import { Tabs } from 'antd';
import MoviesService from '../API/MoviesService';
import SessionService from '../API/SessionService';

import SearchBlock from './SearchBlock/SearchBlock';

import RatedBlock from './RatedBlock/RatedBlock';

export const GenresContext = createContext(null)




function App() {
  const moviesService = new MoviesService();
  const sessionService = new SessionService();

  const [movies, setMovies] = useState(
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

  const [sessionId, setSessionId] = useState(null);

  const [ratedMovies, setRatedMovies] = useState([]);

  const [genres, setGenres] = useState([])




  const getMovies = (terms, pageNumber = 1) => {

    if (terms) {
      setMovies({
        ...movies, loading: true,
      })

      moviesService.getTermsMovies(terms, pageNumber)
        .then(data => {
          console.log(data);
          setMovies({
            ...movies,
            movies: [...data.results],
            totalResults: data.total_results,
            loading: false,
            toSearch: true,
            searchTerm: terms
          })
        })
        .catch(() => {
          setMovies({ ...movies, error: true, loading: false })
        })
    }
  }

  const createNewSession = () => {
    sessionService.createSession()
      .then(data => {

        setSessionId(data.guest_session_id)
      })
      .catch((err) => err)
  }

  const getMyRatedMovies = () => {
    sessionService.getRatedFilms(sessionId)
      .then(data => {
        console.log(data.results);
        setRatedMovies(data.results)

      })
      .catch((err) => err)
  }

  const setMyRatedMovies = (movieId, rating) => {
    sessionService.postMovieRating(sessionId, movieId, rating)
  }

  const getAllGenres = () => {
    moviesService.getGenres()
      .then(data => {
        setGenres(data.genres);
        console.log(data.genres);

      })
      .catch((err) => err)
  }



  useEffect(() => {
    createNewSession();
    getAllGenres();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const { TabPane } = Tabs;




  return (
    <div className="container">
      <GenresContext.Provider value={genres}>
        <Tabs defaultActiveKey="1" onTabClick={(key) => key === '2' ? getMyRatedMovies() : null}>
          <TabPane tab="Search" key="1">
            <SearchBlock options={movies} getMovies={getMovies} setMyRatedMovies={setMyRatedMovies} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            <RatedBlock ratedMovies={ratedMovies} setMyRatedMovies={setMyRatedMovies} />
          </TabPane>
        </Tabs>
      </GenresContext.Provider>
    </div>
  );
}

export default App;