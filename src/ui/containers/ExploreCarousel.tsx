import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExploreCarousel, { ExploreCarouselProps } from '../components/ExploreCarousel';
import { RootState } from '../../app/store';

const ExploreCarouselContainer = () => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex); 

  return <ExploreCarousel activeIndex={activeIndex}   />;
};

export default ExploreCarouselContainer;
