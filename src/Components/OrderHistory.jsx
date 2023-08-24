import React from "react"
import { useSelector } from "react-redux"

const OrderHistory = ({ onClose }) => {
  const completedOrders = useSelector((state) => state.cart.completedOrders)

  const userId = JSON.parse(localStorage.getItem("user")).id

  const userOrders = completedOrders.filter((order) => order.userId === userId)

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-0 text-white hover:text-gray-700 focus:outline-none border border-red-500 rounded-lg bg-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <h2 className="font-bold text-lg mb-4 ">Order History</h2>
          <div className="overflow-y-scroll max-h-[400px]">
            {userOrders?.map((order, index) => (
              <div
                key={index}
                className="mb-2 border border-gray-500 scroll bg-blue-gray-100 rounded-xl flex flex-col items-start p-2"
              >
                <p className="text-red-500 font-medium font-serif text-lg">
                  Order {index + 1}
                </p>
                <p>
                  First Name:{" "}
                  <span className="text-red-500">{order.firstName}</span>
                </p>
                <p>
                  Last Name:{" "}
                  <span className="text-red-500">{order.lastName}</span>///
                </p>
                <p>
                  Address: <span className="text-red-500">{order.address}</span>
                </p>
                <div>
                  <ul>
                    {order?.selectedItems?.map((item) => (
                      <div>
                        <li className="text-start">
                          Product name:{" "}
                          <span className="text-red-500">{item.name}</span>
                        </li>
                      </div>
                    ))}
                  </ul>
                  <p className="text-start">
                    Total Price:{" "}
                    <span className="text-red-500">
                      {order.totalCheckedPrice}
                    </span>
                    $
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
