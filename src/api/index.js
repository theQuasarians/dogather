import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
})

export const signInCall = async (body) => {
  try {
    //     const { data } = await API.post("/login", { data: body })
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    console.log(response)
  } catch (error) {
    console.log("something went wrong!", error)
  }
}
