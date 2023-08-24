import { useSelector } from "react-redux"
import { removeFromCart, toggleCheckbox } from "../features/cartSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"
import ShippingForm from "./ShippingForm"
import { useEffect } from "react"
import { clearSelectedItems } from "../features/cartSlice"
import { toast } from "react-toastify"

const ShoppingCart = ({ setIsModalOpen }) => {
  const [showShippingForm, setShowShippingForm] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const [isAtLeastOneChecked, setIsAtLeastOneChecked] = useState(false)

  const handleCheckboxChange = (index) => {
    dispatch(toggleCheckbox(index))
    const hasAtLeastOneChecked = cart.some((item) => item.isChecked)
    setIsAtLeastOneChecked(hasAtLeastOneChecked)
  }

  const handleBuyNow = () => {
    const selected = cart.filter((item) => item.isChecked)

    const hasAtLeastOneChecked = selected.length > 0
    if (hasAtLeastOneChecked) {
      setSelectedItems(selected)
      setShowShippingForm(true)
    } else {
      toast.error("Select at least one item before proceeding.")
    }
  }

  useEffect(() => {
    if (selectedItems.length > 0) {
      const selectedIds = selectedItems.map((item) => item.id)
      dispatch(clearSelectedItems(selectedIds))
      setShowShippingForm(true)
    }
  }, [selectedItems])

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item))
    toast.success("Item removed from cart successfully!")
  }

  const userId = JSON.parse(localStorage.getItem("user")).id

  const userCartItems = cart.filter((item) => item.userId === userId)

  const totalCartPrice = userCartItems.reduce(
    (total, item) => total + item.amount * item.price,
    0
  )

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 ">
      {!showShippingForm && (
        <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow dark:bg-gray-700 relative overflow-y-auto max-h-[80vh]">
          <div className="relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 m-0 text-white hover:text-gray-700 focus:outline-none rounded-lg border border-red-500 bg-red-500"
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

          <div>
            {userCartItems.length > 0 ? (
              <div className="flex flex-col">
                <p className="font-sans font-bold text-black-600 text-xl text-start">
                  Shopping Bag
                </p>

                {userCartItems.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-start p-4 border border-black rounded-lg shadow-md mb-2"
                    >
                      <div className="flex items-start flex-col max-w-[200px]">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-44 h-40 object-cover rounded-lg mr-4 flex-shrink-0"
                        />
                        <p className="font-medium text-base text-red-600 text-center">
                          {item.name}
                        </p>
                        <p className="text-xs text-start text-gray-700">
                          {item.text}
                        </p>
                      </div>
                      <div className="h-full flex items-start justify-center flex-col max-w-[200px]">
                        <p className="font-serif text-gray-700">
                          Selected size:{" "}
                          <span className="text-red-500">
                            {item.selectedSize}
                          </span>{" "}
                        </p>
                        <p className="font-serif text-gray-700 flex items-center">
                          Selected color:
                          <span
                            className="w-3 h-3 rounded-full ml-2"
                            style={{ backgroundColor: item.selectedColor }}
                          ></span>
                        </p>
                        <p className="font-serif text-gray-700">
                          Amount:{" "}
                          <span className="text-red-500">{item.amount}</span>{" "}
                        </p>
                        <p className="font-serif text-gray-700">
                          Single item price:{" "}
                          <span className="text-red-500"> {item.price}$</span>{" "}
                        </p>
                        <p className="font-serif  text-gray-700">
                          Total item price:{" "}
                          <span className="text-red-500">
                            {" "}
                            {item.amount * item.price}$
                          </span>
                        </p>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            className="bg-red-500 text-white border border-red-700 rounded px-4 py-1 text-xs hover:bg-red-600 mt-1 flex items-center"
                          >
                            Remove
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4 ml-1"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <span className="text-gray-700">
                            Confirm the order
                          </span>
                          <input
                            type="checkbox"
                            checked={item.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                            className="form-checkbox h-4 w-4 text-green-500"
                          />
                        </label>
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-row items-center  justify-between">
                  <p className="font-sans font-bold text-gray-600 text-start mt-1">
                    Total Price of All Products:
                    <span className="text-red-500"> {totalCartPrice}$</span>
                  </p>
                  <button
                    onClick={handleBuyNow}
                    className="bg-green-400 text-white border border-green-600 rounded px-4 py-1 text-xs hover:bg-green-200 mt-1 relative"
                  >
                    Buy now
                    <span className="absolute right-0.5 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[200px] border border-black rounded-md flex flex-col justify-center items-center text-center ">
                <h2 className="font-sans font-bold text-black-600 text-xl mb-3">
                  Shopping Bag
                </h2>
                <div className="flex flex-col items-center mt-2">
                  <p className="font-sans font-bold text-lg text-red-600 mb-1">
                    Your Bag is empty.
                  </p>
                  <p className="font-sans font-medium text-red-600">
                    Add some items
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showShippingForm && (
        <div className="w-full h-full bg-white absolute inset-0 text-2xl text-black">
          <ShippingForm
            selectedItems={selectedItems}
            totalPrice={totalCartPrice}
            setShowShippingForm={setShowShippingForm}
            setSelectedItems={setSelectedItems}
          />
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
