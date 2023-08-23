import { Card, Input, Button, Typography } from "@material-tailwind/react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/authSlice"
import { useState } from "react"
import { toast } from "react-toastify"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Vaša validacija za ime i lozinku
    const userValidation = /^[A-Za-z]{4,10}$/i.test(username)
    const passwordValidation =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
        password
      )

    // Provjera uslova validacije
    if (userValidation && passwordValidation) {
      dispatch(login({ name: username })) // Dodajte ime korisnika u akciju
      localStorage.setItem("isLoggedIn", "true")
      navigate("/")
    } else {
      // Ovdje možete prikazati poruku o neispravnim podacima
      toast.error("UserName or Password is incorrect!")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-black p-5 rounded-xl shadow-xl shadow-gray-500">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="mt-6" fullWidth onClick={handleLogin}>
              Register
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Login
