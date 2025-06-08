import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { TagType } from '@/src/shared/types/Todo';

export const Slice = createSlice({
  name: 'redux',
  initialState: {
    value: 0,
    isShowTagModal: false,
    tagList: [] as TagType[],
    date: dayjs(),
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
    },
    setAddDate: (state) => {
      console.log('setAddDate', state.date);
      state.date = state.date.add(1, 'day')
    },
    setMinusDate: (state) => {
      console.log('setMinusDate', state.date);
      state.date = state.date.add(-1, 'day')
    },
    setDate: (state, action) => {
      console.log('setDate', action.payload);
      state.date = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  setTagModal,
  setTagList,
  setMainTag,
  setAddDate,
  setMinusDate,
  setDate
} = Slice.actions;
export default Slice.reducer;
