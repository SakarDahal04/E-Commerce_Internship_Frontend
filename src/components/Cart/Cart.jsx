import { useLoaderData } from "react-router-dom"
import { useContext, useState } from "react"

import AuthContext from "../../context/AuthContext"
import { createAxiosInstance } from './../../services/axiosConfig'

import "./Cart.css"
import CartItem from "../CartItem/CartItem"

const Cart = () => {
  const loadedCartItems = useLoaderData()
  const [cartItems, setCartItems] = useState(loadedCartItems)

  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext)
  const api = createAxiosInstance(authTokens, setAuthTokens, setUser)

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const checkForCartItem = () => {
    if (cartItems.length < 1) {
      alert('No items available in the cart')
      return false
    }
    return true
  }

  const updateQuantity = (index, delta) => {
    setCartItems(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;

        // Calculate new quantity
        const newQuantity = item.quantity + delta;

        // Clamp between 1 and product stock
        const clampedQuantity = Math.max(1, Math.min(newQuantity, item.product.stock));

        return { ...item, quantity: clampedQuantity };
      })
    );
  };

  const toggleSelect = (index) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, selected_for_checkout: !item.selected_for_checkout } : item
      )
    )
  }

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.selected_for_checkout)
      .reduce((sum, item) => sum + item.quantity * item.product.price, 0)
  }

  const updateSelectedItems = async () => {
    const selectedItems = cartItems
      // .filter(item => item.selected_for_checkout) // or all items if you allow quantity changes for unselected
      .map(item => ({
        id: item.id,
        quantity: item.quantity,
        selected_for_checkout: item.selected_for_checkout
      }))

    if (!selectedItems.length) return

    console.log("Items for update", selectedItems)

    try {
      const res = await api.patch(
        `/cart/checkout-request/`,
        JSON.stringify(selectedItems),
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      console.log("Cart items updated:", res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createOrder = async () => {
    try {
      const res = await api.post(
        `/cart/checkout-request/`,
        "",
        {
          headers: { "Content-Type": "application/json" }
        }
      )

      // const data = await res.json()
      console.log("Order created:", res.data)

      // Remove purchased items from local state
      setCartItems(prev => prev.filter(item => !item.selected_for_checkout))
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!checkForCartItem()) return
    console.log("hello")
    await updateSelectedItems()
    await createOrder()
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!checkForCartItem()) return
    console.log("hello")
    await updateSelectedItems()
  }

  return (
    <div className="cartContainer">
      <h1>Your Cart</h1>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Item</th>
            <th>Stock</th>
            <th>Unit Amount</th>
            <th>Units</th>
            <th>Total Amount</th>
            <th>Select</th>
            <th>Remove Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="8">Your cart is empty</td>
            </tr>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                index={index}
                item={item}
                updateQuantity={updateQuantity}
                toggleSelect={toggleSelect}
                removeItem={removeItem}
              />
            ))
          )}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Total</th>
            <th>{calculateTotal()}</th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="cart-actions">
        <button onClick={handleCheckout}>Checkout Selected Items</button>
        <button onClick={handleSave}>Save Cart</button>
      </div>

    </div>
  )
}

export default Cart
