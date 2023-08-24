import "./App.css"
import ItemsList from "./Components/ItemsList"
import Main from "./Components/Main"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AboutItem from "./Components/AboutItem"
import Login from "./Components/Login"
import React from "react" // Uklonuto useState jer se ne koristi
import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectIsAdmin } from "./features/authSlice" // Dodano selectIsAdmin
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AllOrders from "./Components/AllOrders"

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isAdmin = useSelector(selectIsAdmin)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
          />
          <Route path="/items/:type" element={<ItemsList />} />
          <Route path="/item/:type/:id" element={<AboutItem />} />
          <Route
            path="/admin/orders"
            element={isAdmin ? <AllOrders /> : <Navigate to="/" />}
          />
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
