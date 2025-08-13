import { orderItems } from "../data/OrderItems";
import "./OrderItems.css";


export default function OrderItems() {
  return (
    <div>
      <h2>Order Items</h2>
      <table border="1" cellPadding="8" className = "order-items-table" style={{ borderCollapse: "collapse" }}>
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
          {orderItems.map((item) => (
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
