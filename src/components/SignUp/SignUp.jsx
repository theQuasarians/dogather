import "./SignUp.css"

import logoSignUp from "../../assets/signupAssets/logo.svg"
import eyes from "../../assets/signupAssets/eyes.svg"
import { useEffect, useState } from "react"
import { validateSignupForm } from "../../utils/validateData.js"
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
  })

  const fillDataFields = (e) => {
    // console.log(object);
    if (e.target?.name) {
      const { name } = e.target
      setSignupForm((prev) => ({ ...prev, [name]: e.target.value }))
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    const errors = validateSignupForm(signupForm)
    // console.log("vaildtion fun", errors)
    if (
      errors.username?.length |
      errors.password?.length |
      errors.email?.length
    ) {
      setSignupForm((prev) => ({ ...prev, errors }))
    } else {
      // post data to the server
      // console.log(signupForm)
    }
  }
  useEffect(() => {
    console.log(signupForm)
  }, [signupForm])

  return (
    <>
      <nav className="signup__nav">
        <img src={logoSignUp} alt="logo" />
        <p className="singup__labelLogo"> dogather </p>
      </nav>

      <div className="signup__container">
        <div className="signup__form">
          <form className="form">
            <h2> Sign up </h2>
            <label htmlFor="username">Your username</label>
            <input
              onChange={(e) => fillDataFields(e)}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
              className={`${signupForm.errors.username && "username_error"}`}
            />
            {signupForm.errors.username && (
              <small>{signupForm.errors.username}</small>
            )}
            <label htmlFor="email">Your email</label>
            <input
              onChange={(e) => fillDataFields(e)}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              className={`${signupForm.errors.email && "email_error"}`}
              required
            />
            {signupForm.errors.email && (
              <small>{signupForm.errors.email}</small>
            )}
            <label htmlFor="password">Your password</label>
            <div className="passwordContainer">
              <input
                onChange={(e) => fillDataFields(e)}
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className={`${signupForm.errors.password && "password_error"}`}
              />
              {signupForm.errors.password && (
                <small>{signupForm.errors.password}</small>
              )}
              <img
                src={showPassword ? eyes : eyes}
                onClick={() => setShowPassword(!showPassword)}
                alt="eyes-password"
                className="password__eyes"
              />
            </div>
            <p className="form__linkLabel">
              Already have an account?
              <span>
                <a href="#" className="form__link">
                  {" "}
                  Sign in
                </a>
              </span>
            </p>
            <button
              onClick={(e) => submitForm(e)}
              type="submit"
              className="form__cta"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
