import { Login } from "../components/Login"

export const LoginPage = () => {
  const handleSubmit = async (values, formikBag) => {
    console.log(values, formikBag)
  }

  return <Login onSubmit={handleSubmit} />
}
