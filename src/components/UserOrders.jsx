import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY0NDcyLCJpYXQiOjE3NTUxNjQxNzIsImp0aSI6IjdkMDJhNzdlZTcwNTQwOGY4ZDJjZGFkY2FiZTJjMjg4IiwidXNlcl9pZCI6IjUifQ.mh84SaRgvBg1NScEWRzZB9q7nFh4FG0Y1-xz5OWIFzU",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.results))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
   <div className="orders-grid">
  {orders.map((order) => (
    <div className="order-card" key={order.id}>
      <h3>Order #{order.id}</h3>
      <p>
        <strong>Products:</strong>
        {order.order_items.map((item, idx) => (
          <span key={idx} className={`status-badge ${order.status.toLowerCase()}`} >
            {item.product.name} x {item.quantity}{" "}
          </span>
        ))}
      </p>
      <p>
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
