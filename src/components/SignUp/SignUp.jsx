import "./SignUp.css";

import logoSignUp from "../../assets/signupAssets/logo.svg";
import eyes from "../../assets/signupAssets/eyes.svg";
export default function SignUp() {
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
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              required
            />
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              required
            />
            <label htmlFor="password">Your password</label>
            <div className="passwordContainer">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />

              <img src={eyes} alt="eyes-password" className="password__eyes" />
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
            <button type="submit" className="form__cta">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
