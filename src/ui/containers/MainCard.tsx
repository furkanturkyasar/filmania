import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainCard from '../components/MainCard';
import { RootState } from '../../app/store';

const MainCardContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.upcomingMovies);


  return <MainCard upcomingMovies={movies} />;
};

export default MainCardContainer;
