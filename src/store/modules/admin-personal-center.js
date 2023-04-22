import { createSlice } from "@reduxjs/toolkit";

const personalCenterSlice = createSlice({
  name: 'personalCenter',
  initialState: {
    // 人员信息
    adminInfo: {},
    // 权限列表
    rightList: [],
  },
  reducers:{
    updateAdminInfo: (state, { payload }) => {
      state.adminInfo = payload
    },
    updateRightList: (state, { payload }) => {
      state.rightList = payload
    }
  }
})

export const { updateAdminInfo, updateRightList } = personalCenterSlice.actions

export default personalCenterSlice.reducer

