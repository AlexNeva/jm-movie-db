/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import MovieList from '../MovieList/MovieList';

function RatedBlock({ ratedMovies, setMyRatedMovies }) {
  return (
    <div>

      <MovieList movies={ratedMovies} setMyRatedMovies={setMyRatedMovies} />
    </div>
  );
}

RatedBlock.defaultProps = {
  ratedMovies: [],
  setMyRatedMovies: () => { }
};

RatedBlock.propTypes = {
  ratedMovies: PropTypes.arrayOf(PropTypes.object),
  setMyRatedMovies: PropTypes.func
};

export default RatedBlock;