import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { useRouter } from "next/router";

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayname: user.displayName,
                })
            } else {
                setUser(null)
            }
            setLoading(false)

        })
        return () => unsubcribe()
    }, [])
    console.log("user ::::",user)
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password).then(()=>{
            logout()
        })
    }
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
        
    }
    const logout = async () => {
        setUser(null)
        await signOut(auth).then(()=>{
            router.push('/login')
        })
        
    }

    return(
        <AuthContext.Provider value={{ user, login, signup, logout }} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
    
}