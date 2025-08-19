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

        console.log("obtained: ", data.results)
      } catch (err) {
        console.log("Failed to fetch the orders: ", err.message)
      }
    }

    fetchOrders()
  }, [])

  return (
<div className="orders-grid">
  {orders.length > 0 ? (
    orders.map((order) => (
      <div className="order-card" key={order.id}>
        {/* Order Title */}
        <h3 className="order-title">Order - {order.id}</h3>
        <p className="order-date">
          Placed on {new Date(order.created_at).toLocaleDateString()}
        </p>

        {/* Products */}
        <div className="products-grid">
          {order.order_items.map((item, idx) => (
            <div className="product-card" key={idx}>
              <p className="product-name">{item.product.name}</p>
              <p className="product-quantity">× {item.quantity}</p>
              <p className="product-price">
                ${parseFloat(item.product.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="order-footer">
          <p className="order-total">
            Total: <span>${order.order_items
              .reduce(
                (sum, item) =>
                  sum + parseFloat(item.product.price) * item.quantity,
                0
              )
              .toFixed(2)}</span>
          </p>
          <Link to={`/order-items/${order.id}`} className="view-link">
            View Details →
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p>There are no orders placed till now.</p>
  )}
</div>
  )}