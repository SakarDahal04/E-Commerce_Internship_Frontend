import { createAxiosInstance } from "../../services/axiosConfig"
import AuthContext from "../../context/AuthContext"
import { useContext } from "react"

export function useApi() {
    const { authTokens, setAuthTokens, setUser } = useContext(AuthContext)
    return createAxiosInstance(authTokens, setAuthTokens, setUser)
}

export async function fetchProduct(api, id, filters = {}, search) {
    let params = new URLSearchParams()
    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            params.append(key, value)
        }
    }
    if (search) {
        params.append("search", search)
    }
    let query = params.toString() ? `?${params.toString()}` : ""
    if (id) {
        console.log("YETA XUUU ID TIRA")
        const res = await api.get(`api/product/products/${id}/`)
        return res.data
    }
    const res = await api.get(`api/product/products/${query}`)
    return res.data.results
}

export async function fetchCategory(api) {

    const res = await api.get(`api/product/categories/`)
    return res.data.results
}

export async function createCartItem(api, { body }) {
    const res = await api.post(
        `/cart/add-item/`,
        "",
        {
            body: { "product_id": body.product_id, "quantity": body.quantity}
        }
    )


    if (!res.ok) {
        throw new Error("K type garya vai")
    }
    else {
        return res.data
    }

}

export async function fetchTags(search = "") {
    let query = "http://localhost:8000/products/api/tags"
    if (search) {
        const search = new URLSearchParams(search).toString
        query = query + "?" + search
    }

    const res = await fetch(query)
    if (!res.ok) {
        throw new Error("we can't fetch tags")
    }
    else {
        return res.json()
    }

}

export async function fetchProductTags() {
    const res = await fetch("http://localhost:8000/products/api/categories")
    if (!res.ok) {
        throw new Error("we can't fetch categories")
    }
    else {
        return res.json()
    }
}


export async function fetchReviews(filters = {}, search) {
    const params = new URLSearchParams(filters)
    if (search) {
        params.append("search", search)
    }
    const query = params.toString()
    const res = await fetch("http://localhost:8000/api/product/reviews" + query)
    if (!res.ok) {
        throw new Error("we can't fetch products")
    }
    else {
        return res.json()
    }
}
