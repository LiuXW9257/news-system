import { getRightList, getRoleList } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRightList = createAsyncThunk(
  'fetchRightList',
  (condition, {dispatch}) => {
    getRightList().then(res => {
      dispatch(updateRightList(res.data))
    })
  }
)

export const fetchRoleList = createAsyncThunk(
  '/fetchRoleList',
  (condition, {dispatch}) => {
    getRoleList().then(res => {
      dispatch(updateRoleList(res.data))
    })
  }
)

const rightManageSlice = createSlice({
  name: 'rightManage',
  initialState:{
    rightList: [],
    roleList: [],
  },
  reducers: {
    updateRightList: (state, { payload }) => {
      state.rightList = payload
    },
    updateRoleList: (state, { payload }) => {
      state.roleList = payload
    },
  }
})

export const { updateRightList, updateRoleList } = rightManageSlice.actions

export default rightManageSlice.reducer