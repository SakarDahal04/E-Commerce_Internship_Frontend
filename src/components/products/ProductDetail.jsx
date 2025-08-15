import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "./api";
import Cards from "../common/Cards";
import Table from "../common/Table";

function ProductDetail() {
    const [product, setproduct] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    console.log("ID yo ho", id)

    useEffect(() => { loadproduct(id) }, [])

    async function loadproduct(id) {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const data = await fetchProduct(id)
            console.log(data)
            setproduct(data)
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
    const mytable = {
        heading: product.name,
        list: product 
    }

    return (
        <>
        <Table  table={mytable} />

        </>
    )

}

export default ProductDetail