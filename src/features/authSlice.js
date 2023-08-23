import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    user: JSON.parse(localStorage.getItem("user")) || null,
    username: localStorage.getItem("username") || null, // Dodajte svojstvo za korisničko ime
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload // Sačuvajte informacije o korisniku
      state.username = localStorage.getItem("username") || action.payload.name // Ažurirajte korisničko ime
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
      state.username = null // Resetujte korisničko ime pri odjavi
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUsername = (state) => state.auth.username // Dodajte selektor za korisničko ime

export default authSlice.reducer
