import React from 'react';
import PropTypes from 'prop-types';
import './MovieItem.css';
import { Card, Tag } from 'antd';
import { format } from 'date-fns'


function MovieItem({ movie }) {
  const { Meta } = Card;

  // const date = format(new Date(movie.release_date), 'dd.MM.yyyy')

  const truncate = (str, num, useWordBoundary) => {
    if (str.length <= num) { return str; }
    const subString = str.substr(0, num - 1); // the original check
    return useWordBoundary ? `${subString.substr(0, subString.lastIndexOf(" "))}...` : `${subString}...`;
  }

  // console.log(new Date(movie.release_date));
  // console.log(date);

  return (

    <Card className="movie-card"

      style={{ width: "100%" }}
      cover={<img alt="movie preview" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />}
    >
      <Meta title={movie.title} />
      <div className="movie-card__date">
        {/* {movie.release_date} */}
        {format(new Date(movie.release_date), 'LLLL d, yyyy')}
      </div>
      <div className="movie-card__tags">
        <Tag>tag</Tag>
        <Tag>tag</Tag>
        <Tag>tag</Tag>

      </div>
      <p className="movie-card__descr">
        {truncate(movie.overview, 150, true)}
      </p>
    </Card>
  );
}

MovieItem.defaultProps = {
  movie: {}
};

MovieItem.propTypes = {
  movie: PropTypes.objectOf(PropTypes.object),
};


export default MovieItem;