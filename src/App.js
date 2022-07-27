import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { LogoutPage } from "./pages/Logout"
import CssBaseline from "@mui/material/CssBaseline"
import { AuthProvider } from "./hooks/use-auth"

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
