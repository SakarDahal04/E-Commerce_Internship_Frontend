export async function fetchProduct(filters = {}, search) {
    let params = new URLSearchParams();
    if (filters) {
        for(const[key, value] of Object.entries(filters)){
            params.append(key, value);
        }
    }
    if (search) {
        params.append("search", search)
    }
    const query = ""
    if(params.toString()){
        query = `?${params.toString()}` 
    }

    const res = await fetch("http://localhost:8000/api/product/products/" + query)
    const data = await res.json()
    console.log(data.results)

    if (!res.ok) {
        throw new Error("we can't fetch products")
    }
    else {
        return data.results
    }
}


export async function fetchCategory() {
    const res = await fetch("http://localhost:8000/products/api/categories")
    if (!res.ok) {
        throw new Error("we can't fetch categories")
    }
    else {
        return res.json()
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
