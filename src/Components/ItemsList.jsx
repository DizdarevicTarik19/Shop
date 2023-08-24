import React from "react"
import { useParams } from "react-router-dom"
import SingleItem from "./SingleItem"
import { storeData } from "../assets/data/dummyData"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setItems } from "../features/itemsSlice"
import { useState } from "react"

const ItemsList = () => {
  const { type } = useParams()
  const dispatch = useDispatch()
  const allItems = [...storeData]

  const [colorFilter, setColorFilter] = useState("")
  const [sizeFilter, setSizeFilter] = useState("")

  dispatch(setItems(allItems))
  const itemsOfType = allItems?.filter((item) => item.type === type)

  const filteredItems = itemsOfType.filter((item) => {
    const colorMatches = item.color.find((color) =>
      color.toLowerCase().includes(colorFilter.toLowerCase())
    )

    const sizeMatches = item?.size?.find((size) =>
      size.toLowerCase().includes(sizeFilter.toLowerCase())
    )

    return colorMatches && (sizeMatches || !item.size)
  })

  return (
    <div>
      <h2 className="font-bold text-lg text-light-blue-500 bg-light-blue-100 mb-4 inline-block border border-light-blue-900 rounded-lg p-2 mt-2 tracking-wide w-48">
        {type}
      </h2>
      <div className="flex justify-center">
        <input
          className="text-base m-2 text-center text-light-blue-500 placeholder:text-black bg-light-blue-100 mb-4 inline-block border border-light-blue-900 rounded-lg p-2 mt-2 tracking-wide w-48"
          type="text"
          placeholder="Search by color"
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
        />
        <input
          className=" text-base text-center text-light-blue-500 placeholder:text-black bg-light-blue-100 mb-4 inline-block border border-light-blue-900 rounded-lg p-2 mt-2 tracking-wide w-48"
          type="text"
          placeholder="Search by size"
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-8">
        {filteredItems?.map((item, index) => (
          <div key={index} className="ml-4">
            <Link to={`/item/${type}/${item.id}`}>
              <SingleItem item={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemsList
