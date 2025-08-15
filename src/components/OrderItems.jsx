import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";
import AuthContext from "../context/AuthContext";
import { createAxiosInstance } from "../services/axiosConfig";
import productImg from '/src/assets/ladies-tshirts.webp';

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  const { authTokens, setAuthTokens, setUser, logoutUser } = useContext(AuthContext)

  const api = createAxiosInstance(authTokens, setAuthTokens, setUser, logoutUser)

  useEffect(() => {
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
            <img
              src={item.product?.image || productImg}
              alt={item.product?.name || "Product"}
              className="product-image"
            />
            <div className="product-details">
              <h3>{item.product?.name || "N/A"}</h3>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.product != null ? Number(item.product.price).toFixed(2) : "N/A"}</p>


              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${item.status?.toLowerCase() || "pending"}`}>
                  {item.status || "Pending"}
                </span>
              </p>

              <p><strong>Order ID:</strong> {item.order?.id || item.order}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-items">No items found for this order.</p>
      )}
    </div>
  )
}
