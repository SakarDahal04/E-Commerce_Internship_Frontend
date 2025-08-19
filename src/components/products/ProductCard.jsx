import { useState, useEffect } from "react";
import { fetchProduct, fetchCategory } from "./api";
import { useApi } from "./api";
import Cards from "../common/Cards";
import Search from "../common/Search";

function ProductCard() {
    const api = useApi()
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => { loadProducts() }, [])
    useEffect(() => { loadTagsAndCategories() }, [])

    async function loadProducts() {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const data = await fetchProduct(api)
            const arr = Array.isArray(data) ? data : Object.values(data).filter(Boolean);

            setProducts(arr);
            setFilteredProducts(arr);
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
    async function loadTagsAndCategories() {
        try {
            const data = await fetchCategory(api)
            const arr = Array.isArray(data) ? data : Object.values(data).filter(Boolean);
            setCategories(arr);

        }
        catch (err) {
            setError("can't fetch any categories")
        }
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
        onChange: setSearchTerm,
        onSearch: handleSearchClient

        // searchFunction: 
    }
    //     function filterProduct(){
    //         setFilteredProducts()
    //     }

    const filterProducts = (e) => {
        const updatedCategories = categories.map(cat =>
            cat.id === parseInt(e.target.id)
                ? { ...cat, isChecked: e.target.checked }
                : cat
        );
        setCategories(updatedCategories);
        console.log("UPDATE VAXA KI NAI", updatedCategories)

        const tempProduct = [];
        for (let c of updatedCategories) {
            if (c.isChecked) {
                tempProduct.push(...products.filter(p => p.category.id === c.id));
            }
        }
        setFilteredProducts(tempProduct.length > 0 ? tempProduct : products);
    }

    return (
        <>
            <div className="category-tags-side-panel">
                <h1> Categories</h1>
                {categories.map((category) => (
                    <div key={`${category.name}-${category.id}`}>
                        <input type="checkbox" id={category.id} name={category.id} onChange={filterProducts} />
                        <label htmlFor={category.id}>{category.name}</label>
                    </div>
                ))}
                <h1> tags</h1>

            </div>
            <Search search={mySearch} />

            {filteredProducts.length == 0 ? (
                <p>No products match your search.</p>
            ) : (
                filteredProducts.map((product) => (
                    <Cards
                        key={product.id}
                        card={{
                            id: product.id, title: product.name, description: product.description, image: product.image,
                        }}
                    />
                ))
            )}
        </>
    );
}
export default ProductCard