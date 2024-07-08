import "./SignIn.css"

import logoSignIn from "../../assets/signInAssets/logo.svg"
import eyes from "../../assets/signInAssets/eyes.svg"
import { useState } from "react"
import { validateSigninForm } from "../../utils/validateData"
import { useAppDispatch } from "../../Context/ContextProvider"
import { signInCall } from "../../api"
import axios from "axios"
export default function SignIn() {
  const dispatch = useAppDispatch()
  const [signinForm, setSigninForm] = useState({
    email: null,
    password: null,
    errors: {
      email: null,
      password: null,
    },
  })
  const fillDataFields = (e) => {
    if (e.target?.name) {
      const { name } = e.target
      setSigninForm((prev) => ({ ...prev, [name]: e.target.value }))
    }
  }
  const submitSigninForm = (e) => {
    e.preventDefault()
    const errors = validateSigninForm(signinForm)
    console.log("validation fun", errors)
    if (errors.password?.length | errors.email?.length) {
      setSigninForm((prev) => ({ ...prev, errors }))
    } else {
      const { email, password } = signinForm
      axios
        .post("http://localhost:5000/login", {
          email,
          password,
        })
        .then((result) => {
          console.log(result)
          if (result.data === "Success") {
            console.log("Login Success")
            alert("Login successful!")
            navigate("/home")
          } else {
            alert("Incorrect password! Please try again.")
          }
        })
        .catch((err) => console.log(err))

      // dispatch({ type: "LOGGED", payload: token })
      // dispatch("LOGIN",signinForm

      // console.log(typeof dispatch)
      // post data to the server
      // console.log(signinForm)
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
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => fillDataFields(e)}
              placeholder="Enter your email address"
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
