import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharedState } from '../../types/movie';


const initialState: SharedState = {
  activeIndex: 0
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    }
  },
});

export const { setActiveIndex } = sharedSlice.actions;

export default sharedSlice.reducer;
