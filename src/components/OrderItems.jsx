import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";
import productImg from '/src/assets/ladies-tshirts.webp';

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://localhost:8000/api/order-items/by-order/${orderId}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MjU1NzA5LCJpYXQiOjE3NTUyNTU0MDksImp0aSI6IjQ1Yzc2NDIzMTJiYTQwMTM4MTkwZjlhODBlMDU0OGRhIiwidXNlcl9pZCI6IjUifQ.fJjZgOsXJO7t_uHTWiDZ-Agde0h9w_XrZaUsNlndO74"
      }
    })
      .then(res => res.json())
      .then(data => setItems(data.results || data))
      .catch(err => console.error("Error fetching items:", err));
  }, [orderId]);

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
          <p><strong>Price:</strong> ${item.price != null ? Number(item.price).toFixed(2) : "N/A"}</p>
          
         
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
  )}