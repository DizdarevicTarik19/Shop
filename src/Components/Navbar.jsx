import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ShoppingCart from "./ShoppingCart"
import {
  selectUser,
  selectIsLoggedIn,
  selectUsername,
  selectIsAdmin,
} from "../features/authSlice"
import OrderHistory from "./OrderHistory"

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart)
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const username = useSelector(selectUsername)
  const isAdmin = useSelector(selectIsAdmin)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)

  const userId = JSON.parse(localStorage.getItem("user")).id
  const userCartItems = cart.filter((item) => item.userId === userId)

  const cartItemCount = userCartItems.reduce(
    (total, item) => total + item.amount,
    0
  )

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const openOrderHistory = () => {
    setIsOrderHistoryOpen(true)
  }

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate("/admin/orders")
    }
  }

  return (
    <>
      <div className="text-gray-700 flex justify-around text-lg font-medium p-5">
        <div>Shopping online</div>
        <div className="flex items-center">
          <span className="mr-2">
            Welcome, {isLoggedIn ? username || user?.name || "Guest" : "Guest"}
          </span>
          <span
            className="w-4 h-4 rounded-full bg-green-400 cursor-pointer"
            onClick={openOrderHistory}
          ></span>
        </div>
        <div className="flex">
          Shopping Bag
          <button
            onClick={openModal}
            className="text-base font-medium tracking-normal leading-none mr-4 text-center relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 relative"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
              {cartItemCount > 0 && (
                <circle
                  cx="18"
                  cy="6"
                  r="6"
                  className="text-red-500 fill-current"
                />
              )}
              {cartItemCount > 0 && (
                <text
                  x="18"
                  y="6"
                  textAnchor="middle"
                  dy=".15rem"
                  className="text-white text-xs font-sans"
                  style={{ fontSize: "0.7rem" }}
                >
                  {cartItemCount}
                </text>
              )}
            </svg>
          </button>
          <button onClick={handleLogout}>Logout</button>
          <div className="mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
          {isAdmin && (
            <div
              className="flex items-center justify-center ml-3 cursor-pointer"
              onClick={handleAdminClick}
            >
              Admin
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-1"
              >
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path
                  fill-rule="evenodd"
                  d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <ShoppingCart setIsModalOpen={setIsModalOpen} />}
      {isOrderHistoryOpen && (
        <OrderHistory onClose={() => setIsOrderHistoryOpen(false)} />
      )}
    </>
  )
}

export default Navbar
