import { useState } from "react"
import { Login } from "../components/Login"
import { useAuth } from "../hooks/use-auth"
import { useNavigate, useLocation } from "react-router-dom"

export const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await login(values.email.toLowerCase(), values.password)
      navigate(from)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  return <Login onSubmit={handleSubmit} loading={loading} />
}
