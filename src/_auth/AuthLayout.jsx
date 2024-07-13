import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../Context/ContextProvider"

// AuthLayout it protect specific routers it means only logged user can go through it
const AuthLayout = () => {
  const { state } = useAppContext()
  if (!state.auth.isAuthenticated) return <Navigate to="/sign-in" />
  return <Outlet />
}

export default AuthLayout
