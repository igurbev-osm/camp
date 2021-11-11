import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    set: (state, user) => {      
      state.value = user;
    }
  },
})

// Action creators are generated for each case reducer function
export const { set } = userSlice.actions

export default userSlice.reducer