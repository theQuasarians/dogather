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

// auth actions
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
})

export const authLoginSuccess = (payload) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
})

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
})

export const authLogout = () => ({
  type: AUTH_LOGOUT,
})

// post actions
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
})

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
