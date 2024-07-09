import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainCard, { MainCardProps } from '../components/MainCard';
import { RootState } from '../../app/store';

const MainCardContainer = ({navigation}: any) => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((state: RootState) => state.movies.upcomingMovies);
  const upcomingTv = useSelector((state: RootState) => state.tv.upcomingTv);

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex)

  

  return <MainCard activeIndex={activeIndex} upcomingMovies={upcomingMovies} upcomingTv={upcomingTv} navigation={navigation} />;
};

export default MainCardContainer;
