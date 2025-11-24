import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { createAxiosInstance } from "../services/axiosConfig";


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate()

    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem("authTokens")
        return storedTokens ? JSON.parse(storedTokens) : null
    })

    const [user, setUser] = useState(() => {
        try {
            return authTokens ? jwtDecode(authTokens.access) : null
        } catch (error) {
            return null
        }
    })

    const [loading, setLoading] = useState(true)

    const loginUser = async (username, password) => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_API_URL}/api/auth/token/`,
                {
                    username,
                    password
                },
                {headers: {"Content-Type": "application/json"}}
            );

            const data = response.data;

            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate("/")
        } catch (error) {
            console.log(error)
            console.log("Login Failed", error.response?.data?.detail || error.message)
        }
    }

    const registerUser = async (username, password, email, confirm_password) => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_API_URL}/api/user_ordersusers/`,
                // {email, username, password, confirm_password},
                {email, username, password},
                {headers: {"Content-Type": "application/json"}}
            );

            const data = response.data;

            navigate('/login')
        } catch (error) {
            console.log("Registration Failed ", error.response?.data?.detail || error.message)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)

        localStorage.removeItem("authTokens")

        navigate("/login")
    }

    const api = createAxiosInstance(
        authTokens, 
        setAuthTokens,
        setUser,
        logoutUser
    )

    const contextData = {
        authTokens,
        setAuthTokens,
        user,
        setUser,
        loginUser, 
        registerUser,
        logoutUser,
        api,
    }

    useEffect(() => {
        if(authTokens) {
            setUser(jwtDecode(authTokens.access))
        } 
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export default AuthContext;