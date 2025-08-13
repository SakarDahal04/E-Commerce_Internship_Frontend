import { useState, useEffect } from "react";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders",{
        headers:{
            "Content-Type" : "application/json",
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MDg2NzA4LCJpYXQiOjE3NTUwODY0MDgsImp0aSI6ImUzYjU4YTc2MTUwMDQ0YTc4OTg5N2VkM2IzYzNlYWNiIiwidXNlcl9pZCI6IjUifQ.OsTnMLRRkk6Nr7of5QxN2oYNZVnuCB79PamgmuiwlOI"
            
        }
    })
      .then((res) => {
        return res.json()
    })
      .then((data) => {
         setOrders(data.results)
        console.log(data.results)
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  
  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <table border="1" cellPadding="8" className = "user-orders-table ">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.order_items.map((item, idx) => (
                <tr key={`${order.id}-${idx}`}>
                  <td>{order.id}</td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}