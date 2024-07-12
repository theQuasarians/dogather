import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  withCredentials: true,
})

API.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const signInCall = (data) => {
  try {
    return API.post("/auth/login", data)
    // console.log(response)
  } catch (error) {
    console.log("something went wrong!", error)
  }
}
