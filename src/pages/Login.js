import { Login } from "../components/Login"
import { ClientOAuth2 } from "client-oauth2"

const clientAuth = new ClientOAuth2({
  clientId: process.env.REACT_APP_OAUTH2_CLIENT_ID,
  clientSecret: process.env.REACT_APP_OAUTH2_CLIENT_SECRET,
  accessTokenUri:
    "https://eql-dev.us.authz.cloudentity.io/eql-dev/demo/oauth2/token",
  authorizationUri:
    "https://eql-dev.us.authz.cloudentity.io/eql-dev/demo/oauth2/authorize",
  //   redirectUri: "http://example.com/auth/github/callback",
  scopes: [
    "address",
    "dcr_register",
    "email",
    "introspect_tokens",
    "list_clients_with_access",
    "manage_consents",
    "offline_access",
    "openid",
    "phone",
    "profile",
    "revoke_client_access",
    "revoke_tokens",
    "view_consents",
  ],
})

export const LoginPage = () => {
  const handleSubmit = async (values, formikBag) => {
    console.log(values, formikBag)
    const user = await clientAuth.owner.getToken(
      values.email.toLowerCase(),
      values.password
    )
    console.log(user)
  }

  return <Login onSubmit={handleSubmit} />
}
