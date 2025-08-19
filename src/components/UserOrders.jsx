import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./UserOrders.css";

import AuthContext from "../context/AuthContext";
import useGetOrders from "../hooks/useGetOrders";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  // const loadedOrderItems = useLoaderData()
  // console.log(loadedOrderItems)

  const getOrdersList = useGetOrders()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersList()
        setOrders(data.results)

        console.log("obrained: ", data.results)
      } catch (err) {
        console.log("Failed to fetch the orders: ", err.message)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="orders-grid">
      {orders.length > 0 ? orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h3>Order #{order.id}</h3>

          <div className="products-grid">
            {order.order_items.map((item, idx) => (
              <div className="product-card" key={idx}>
                <p><strong>{item.product.name}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${parseFloat(item.product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <p className="order-total">
            <strong>Total:</strong> $
            {order.order_items
              .reduce((sum, item) => sum + parseFloat(item.product.price), 0)
              .toFixed(2)}
          </p>

          <Link to={`/order-items/${order.id}`} className="view-link">
            View Items
          </Link>
        </div>
      )
    ) : <p>There are no orders placed till now.</p>}
    </div>
  )
}
