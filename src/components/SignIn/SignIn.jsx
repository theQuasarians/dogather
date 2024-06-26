import "./SignIn.css";

import logoSignIn from "../../assets/signInAssets/logo.svg";
import eyes from "../../assets/signInAssets/eyes.svg";
export default function SignIn() {
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
              Don't have an account?
              <span>
                <a href="#" className="form__link">
                  {" "}
                  Sign up
                </a>
              </span>
            </p>
            <button type="submit" className="form__cta">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
