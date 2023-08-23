import "./App.css"
import ItemsList from "./Components/ItemsList"
import Main from "./Components/Main"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AboutItem from "./Components/AboutItem"
import Login from "./Components/Login"
import React, { useState } from "react"
import { selectIsLoggedIn } from "./features/authSlice"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isLoggedIn ? <Main /> : <Login />} />
          <Route path="/items/:type" element={<ItemsList />} />
          <Route path="/item/:type/:id" element={<AboutItem />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
