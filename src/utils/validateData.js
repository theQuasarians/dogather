const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// letters, numbers , Capital letters , symbols required
const hardPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// letters, numbers , min 8 .Capital letters , symbols optional
const passwordRegex = /^[a-zA-Z0-9]{8,20}$/

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
export const validateSignupForm = (data) => {
  const errors = {
    username: null,
    email: null,
    password: null,
  }
  // if(name === "username")

  if (!usernameRegex.test(data.username))
    errors.username = "Please check your username !"
  if (!emailRegex.test(data.email)) errors.email = "Please check your email !"
  if (!passwordRegex.test(data.password))
    errors.password = "Please use hard password !"

  // if(name === "username")
  return errors
}

export const validateSigninForm = (data) => {
  const errors = {
    username: null,
    password: null,
  }
  // if (!emailRegex.test(data.email)) errors.email = "email address is wrong!"
  if (!usernameRegex.test(data.username))
    errors.username = "username is not valid"
  if (!passwordRegex.test(data.password)) errors.password = "password is easy !"
  return errors
}
