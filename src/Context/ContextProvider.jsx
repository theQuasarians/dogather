import { useContext, createContext, useReducer } from "react"
import React from "react"
// import { useNavigate } from "react-router-dom"
import { authReducer, postReducer, combineReducers } from "./Reducers"
import { initialState } from "./constants"

const AppContext = createContext(null)

const rootReducer = combineReducers(authReducer, postReducer)

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const appContext = useContext(AppContext)
  if (!appContext)
    throw new Error("Context must be use within AppContext Provider ")
  return appContext
}
