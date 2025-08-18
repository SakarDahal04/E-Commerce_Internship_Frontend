import { useState, useEffect } from "react";
import { fetchProduct } from "./api";
import { useApi } from "./api";
import Cards from "../common/Cards";
import Search from "../common/Search";

function ProductCard() {
    const api = useApi()
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => { loadProducts() }, [])

    async function loadProducts() {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const data = await fetchProduct(api)
            const arr = Array.isArray(data) ? data : Object.values(data).filter(Boolean);

            // setProducts(data)
            setProducts(arr);
            // setFilteredProducts(arr);
        }
        catch (err) {
            console.error("Error fetching products:", err);
            setError("Can't get any response");
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
    
    function handleSearchClient() {
        const q = searchTerm.trim().toLowerCase();
        if (!q) {
            setFilteredProducts(products);
            return;
        }
        const filtered = products.filter(p => {
            if (!p) return false;
            return String(p.name || "").toLowerCase().includes(q)
        });
        setFilteredProducts(filtered);
    }

    const mySearch = {
        searchPlaceholder: "Search Product",
        onChange: setSearchTerm ,
        onSearch:  handleSearchClient 
        // searchFunction: 
    }
    console.log("YETA XU CARDS MA")

    return (
        <>
            <Search search={mySearch} />

            {filteredProducts.length == 0 ? (
                <p>No products match your search.</p>
            ) : (
                filteredProducts.map((product) => (
                    <Cards
                        key={product.id}
                        card={{
                            id: product.id, 
                            title: product.name, 
                            description: product.description, 
                            image: product.image,
                        }}
                    />
                ))
            )}
        </>
    );
}
export default ProductCard