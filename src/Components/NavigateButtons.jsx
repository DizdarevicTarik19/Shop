import clothes from "../assets/images/clothes.jpg"
import { Link } from "react-router-dom"

const NavigateButtons = () => {
  const buttons = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ]
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <div className="flex space-x-4">
        {buttons.map((button) => (
          <div
            key={button}
            className="py-2.5 px-5 text-sm font-medium text-gray-900
          focus:outline-none bg-white rounded-lg border border-gray-200
          hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
          focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
          dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
          dark:hover:bg-gray-700"
          >
            <Link to={`/items/${button}`}>{button}</Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <img
          src={clothes}
          alt=""
          className="w-1/2 h-1/2 border border-gray-300 shadow-lg"
        />
      </div>
    </div>
  )
}

export default NavigateButtons
