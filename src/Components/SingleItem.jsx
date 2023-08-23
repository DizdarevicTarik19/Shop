import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react"

const SingleItem = ({ item }) => {
  return (
    <Card className="mt-6 w-96 border border-black">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={item.img}
          alt=""
          className="object-cover h-full w-full border border-black"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {item.name}
        </Typography>
        <Typography className="mt-2">{item.text}</Typography>
        <Typography>
          <div className="flex justify-center items-center mt-2">
            {item.color.map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </Typography>
        <Typography className="mt-2">{item.price}$</Typography>
      </CardBody>
      <CardFooter className="pt-0"></CardFooter>
    </Card>
  )
}

export default SingleItem
