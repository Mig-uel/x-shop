import { createSlice } from '@reduxjs/toolkit/react'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
      localStorage.setItem('userInfo', JSON.stringify(payload))
    },
    removeCredentials: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
  },
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
