import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardList, {CardListProps} from '../components/CardList';
import { RootState } from '../../app/store';

const CardListContainer = ({hasTopTen}: any) => {

  //movies
  const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);
  const nowPlayingMovies = useSelector((state: RootState) => state.movies.nowPlayingMovies);

  //tv
  const trendingTv = useSelector((state: RootState) => state.tv.trendingTv);
  const nowPlayingTv = useSelector((state: RootState) => state.tv.nowPlayingTv);

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex);

  let title: string = "";
  
  if (hasTopTen) 
    title = `Haftanın Top 10 ${activeIndex === 0 ? "Film" : "Dizi"} Listesi`
  else
    title = `Gösterimdeki ${activeIndex === 0 ? "Filmler" : "Diziler"}`


  return <CardList activeIndex={activeIndex} title={title} hasTopTen={hasTopTen} trendingMovies={trendingMovies} nowPlayingMovies={nowPlayingMovies} trendingTv={trendingTv} nowPlayingTv={nowPlayingTv} />;
};

export default CardListContainer;
