import { createAxiosInstance } from "../services/axiosConfig";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import FilterContext from "../context/FilterContext";

const useGetProductsData = (filters={}) => {
    const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext);
    const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser);

    // const [filters, setFilters] = useContext(FilterContext)

    const getProductList = async () => {
        const params = new URLSearchParams();
        if (filters.category) params.append("category", filters.category);
        if (filters.tags && filters.tags.length) params.append("tags", filters.tags.join(","));
        if (filters.minPrice != null) params.append("price_min", filters.minPrice);
        if (filters.maxPrice != null) params.append("price_max", filters.maxPrice);
        if (filters.search) params.append("search", filters.search);

        const response = await api.get(`/api/product/products/?${params.toString()}`);
        return response.data.results;
    }

    return getProductList;
}

export default useGetProductsData;
