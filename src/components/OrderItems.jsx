import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";
import AuthContext from "../context/AuthContext";
import { createAxiosInstance } from "../services/axiosConfig";

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  const {authTokens, setAuthTokens, setUser, logoutUser} = useContext(AuthContext)
  
  const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

  useEffect( ()=> {
    const fetchOrderItemDetail = async () => {
      const data = await api.get(`api/user_ordersorder-items/`)

      console.log("Order items", data)

      setItems(data.data)
    }

    fetchOrderItemDetail()
  }, [])

  return (
    <div className="orders-grid">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="product-card" key={item.id}>
            <h3>{item.product?.name || "N/A"}</h3>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${item.product != null ? Number(item.product.price).toFixed(2) : "N/A"}</p>
            <p><strong>Status:</strong> {item.status || "Pending"}</p>
            <p><strong>Order ID:</strong> {item.order?.id || item.order}</p>
          </div>
        ))
      ) : (
        <p>No items found for this order.</p>
      )}
    </div>
  );
}
