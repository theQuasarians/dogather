import { signInCall } from "../api"

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

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case AUTH_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case AUTH_LOGOUT:
      return { ...state, isAuthenticated: false, token: null, user: null }
    default:
      return state
  }
}

export const postReducer = (state, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false }
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    default:
      return state
  }
}

//this will combine reducers into one root reducer that have both [state and dispatch]
export const combineReducers = (...reducers) => {
  return (state, action) => {
    return reducers.reduce((newState, reducer) => {
      return { ...newState, ...reducer(newState, action) }
    }, state)
  }
}

// This is the simple implementation of combineReducers as it is defined above just we past reducers in object
// like that {reducer1,reducer2,reducer3} as parameter , as it is clear here newState[key] = reducer(state[key], action) for every reducer fuck both are same just one combine all dispatcher in one dispatch which call all handler and this will call every reducer with specific slice and actions
// export const combineReducersSimpler = (reducers) => {
//   return (state, action) => {
//     const newState = {}
//     for (const [key, reducer] of Object.entries(reducers)) {
//       newState[key] = reducer(state[key], action)
//     }
//     return newState
//   }
// }

//This function it combine dispatches not reducers which means that make every action is dispatched to all provided reducers then each reducer will then decide whether it needs to handle the action or not based on the action type
//the problem in this method is reducers get called on every dispatch, even if they don't need to handle the action
// export const combineDispatch =
//   (...dispatches) =>
//   (action) =>
//     dispatches.forEach((dispatch) => dispatch(action))
