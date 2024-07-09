import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, SharedState } from '../../types/movie';

const initialState: SharedState = {
  activeIndex: 0,
  bookmarkList: [],
  multiMedias: [],
  pagedInfo: {}
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
    SetBookmarkList: (state, action: PayloadAction<Media>) => {
      state.bookmarkList = [...state.bookmarkList, action.payload]
    },
    getMultiMedias: (state, action: PayloadAction<any>) => {
      state.multiMedias = action.payload.results
      state.pagedInfo = action.payload
    }
  },
});

export const { setActiveIndex, getMultiMedias } = sharedSlice.actions;

export default sharedSlice.reducer;
