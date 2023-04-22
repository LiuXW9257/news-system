import { getUserListByRoleCondition } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUserList = createAsyncThunk(
  'fetchUserList',
  (condition, { dispatch }) => {
    getUserListByRoleCondition(condition).then(res => {
      dispatch(updateUserList(res.data))
    })
  }
)

const userSlice = createSlice({
  name: 'userManage',
  initialState:{
    userList:[],
  },
  reducers:{
    updateUserList:(state, { payload })=>{
      state.userList = payload
    }
  }
})

export const { updateUserList } = userSlice.actions
export default userSlice.reducer