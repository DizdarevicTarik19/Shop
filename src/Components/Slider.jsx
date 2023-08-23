import { sliderData } from "../assets/data/dummyData"
import { Carousel, Typography } from "@material-tailwind/react"

const Slider = () => {
  console.log(sliderData)
  return (
    <Carousel className="rounded-xl relative z-0">
      {sliderData.map((item, index) => (
        <div key={index} className="relative h-screen">
          <img src={item.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <Typography className="font-bold text-xl">{item.text}</Typography>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default Slider
