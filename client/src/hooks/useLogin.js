import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email: email, password: password})
        })

        const json = await response.json()
        
        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        } else {
            
            // Save use token on local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
} 