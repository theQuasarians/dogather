export const initialState = {
  auth: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  posts: {
    posts: [],
    loading: false,
    error: null,
  },
}
// Actions Types Constants
// Auth actions
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST"
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS"
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE"
export const AUTH_LOGOUT = "AUTH_LOGOUT"

// Post actions
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST"
