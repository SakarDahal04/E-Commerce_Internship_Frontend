export async function authTokens() {
    const res = await fetch("http://localhost:8000/api/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "admin",
            "password": "admin"
        })
    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error("we can't fetch products")
    }
    else {
        return data
    }
}

export async function fetchProduct(id, filters = {}, search) {
    let params = new URLSearchParams();
    const authToken = await authTokens()


    if (id) {
        let query = id + "/"
        const res = await fetch(`http://localhost:8000/api/product/products/${query}`, {
            headers: {
                Authorization: `Bearer ${authToken.access}`
            }
        });
        const data = await res.json()


        if (!res.ok) {
            throw new Error("we can't fetch products")
        }
        else {
            return data
        }
    }

    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            params.append(key, value);
        }
    }
    if (search) {
        params.append("search", search)
    }

    let query = ""
    if (params.toString()) {
        query = `?${params.toString()}`
    }

    console.log("QUERY MA K XA ", query)

    const res = await fetch(`http://localhost:8000/api/product/products/${query}`, {
        headers: {
            Authorization: `Bearer ${authToken.access}`
        }
    });
    // const res = await fetch(`http://localhost:8000/api/product/products/${query}`)
    const data = await res.json()


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
