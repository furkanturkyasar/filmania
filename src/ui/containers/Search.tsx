import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search, {SearchProps} from '../components/Search';
import { RootState } from '../../app/store';
import { MultiMediaParam } from '../../types/shared';
import { fetchMultiMediasAction } from '../../features/shared/sharedActions';
import { addMovieToListRequestAction} from '../../features/movies/moviesActions';
import { getAuth } from "firebase/auth";


const SearchContainer = ({navigation}: any) => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex);

  const mediaList = useSelector((state: RootState) => state.shared.multiMedias);
  const pageInfo = useSelector((state: RootState) => state.shared.pagedInfo);

  function onGetMedia(param: MultiMediaParam) {
    return dispatch(fetchMultiMediasAction(param));
  }
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  function onAddMedia(movieId: string) {
    if (userId) {
      //return dispatch(addMovieToListRequestAction(userId, movieId));
    }
    else 
      console.log("User is not authenticated!")
  }

  return <Search mediaList={mediaList} onGetMedia={onGetMedia} pageInfo={pageInfo} navigation={navigation} />;
};

export default SearchContainer;