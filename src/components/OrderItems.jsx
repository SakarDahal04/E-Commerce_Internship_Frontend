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
      const data = await api.get(`api/user_ordersorder-items?order_id=${orderId}`)

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
          {/* Title */}
          <h3 className="product-title">{item.product?.name || "N/A"}</h3>

          {/* Meta info */}
          <div className="product-meta">
            <span className="label">Quantity:</span>
            <span className="value">{item.quantity}</span>
          </div>

          <div className="product-meta">
            <span className="label">Price:</span>
            <span className="value">
              ${item.product != null ? Number(item.product.price).toFixed(2) : "N/A"}
            </span>
          </div>

          <div className="product-meta">
            <span className="label">Status:</span>
            <span
              className={`status-badge ${item.status?.toLowerCase() || "pending"}`}
            >
              {item.order?.status || "Pending"}
            </span>
          </div>

          <div className="product-meta">
            <span className="label">Order ID:</span>
            <span className="value">{item.order?.id || item.order}</span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="no-items">No items found for this order.</p>
  )}
</div>
  )}