import { Routes, Route } from "react-router-dom"

import AuthLayout from "./_auth/AuthLayout"
import { Landing, SignInPage, SignUpPage } from "./_auth/pages"

import "./index.css"

const App = () => {
  return (
    <main>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Landing />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        {/* private routes */}
        {/* <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/name" element={<Name />} />
        </Route> */}
      </Routes>
    </main>
  )
}

export default App
