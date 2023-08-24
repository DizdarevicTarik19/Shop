import React from "react"
import { useSelector } from "react-redux"

const AllOrders = () => {
  const allOrders = useSelector((state) => state.cart.completedOrders)

  return (
    <div>
      <h2 className="text-red-600 font-medium mt-2 text-xl">All Orders</h2>
      {allOrders.length > 0 ? (
        <ul>
          {allOrders.map((order) => (
            <div className="border border-red-700 p-6 m-6 text-red-600 font-medium">
              <li key={order.id}>
                User ID: <span className="text-black"> {order.userId}</span>
              </li>
              <li>
                First Name:{" "}
                <span className="text-black"> {order.firstName}</span>
              </li>
              <li>
                Last Name: <span className="text-black"> {order.lastName}</span>
              </li>
              <li>
                Address: <span className="text-black"> {order.address}</span>
              </li>
              <li>
                {order?.selectedItems?.map((item) => (
                  <ul>
                    <li>
                      Order ID: <span className="text-black"> {item.id}</span>
                    </li>
                    <li>
                      Order Name:
                      <span className="text-black"> {item.name}</span>
                    </li>
                  </ul>
                ))}
              </li>
              <li>
                Total Price:
                <span className="text-black"> {order.totalCheckedPrice}</span> $
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>Card is empty!</p>
      )}
    </div>
  )
}

export default AllOrders
