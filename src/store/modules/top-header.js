import { createSlice } from "@reduxjs/toolkit";

const topHeader = createSlice({
  name: 'topHeader',
  initialState:{
    // 控制sideMenu 是否展开
    collapsed : false,
  },
  reducers:{
    changeCollapsed: (state, { payload }) => {
      state.collapsed = payload;
    },
  }
})

export const { changeCollapsed } = topHeader.actions

export default topHeader.reducer