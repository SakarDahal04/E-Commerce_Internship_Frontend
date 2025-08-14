import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://localhost:8000/api/order-items/by-order/${orderId}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY2NDQ1LCJpYXQiOjE3NTUxNjYxNDUsImp0aSI6IjYxYzM4NWI5NDI2ZTRlNjQ4OTJhOWM2Yjg0NTNjMWY0IiwidXNlcl9pZCI6IjUifQ.FtIAL0DDyte25mqxZgU732kq3XnUJ4SWF4bG6u6fhjg"
      }
    })
      .then((res) => res.json())
      .then((data) => setItems(data.results || data))
      .catch((err) => console.error("Error fetching items:", err));
  }, [orderId]);

  return (
    <div className="orders-grid">
      {items.length > 0 ? (
        items.map((item) => (
          <div className="product-card" key={item.id}>
            <h3>{item.product?.name || "N/A"}</h3>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${item.price != null ? Number(item.price).toFixed(2) : "N/A"}</p>
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
