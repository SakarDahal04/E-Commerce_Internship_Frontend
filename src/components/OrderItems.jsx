import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!orderId) return; // avoid fetching if undefined

    fetch(`http://localhost:8000/api/order-items/by-order/${orderId}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTU1Njc2LCJpYXQiOjE3NTUxNTUzNzYsImp0aSI6IjRjYjUzNzUxYTkyYTQ1ZjRhNTkwZjBlM2YxNDVjMDJhIiwidXNlcl9pZCI6IjUifQ.PRXE5wCUAQxfJF_a9LC7ruMS19VeJ9PflXGFYmS_TYA"
      }
    })
      .then((res) => res.json())
      .then((data) => setItems(data.results || data))
      .catch((err) => console.error("Error fetching items:", err));
  }, [orderId]);

  return (
    <div>
      <h2>Order Items</h2>
      {items.length > 0 ? (
        <table className="order-items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.order?.id || item.order}</td>
                <td>{item.product?.name || "N/A"}</td>
                <td>{item.quantity}</td>
                <td>{item.price != null ? `$${Number(item.price).toFixed(2)}` : "N/A"}</td>
                <td>{item.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items found for this order.</p>
      )}
    </div>
  );
}
