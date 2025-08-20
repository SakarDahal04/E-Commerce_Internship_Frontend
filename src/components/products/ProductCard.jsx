import { useState, useEffect } from "react";
import { fetchProduct, fetchCategory, fetchTags } from "./api";
import { useApi } from "./api";
import Cards from "../common/Cards";
import Search from "../common/Search";
import "../common/css/cards.css"
import Button from "../common/Button";

function ProductCard() {
    const api = useApi()
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [pageLimit, setPageLimit] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => { loadProducts() }, [page])
    useEffect(() => { loadTagsAndCategories() }, [])

    async function loadProducts() {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const dataInitial = await fetchProduct(api, page)
            console.log("DDATA", dataInitial)
            const data = dataInitial.results
            // setTotalCount(data.count)
            setPageLimit(dataInitial.page_size || 10)
            const arr = Array.isArray(data) ? data : Object.values(data).filter(Boolean);

            setProducts(data);
            console.log("DDD", data)
            setFilteredProducts(data);
        }
        catch (err) {
            console.error("Error fetching products:", err);
            setError("Can't get any response");
        }

        finally {
            setLoading(false);
        }
    }

    const totalPages = Math.ceil(totalCount / pageLimit)
    const totalPageList = []
    for (let i = 1; i <= totalPages; i++) {
        totalPageList.push(i)
    }
    if (loading) {
        return <p>loading man</p>
    }
    if (error) {
        return <p>some errors man: {error}</p>
    }
    async function loadTagsAndCategories() {
        try {
            const data_category = await fetchCategory(api)
            const data_tags = await fetchTags(api)

            const arr_category = Array.isArray(data_category) ? data_category : Object.values(data_category).filter(Boolean);
            const arr_tags = Array.isArray(data_tags) ? data_tags : Object.values(data_tags).filter(Boolean);

            setCategories(arr_category);
            setTags(arr_tags);

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
        function filterProduct(){
            setFilteredProducts()
        }

    const filterProducts = (e) => {
        const { id, checked } = e.target;

        let updatedCategories = categories;
        let updatedTags = tags;

        if (id.startsWith("cat-")) {
            const catId = parseInt(id.replace("cat-", ""), 10);
            updatedCategories = categories.map(c =>
                c.id === catId ? { ...c, isChecked: checked } : c
            );
            setCategories(updatedCategories);
        } else if (id.startsWith("tag-")) {
            const tagId = parseInt(id.replace("tag-", ""), 10);
            updatedTags = tags.map(t =>
                t.id === tagId ? { ...t, isChecked: checked } : t
            );
            setTags(updatedTags);
        }

        const checkedCatIds = updatedCategories.filter(c => c.isChecked).map(c => c.id);
        const checkedTagIds = updatedTags.filter(t => t.isChecked).map(t => t.id);

        if (checkedCatIds.length === 0 && checkedTagIds.length === 0) {
            setFilteredProducts(products);
            return;
        }

        const result = products.filter(p => {
            const matchesCategory = checkedCatIds.length === 0 ? false : checkedCatIds.includes(p?.category?.id);

            let matchesTag = false;
            if (checkedTagIds.length > 0) {
                if (Array.isArray(p?.tags)) {
                    matchesTag = p.tags.some(t => checkedTagIds.includes(t.id));
                } else if (p?.tag) {
                    matchesTag = checkedTagIds.includes(p.tag.id);
                } else {
                    matchesTag = false;
                }
            }

            return (checkedCatIds.length > 0 && matchesCategory) || (checkedTagIds.length > 0 && matchesTag);
        });

        setFilteredProducts(result);
    };



    function onClickPage(page_no) {
        setPage(page_no)
    }

    return (
        <div className="container-product-cart">
            <div className="group-search-categories">
                <Search className="search-product" search={mySearch} />
                <div className="category-tags-side-panel">
                    <h1> Categories</h1>
                    {categories.map((category) => (
                        <div key={`cat-${category.id}`}>
                            <input
                                type="checkbox"
                                id={`cat-${category.id}`}
                                name={`cat-${category.id}`}
                                checked={!!category.isChecked}
                                onChange={filterProducts}
                            />
                            <label htmlFor={`cat-${category.id}`}>{category.name}</label>
                        </div>
                    ))}
                    <h1> Tags</h1>
                    {tags.map((tag) => (
                        <div key={`tag-${tag.id}`}>
                            <input
                                type="checkbox"
                                id={`tag-${tag.id}`}
                                name={`tag-${tag.id}`}
                                checked={!!tag.isChecked}
                                onChange={filterProducts}
                            />
                            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                        </div>
                    ))}

                </div>
            </div>
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
            {/* {totalPageList.map((eachPage) => (
                <Button
                    key={eachPage}
                    button={{ text: eachPage, value: eachPage, onClickFunction: () => onClickPage(eachPage) }}
                />
            ))} */}
        </div>
    );
}
export default ProductCard