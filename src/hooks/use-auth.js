import ClientOAuth2 from "client-oauth2"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const value = useProvideAuth()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useProvideAuth = () => {
  const [auth, setAuth] = useState(null)
  const [token, setToken] = useState(null)

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

  const login = async (email, password) => {
    const token = await auth.owner.getToken(email, password)
    setToken(token)
  }

  return { login, token }
}
