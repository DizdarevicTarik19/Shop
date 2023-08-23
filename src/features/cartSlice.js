// cartSlice.js
import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    completedOrders: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, type, selectedColor, selectedSize } = action.payload
      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.type === type &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      )

      if (existingItem) {
        existingItem.amount += 1
      } else {
        state.cart.push({ ...action.payload, amount: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const { id, type, selectedColor, selectedSize } = action.payload
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.id === id &&
          item.type === type &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      )

      if (existingItemIndex !== -1) {
        if (state.cart[existingItemIndex].amount > 1) {
          state.cart[existingItemIndex].amount -= 1
        } else {
          state.cart.splice(existingItemIndex, 1)
        }
      }
    },
    toggleCheckbox: (state, action) => {
      const index = action.payload
      state.cart[index].isChecked = !state.cart[index].isChecked
    },
    clearSelectedItems: (state, action) => {
      const selectedIds = action.payload
      state.cart = state.cart.filter((item) => !selectedIds.includes(item.id))
    },
    addCompletedOrder: (state, action) => {
      state.completedOrders.push(action.payload)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  toggleCheckbox,
  clearSelectedItems,
  addCompletedOrder,
} = cartSlice.actions

export default cartSlice.reducer
