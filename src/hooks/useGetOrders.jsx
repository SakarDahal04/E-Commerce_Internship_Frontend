import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { createAxiosInstance } from '../services/axiosConfig'

const useGetOrders = () => {
    const {authTokens, setAuthTokens, setUser, logoutUser} = useContext(AuthContext)

    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

    const ordersList = async () => {
        const response = await api.get('/api/user_ordersorders/')
        return response.data
    }

    return ordersList
}

export default useGetOrders