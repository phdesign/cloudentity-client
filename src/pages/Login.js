import { Login } from "../components/Login"
import * as ClientOAuth2 from "client-oauth2"

const clientAuth = new ClientOAuth2({
  clientId: process.env.REACT_APP_OAUTH2_CLIENT_ID,
  clientSecret: process.env.REACT_APP_OAUTH2_CLIENT_SECRET,
  accessTokenUri: process.env.REACT_APP_OAUTH2_TOKEN_URI,
  authorizationUri: process.env.REACT_APP_OAUTH2_AUTHORIZATION_URI,
  scopes: ["email", "offline_access", "openid"],
})

export const LoginPage = () => {
  const handleSubmit = async (values, formikBag) => {
    console.log("Logging in...", values)
    try {
      const user = await clientAuth.owner.getToken(
        values.email.toLowerCase(),
        values.password
      )
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }

  return <Login onSubmit={handleSubmit} />
}
