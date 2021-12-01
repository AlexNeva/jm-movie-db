import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import MovieItem from '../MovieItem/MovieItem';

function MovieList({ movies }) {
  return (
    <Row gutter={[35, 35]}>
      {
        movies.map(movie => (
          <Col span={12} key={movie.id}>
            <MovieItem movie={movie} />
          </Col>
        ))
      }
    </Row>
  );
}

MovieList.defaultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default MovieList;