import ClientOAuth2 from "client-oauth2"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "./use-local-storage"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const value = useProvideAuth()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useProvideAuth = () => {
  const [auth, setAuth] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [storedToken, setStoredToken] = useLocalStorage("authToken", null)

  useEffect(() => {
    const auth = new ClientOAuth2({
      clientId: process.env.REACT_APP_OAUTH2_CLIENT_ID,
      clientSecret: process.env.REACT_APP_OAUTH2_CLIENT_SECRET,
      accessTokenUri: process.env.REACT_APP_OAUTH2_TOKEN_URI,
      authorizationUri: process.env.REACT_APP_OAUTH2_AUTHORIZATION_URI,
      scopes: ["email", "offline_access", "openid"],
    })
    setAuth(auth)
  }, [])

  useEffect(() => {
    setLoggedIn(!!storedToken)
  }, [storedToken, setLoggedIn])

  const login = async (email, password) => {
    const token = await auth.owner.getToken(email, password)
    setStoredToken(token.data)
  }

  const logout = () => {
    setStoredToken(null)
  }

  const fetchWithAuth = async (url, options) => {
    const token = auth.createToken(storedToken)
    return fetch(url, token.sign(options || {}))
  }

  return { login, logout, fetchWithAuth, isLoggedIn }
}
