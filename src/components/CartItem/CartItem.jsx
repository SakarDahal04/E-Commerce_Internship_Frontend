import CartIncDec from "../CartIncDec/CartIncDec"
import "./CartItem.css"
import { DynamicIcon } from "../../utils/iconMap"
import { createAxiosInstance } from "../../services/axiosConfig"
import AuthContext from "../../context/AuthContext"
import { useContext } from "react"

const CartItem = ({ index, item, updateQuantity, toggleSelect, removeItem }) => {

  const { authTokens, setAuthTokens, setUser } = useContext(AuthContext)
  const api = createAxiosInstance(authTokens, setAuthTokens, setUser)

  const deleteItem = async (e) => {
    try {
      const res = await api.delete(`/cart/checkout-request/`,
        {
          headers: { "Content-Type": "application/json" },
          data: [{ id: item.id }]
        }
      )

      console.log('Deleted Items', res.data)
      removeItem(item.id); 
    } catch (error) {
      console.log("Error in deleting the items: ", error.reponse?.data || error.message)
    }
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.product.name}</td>
      <td>{item.product.stock}</td>
      <td>{item.product.price}</td>
      <td className="cartUnits">
        <CartIncDec value="+" onClick={() => updateQuantity(index, 1)} />
        {item.quantity}
        {/* <input className="cartQuantity" type="number" /> */}
        <CartIncDec value="-" onClick={() => updateQuantity(index, -1)} />
      </td>
      {/* <td>{item.cartitem_subtotal}</td> */}
      <td>{item.quantity * item.product.price}</td>
      <td>
        <input
          type="checkbox"
          checked={item.selected_for_checkout}
          onChange={() => toggleSelect(index)}
        />
      </td>
      <td>
        <button onClick={deleteItem} className="delete-cart-item"><DynamicIcon iconName={"FaTrash"} /></button>
      </td>
    </tr>
  )
}

export default CartItem
