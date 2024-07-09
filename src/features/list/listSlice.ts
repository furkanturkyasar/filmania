import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, ListState } from '../../types/list';

const initialState: ListState = {
  listDetails: [],
  hasMedia: false
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    getListDetails: (state, action: PayloadAction<Media[]>) => {
        state.listDetails = action.payload;
    },
    hasMedia: (state, action: PayloadAction<boolean>) => {
      state.hasMedia = action.payload;
    }
  },
});

export const { getListDetails, hasMedia } = listSlice.actions;

export default listSlice.reducer;
