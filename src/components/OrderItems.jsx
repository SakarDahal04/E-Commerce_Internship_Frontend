import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderItems.css";

export default function OrderItems() {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/orders/${orderId}/items/`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, [orderId]);

  return (
    <div>
      <h2>Order Items</h2>
      <table
        border="1"
        cellPadding="8"
        className="order-items-table"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>ORDER-ID</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.orderId}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
