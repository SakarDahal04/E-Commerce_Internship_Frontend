import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTU1Njc2LCJpYXQiOjE3NTUxNTUzNzYsImp0aSI6IjRjYjUzNzUxYTkyYTQ1ZjRhNTkwZjBlM2YxNDVjMDJhIiwidXNlcl9pZCI6IjUifQ.PRXE5wCUAQxfJF_a9LC7ruMS19VeJ9PflXGFYmS_TYA",
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.results))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <table border="1" cellPadding="8" className="user-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>View Items</th>
              <th>Products</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <Link to={`/order-items/${order.id}`}>View Items</Link>
                </td>
                <td>
                  {order.order_items.map((item, idx) => (
                    <div key={idx}>
                      {item.product.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  {order.order_items
                    .reduce((sum, item) => sum + parseFloat(item.price), 0)
                    .toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
