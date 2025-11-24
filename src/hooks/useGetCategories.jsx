import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { createAxiosInstance } from '../services/axiosConfig'


const useGetCategories = () => {
    const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)
    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

    const categoriesList = async () => {
        try {
            const response = await api.get(`/api/product/categories/`)
            console.log("Obtained Response from server", response)
            return response.data.results
        } catch (error) {
            console.log("error in obtaining the data from the server", error)
        }
    }

    return categoriesList
}

export default useGetCategories