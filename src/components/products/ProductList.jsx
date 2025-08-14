import { useState, useEffect } from "react";
import { fetchProduct } from "./api";
import TableSearch from "./../common/TableSearch.jsx"

function ProductList() {
    console.log("second time ")
    const [products, setProducts] = useState({});
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
    // const isPlainObject = (obj) => {
    //     return obj !== null && typeof obj === 'object' && obj.constructor === Object;
    // };
    // the above function checks if the data structure is dictionary or not
    
    // const purified_products = {} 

    // const myProductTable = {
    //     heading : "Product",
    //     list : products,
    //     bgColor: "red"
    // }

    return (
        <TableSearch table={myProductTable} />
    )

}

export default ProductList 