import React from 'react'
import "./Card.css"
import { DynamicIcon } from "../../utils/iconMap"
import useAddToCart from '../../hooks/useAddToCart'

const Card = ({ cardDetails }) => {

    const addItemToCart = useAddToCart(cardDetails)

    const handleAddToCart = async () => {
        try {
            const data = await addItemToCart()
            console.log(data)
        } catch (error) {
            console.log("Error in saving the items to the cart: ", error)
        }
    }

    return (
        <div className='cardContent'>
            <img src={cardDetails.image} alt="product-image" />

            <div className="cardDescription">
                <div className='productCategory'>{cardDetails.category.name || "No Category"}</div>
                <div className='productName'>{cardDetails.name}</div>
                <div className='productPrice'>$ {cardDetails.price}</div>
            </div>

            <div className="cardIcons">
                <span>
                    <DynamicIcon iconName="FaRegHeart" />
                </span>
                <span onClick={handleAddToCart}>
                    <DynamicIcon iconName="FaShoppingCart" />
                </span>
            </div>
        </div>
    )
}

export default Card