import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { addToCart } from "../features/cartSlice"
import { toast } from "react-toastify"

const AboutItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const items = useSelector((state) => state.items)
  const userId = JSON.parse(localStorage.getItem("user")).id

  const selectedItem = items.find((item) => item.id === id)

  const [color, setColor] = useState(selectedItem?.color[0] || "")
  const [size, setSize] = useState(
    selectedItem.size ? selectedItem?.size[0] || "" : ""
  )

  return (
    <div className="flex justify-center items-center py-10">
      <div className="pl-44 grow-[2]">
        <img
          src={selectedItem?.img}
          className="h-[550px] border border-black rounded-3xl shadow-2xl shadow-blue-gray-500"
          alt={selectedItem?.name}
        />
      </div>
      <div className="grow-[3] text-start">
        <div className="max-w-lg">
          <h5 className="text-2xl font-bold tracking-normal leading-none pb-4">
            {selectedItem?.name}
          </h5>
          <p className="text-orange-500 font-bold tracking-normal leading-none pb-4 ">
            15% OFF
          </p>
          <p className="text-gray-400 font-bold tracking-normal leading-none pb-4 ">
            {selectedItem?.text}
          </p>
          {selectedItem?.size && (
            <div className="pb-4">
              <div>
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pick a size
                </label>
                <select
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                  name="size"
                  id="size"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {selectedItem?.size?.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}
          <div>
            <div className="pb-4">
              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pick a color
                </label>
                <select
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  name="color"
                  id="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {selectedItem?.color.map((color, index) => {
                    return (
                      <option key={index} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        ...selectedItem,
                        userId: userId,
                        selectedColor: color,
                        selectedSize: size,
                      })
                    )
                    toast.success(
                      "The item has been successfully added to the cart!"
                    )
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutItem
