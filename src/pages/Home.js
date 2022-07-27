import { Container, Typography, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/use-auth"

export const HomePage = () => {
  const { token } = useAuth()
  const [userInfo, setUserInfo] = useState(null)

  const handleClick = async () => {
    console.log("Clicked")
    const resp = await fetch(
      "https://eql-dev.us.authz.cloudentity.io/eql-dev/demo/userinfo",
      token.sign({})
    )
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`)
    }
    const userInfo = await resp.json()
    console.log(userInfo)
    setUserInfo(userInfo)
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h2">Cloudentity Client Demo</Typography>
        {token ? (
          <>
            <Typography>
              Welcome {userInfo ? userInfo.email : "anonymous"}!
            </Typography>
            <Button variant="contained" onClick={handleClick}>
              Get user info
            </Button>
          </>
        ) : (
          <>
            <Typography>You are not logged in.</Typography>
            <Button component={Link} variant="contained" to="/login">
              Login here
            </Button>
          </>
        )}
      </Stack>
    </Container>
  )
}
