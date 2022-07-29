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
  const [storedToken, setStoredToken] = useLocalStorage("authToken", null)

  useEffect(() => {
    const auth = new ClientOAuth2({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      accessTokenUri: process.env.REACT_APP_TOKEN_URI,
      authorizationUri: process.env.REACT_APP_AUTHORIZATION_URI,
      scopes: ["email", "offline_access", "openid"],
    })
    setAuth(auth)
  }, [])

  const getToken = () => {
    if (!auth || !storedToken) {
      return null
    }
    const token = auth.createToken(storedToken)
    try {
      token.expiresIn(token.data.expires)
    } catch (e) {
      console.log(`Unable to parse token expiration: ${e}`)
    }
    return token
  }

  const refreshToken = async (currentToken) => {
    const newToken = await currentToken.refresh()
    setStoredToken({ ...newToken.data, expires: newToken.expires })
    return newToken
  }

  const login = async (email, password) => {
    const token = await auth.owner.getToken(email, password)
    setStoredToken({ ...token.data, expires: token.expires })
  }

  const logout = async () => {
    if (!storedToken) {
      return
    }
    await fetch(process.env.REACT_APP_LOGOUT_URI, getToken().sign({}))
    setStoredToken(null)
  }

  const fetchWithAuth = async (url, options) => {
    let token = getToken()

    if (token.expires < Date.now()) {
      console.log(`Token expired at ${token.expires}. Refreshing...`)
      token = await refreshToken(token)
    }

    const response = await fetch(url, token.sign(options || {}))
    if (response.status === 401) {
      console.log(
        "Server returned unauthorized. Refreshing token and trying again."
      )
      token = await refreshToken(token)
      return fetch(url, token.sign(options || {}))
    }
    return response
  }

  return { login, logout, fetchWithAuth, isLoggedIn: !!storedToken }
}
