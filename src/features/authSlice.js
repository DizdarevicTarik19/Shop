import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    user: JSON.parse(localStorage.getItem("user")) || null,
    username: localStorage.getItem("username") || null,
    isAdmin: JSON.parse(localStorage.getItem("user"))?.isAdmin || null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
      state.username = localStorage.getItem("username") || action.payload.name
      state.isAdmin = action.payload.isAdmin
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
      state.username = null
      state.isAdmin = false
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUsername = (state) => state.auth.username
export const selectIsAdmin = (state) => state.auth.isAdmin

export default authSlice.reducer
