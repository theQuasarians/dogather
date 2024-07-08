import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./_auth/AuthLayout"
import {
  Dashboard,
  Landing,
  Profile,
  SignInPage,
  SignUpPage,
} from "./_auth/pages"

import "./index.css"
import ContextProvider from "./Context/ContextProvider"

const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          {/* private routes */}
          <Route element={<AuthLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* public routes */}
          <Route index element={<Landing />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
