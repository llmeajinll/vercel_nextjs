import { createSlice } from '@reduxjs/toolkit';

import { TagType } from '@/src/shared/types/Todo';
export const Slice = createSlice({
  name: 'redux',
  initialState: {
    value: 0,
    isShowTagModal: false,
    tagList: [] as TagType[],
    mainTag: {
      _id: '',
      tag: '',
      color: ''
    }
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setTagModal: (state, action) => {
      state.isShowTagModal = action.payload;
    },
    setTagList: (state, action) => {
      state.tagList = [...action.payload]
    },
    setMainTag: (state, action) => {
      state.mainTag = {...action.payload}
    }
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setTagModal, setTagList, setMainTag } = Slice.actions;
export default Slice.reducer;
