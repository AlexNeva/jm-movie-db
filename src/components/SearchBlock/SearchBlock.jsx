/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Spin, Alert, Input, Empty, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MovieList from '../MovieList/MovieList';


function SearchBlock({ options, getMovies, setMyRatedMovies }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <div>
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
            <MovieList movies={options.movies} setMyRatedMovies={setMyRatedMovies} />
            <Pagination
              style={{ display: 'flex', justifyContent: "center", marginTop: 30 }}
              defaultCurrent={1}
              total={options.totalResults}
              defaultPageSize={options.pageSize}
              onChange={(page) => getMovies(options.searchTerm, page)}
              showSizeChanger={false}
            />
          </div>
          : null
      }
    </div>
  );
}

SearchBlock.defaultProps = {
  options: {},
  getMovies: () => { },
  setMyRatedMovies: () => { },
};

SearchBlock.propTypes = {
  options: PropTypes.objectOf(PropTypes.any),
  getMovies: PropTypes.func,
  setMyRatedMovies: PropTypes.func,
};

export default SearchBlock;