import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserOrders.css";

import { useLoaderData } from "react-router-dom";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  const loadedOrderItems = useLoaderData()

  console.log(loadedOrderItems)


  return (
    <div className="orders-grid">
      {loadedOrderItems.map((order) => (
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
  )
}