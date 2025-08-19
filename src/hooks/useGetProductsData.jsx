import { createAxiosInstance } from "../services/axiosConfig";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const useGetProductsData = () => {
    const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)

    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

    const productList = async () => {
        const response = await api.get(`/api/product/products/`)
        return response.data.results
    }

    return productList
}

export default useGetProductsData