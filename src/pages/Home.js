import { Container, Typography, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/use-auth"

export const HomePage = () => {
  const { fetchWithAuth, isLoggedIn } = useAuth()
  const [userInfo, setUserInfo] = useState(null)

  const handleClick = async () => {
    const resp = await fetchWithAuth(
      "https://eql-dev.us.authz.cloudentity.io/eql-dev/demo/userinfo"
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
        {isLoggedIn ? (
          <>
            <Typography>
              Welcome {userInfo ? userInfo.email : "anonymous"}!
            </Typography>
            <Button variant="contained" onClick={handleClick}>
              Get user info
            </Button>
            <Button component={Link} variant="outlined" to="/logout">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography>You are not logged in.</Typography>
            <Button component={Link} variant="contained" to="/login">
              Login
            </Button>
          </>
        )}
      </Stack>
    </Container>
  )
}
