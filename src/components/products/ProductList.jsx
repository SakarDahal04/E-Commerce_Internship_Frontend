import { useState, useEffect } from "react";
import { fetchProduct } from "./api";

function ProductList() {
    console.log("second time ")
    const [products, setProducts] = useState([]);
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

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
            <tr>
                <th>category</th>
                <th>tags</th>
                <th>name</th>
                <th>description</th>
                <th>price</th>
            </tr></thead>
            <tbody>
            {products.map((product) =>
            (
                <tr key={product.id}>
                    <td>{product.category.id}</td>
                    <td>{product.tags.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                </tr>

            ))}
            </tbody>
            </table>
        </div>
    )

}

export default ProductList 