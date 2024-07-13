// actions.js
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  ADD_POST,
  DELETE_POST,
} from "./constants"

import Cookies from "js-cookie"
import { signInCall } from "../api/index"
// auth actions
//login action
export const authLoginRequest = async (data, dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST })

    const res = await signInCall(data)
    console.log(res)

    if (res.status === 200) {
      //when user logged successfully we provide user details and token in payload
      const token = Cookies.get("token")
      console.log("token : ", token)
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: { user: res.data, token: token },
      })
    } else {
      dispatch({ type: AUTH_LOGIN_FAILURE, payload: "Authentication failed!" })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: AUTH_LOGIN_FAILURE, payload: error.message })
  }
}

export const authLogout = async (dispatch) => {
  try {
    // TODO : call logout api here and check the status code
    Cookies.remove("token")
    dispatch({ type: AUTH_LOGOUT })
  } catch (error) {
    console.log(error.message)
  }
}

// post actions
export const fetchPosts = async (dispatch) => {
  try {
    //1.
  } catch (error) {}
}

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
})

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
})

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
})

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
})
