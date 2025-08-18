import { useState, useEffect } from "react";
import { useApi } from "./api";
import { useParams } from "react-router-dom";
import { fetchProduct } from "./api";
import Cards from "../common/Cards";
import Table from "../common/Table";

function ProductDetail() {
    const api = useApi()
    const [product, setproduct] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    console.log("ID yo ho", id)

    useEffect(() => { if(id) loadproduct(id) }, [id])

    async function loadproduct(id) {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const data = await fetchProduct(api,id)
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
    console.log(mytable)

    return (
        <>
        <Table  table={mytable} />

        </>
    )

}

export default ProductDetail