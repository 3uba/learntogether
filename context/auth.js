import { createContext, useContext, useState } from "react"
import { useFirebase } from "../lib/useFirebase"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const firebase = useFirebase()
    return <AuthContext.Provider value={firebase}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }