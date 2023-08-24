import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addCompletedOrder } from "../features/cartSlice"
import { toast } from "react-toastify"

const ShippingForm = ({
  selectedItems,
  setShowShippingForm,
  setSelectedItems,
}) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleSubmit = (e) => {
    e.preventDefault()
    const shippingInfo = {
      userId: user.id,
      firstName: user.name,
      lastName,
      address,
      selectedItems,
      totalCheckedPrice,
    }

    console.log(shippingInfo)
    toast.success("The order has been successfully completed!")
    toast.info("You can see the order history by clicking on the green button")

    setFirstName("")
    setLastName("")
    setAddress("")

    setSelectedItems([])
    setShowShippingForm(false)

    dispatch(addCompletedOrder(shippingInfo))
  }

  const checkedItems = selectedItems.filter((item) => item.isChecked)

  const totalCheckedPrice = checkedItems.reduce(
    (total, item) => total + item.amount * item.price,
    0
  )

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-light-blue-100">
      <h2>Shipping Form</h2>
      <form
        className="mt-4 border-2 border-red-500 w-2/3 rounded-lg p-4 bg-white overflow-auto mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-600 font-semibold text-base"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border border-black rounded  mt-1 text-base"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-600 font-semibold text-base"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border border-black rounded mt-1 text-base"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-600 font-semibold text-base"
          >
            Address
          </label>
          <textarea
            id="address"
            rows="2"
            className="w-full border border-black rounded mt-1 resize-none text-base"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="border border-black text-base">
          Items for order:
          <ul className="text-sm text-start">
            {selectedItems.map((item, index) => (
              <li
                className="flex flex-col border border-black m-1 p-1"
                key={index}
              >
                <div className="flex items-center ">
                  <span className="font-semibold mr-1">Name:</span>
                  <span className="text-red-500">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Amount:</span>
                  <span className="text-red-500">{item.amount}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Size:</span>
                  <span className="text-red-500">{item.selectedSize}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">Color:</span>
                  <span className="text-red-500">{item.selectedColor}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-base text-start">
            Method of payment:{" "}
            <span className="text-red-500">Uponcollection</span>
          </p>
        </div>
        <div className="text-base text-start">
          Total Price:
          <span className="text-red-500"> {totalCheckedPrice}$</span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setShowShippingForm(false)}
            className="bg-red-400 text-white text-sm rounded mt-1 border border-black hover:bg-red-200 p-1"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="bg-green-400 text-white border border-black text-sm  rounded mt-1 hover:bg-green-200 p-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShippingForm
