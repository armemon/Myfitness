import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'


export const firebaseApp  = initializeApp({
    apiKey: "AIzaSyA1B6_mLFwzIcgiDeG4zlypHNNbz-m2VHU",
    authDomain: "myfitness-10594.firebaseapp.com",
    projectId: "myfitness-10594",
    storageBucket: "myfitness-10594.appspot.com",
    messagingSenderId: "667428556665",
    appId: "1:667428556665:web:9cc0046f793a0c0ff369a8"
  });

export const AuthContext = createContext()

export const auth = getAuth()

export const AuthContextProvider = props => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth1 = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}