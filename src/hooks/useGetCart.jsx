import React from 'react'
import { useContext } from 'react'
import { createAxiosInstance } from '../services/axiosConfig'
import AuthContext from '../context/AuthContext'

const useGetCart = () => {
    const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)

    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

    const cartList = async () => {
        const response = await api.get('/cart/list-cart/')
        return response.data
    }

    return cartList
}

export default useGetCart