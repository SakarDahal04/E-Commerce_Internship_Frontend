import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY4NjEwLCJpYXQiOjE3NTUxNjgzMTAsImp0aSI6IjlhOWFhZjRiNmJiNzQ2N2Q4M2QzNDMwODc1Y2E4MTcxIiwidXNlcl9pZCI6IjUifQ.oKw8JF5tnASNe94KLAuCfnPKHO-hKbZacMIdpjNpaW8",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.results))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
   <div className="orders-grid">
  {orders.map((order) => (
    <div className="order-container" key={order.id}>
      <h3>Order #{order.id}</h3>
      <div className="products-grid">
        {order.order_items.map((item, idx) => (
          <div className="product-card" key={idx}>
            <p><strong>{item.product.name}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <p className="order-total">
        <strong>Total:</strong> $
        {order.order_items
          .reduce((sum, item) => sum + parseFloat(item.price), 0)
          .toFixed(2)}
      </p>
      <Link to={`/order-items/${order.id}`} className="view-link">
        View Items
      </Link>
    </div>
  ))}
</div>
  )}