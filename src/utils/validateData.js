export const validateSignupForm = (data) => {
  const errors = {
    username: null,
    email: null,
    password: null,
  }
  // if(name === "username")
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!usernameRegex.test(data.username))
    errors.username = "Please check your username !"
  if (!emailRegex.test(data.email)) errors.email = "Please check your email !"
  if (!passwordRegex.test(data.password))
    errors.password = "Please use hard password !"

  // if(name === "username")
  return errors
}
