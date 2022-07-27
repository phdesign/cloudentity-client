import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { useAuth } from "../hooks/use-auth"

export const LogoutPage = () => {
  const navigate = useNavigate()
  const { logout, isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      logout()
    } else {
      navigate("/")
    }
  }, [isLoggedIn, logout, navigate])

  return null
}
