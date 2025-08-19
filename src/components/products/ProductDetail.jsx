import { useState, useEffect } from "react";
import { useApi } from "./api";
import { useParams } from "react-router-dom";
import { fetchProduct } from "./api";
import { createCartItem } from "./api"; 
import Button from "../common/Button";
import Table from "../common/Table";
import './../common/css/cards.css';

function ProductDetail() {
    const api = useApi()
    const [product, setproduct] = useState({});
    const [cartItem, setCartItems] = useState([])
    const [quantity, setQuantity] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()
    console.log("ID yo ho", id)

    useEffect(() => { if (id) loadproduct(id) }, [id])

    async function loadproduct(id) {
        try {
            setLoading(true);
            // const filters = { category: "1" }
            const data = await fetchProduct(api, id)
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

  async function buttonClick(selectedQuantity) {
        const addItemtoCart = await createCartItem(api, {product_id: product.id, quantity: selectedQuantity})
    }
    const myButton = {
        text: "Add to cart",
        onClickFunction: buttonClick,
        textColor: 'green'
    }

    return (
        <>
            <label for="quantity">Quantity (between 1 and {product.stock}):</label>
            <input type="number" id="quantity" name="quantity" min="1" max={product.stock} value={quantity} onChange={(e)=>{setQuantity(Number(e.target.value))}}/>
            <Button button={myButton} onClickFunction={()=>buttonClick(quantity)}/>
            <div className="product-card-container">
                {product.image && <img src={product.image} alt='no image man' className="card-image-detail" />}
                <Table table={mytable} />
            </div>
        </>
    )

}

export default ProductDetail