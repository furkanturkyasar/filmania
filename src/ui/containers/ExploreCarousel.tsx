import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExploreCarousel, { ExploreCarouselProps } from '../components/ExploreCarousel';
import { RootState } from '../../app/store';

const ExploreCarouselContainer = () => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex); 
  const discoverMovies = useSelector((state: RootState) => state.movies.discoverMovies);
  const discoverTv = useSelector((state: RootState) => state.tv.discoverTv);

  let discoverMedia  = discoverMovies;
  if (activeIndex !== 0)
    discoverMedia = discoverTv

  return <ExploreCarousel activeIndex={activeIndex} discoverMedia={discoverMedia}   />;
};

export default ExploreCarouselContainer;
