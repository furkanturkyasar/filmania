import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainCard, { MainCardProps } from '../components/MainCard';
import { RootState } from '../../app/store';

const MainCardContainer = ({activeIndex}: MainCardProps) => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state: RootState) => state.movies.upcomingMovies);
  const upcomingTv = useSelector((state: RootState) => state.tv.upcomingTv);

  return <MainCard activeIndex={activeIndex} upcomingMovies={upcomingMovies} upcomingTv={upcomingTv} />;
};

export default MainCardContainer;
