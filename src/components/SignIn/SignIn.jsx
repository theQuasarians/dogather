import "./SignIn.css"

import logoSignIn from "../../assets/signInAssets/logo.svg"
import eyes from "../../assets/signInAssets/eyes.svg"
import { useState } from "react"
import { validateSigninForm } from "../../utils/validateData"
import { useAppContext } from "../../Context/ContextProvider"
import { signInCall } from "../../api"
import axios from "axios"
import { authLoginRequest } from "../../Context/actions"
export default function SignIn() {
  const { state, dispatch } = useAppContext()

  const [signinForm, setSigninForm] = useState({
    username: null,
    password: null,
    errors: {
      username: null,
      password: null,
    },
  })
  const fillDataFields = (e) => {
    if (e.target?.name) {
      const { name, value } = e.target
      setSigninForm((prev) => ({ ...prev, [name]: value }))
    }
  }
  const submitSigninForm = (e) => {
    e.preventDefault()
    const errors = validateSigninForm(signinForm)
    console.log("validation fun", errors)
    if (errors.password?.length | errors.username?.length) {
      setSigninForm((prev) => ({ ...prev, errors }))
    } else {
      // call login action
      const { username, password, ...errors } = signinForm
      // console.log(state)
      console.log({ username, password })
      //just for test login
      // signInCall({ username, password }).then((res) => console.log(res))
      authLoginRequest({ username, password }, dispatch)
    }
  }
  return (
    <>
      <nav className="signin__nav">
        <img src={logoSignIn} alt="logo" />
        <p className="singin__labelLogo"> dogather </p>
      </nav>

      <div className="signin__container">
        <div className="signin__form">
          <form className="form">
            <h2> Sign in </h2>
            <label htmlFor="username">Your username</label>
            <input
              type="text"
              name="username"
              id="email"
              onChange={(e) => fillDataFields(e)}
              placeholder="Enter your username"
              required
            />
            <label htmlFor="password">Your password</label>
            <div className="passwordContainer">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => fillDataFields(e)}
                placeholder="Enter your password"
                required
              />

              <img src={eyes} alt="eyes-password" className="password__eyes" />
            </div>
            <p className="form__linkLabel">
              Don't have an account?
              <span>
                <a href="#" className="form__link">
                  {" "}
                  Sign up
                </a>
              </span>
            </p>
            <button
              onClick={(e) => submitSigninForm(e)}
              type="submit"
              className="form__cta"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
