import { useState, useEffect } from "react";
import { fetchProduct } from "./api";
import Cards from "../common/Cards";

function ProductCard() {
        const [products, setProducts] = useState([[[]]]);
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => { loadProducts() }, [])

        async function loadProducts() {
                try {
                        setLoading(true);
                        // const filters = { category: "1" }
                        const data = await fetchProduct()
                        console.log(data)
                        setProducts(data)
                }
                catch {
                        setError("Can't get any response")
                }
                finally {
                        setLoading(false);
                }
        }
        if (loading) {
                return <p>loading man</p>
        }
        if (error) {
                return <p>some errors man: {error}</p>
        }
        let products_purified =  
        for (let i in products) {
                if (products[i] != null) {
                        products_purified.push([i, products[i]])
                }
        }
        return (
                <>
                        {products_purified.map((product) => <Cards key={product[1].id} card={{ title: product[1].name, description: product[1].description }} />)}
                </>
        )

}

export default ProductCard