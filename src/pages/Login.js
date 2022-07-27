import { Login } from "../components/Login"
import { useAuth } from "../hooks/use-auth"
import { useNavigate, useLocation } from "react-router-dom"

export const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  const handleSubmit = async (values) => {
    console.log("Logging in...", values)
    try {
      await login(values.email.toLowerCase(), values.password)
      console.log("Logged in!")
      navigate(from)
    } catch (e) {
      console.log(e)
    }
  }

  return <Login onSubmit={handleSubmit} />
}
