import { configureStore } from '@reduxjs/toolkit'
import userReduser from "../features/user/userSlice";

export default configureStore({
  reducer: {
      user: userReduser
    },
})