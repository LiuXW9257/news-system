import { configureStore } from "@reduxjs/toolkit";

import topHeaderReducer from "./modules/top-header";
import rightManageReducer from "./modules/right-manage";
import userManageReducer from "./modules/user-manage"
import adminPersonalCenterReducer from "./modules/admin-personal-center";

export default configureStore({
  reducer:{
    topHeader: topHeaderReducer,
    rightManage: rightManageReducer,
    userManage: userManageReducer,
    adminPersonalCenter: adminPersonalCenterReducer
  },
})