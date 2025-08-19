import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { createAxiosInstance } from '../services/axiosConfig'

const useAddToCart = (cardDetails) => {
    const { user, authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)
    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

    const addToCart = async () => {
        console.log(user)
        if (!user) {
            logoutUser()
        }
        console.log("user is present")
        console.log("Details:  ",cardDetails)
        const response = await api.post(`cart/add-item/`,
            {
                product_id: cardDetails.id,
                quantity: 1
            }
        )
        return response;
    }

    return addToCart;
}

export default useAddToCart