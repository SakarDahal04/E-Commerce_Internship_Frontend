import { orders } from "../data/Orders";
import "./UserOrders.css";

export default function UserOrders(){
    return(
        <div>
            <h2>Orders</h2>
            <table border = "1" cellPadding = "8" className = "user-orders-table" style = {{ borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CUSTOMER</th>
                        <th> DATE </th>
                        <th>TOTAl</th>
                        <th>ITEMS COUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>(
                        <tr key = {order.id}>
                            <td>order.id</td>
                            <td>order.customer</td>
                            <td>order.date</td>
                            <td>order.total.toFixed(2)</td>
                            <td>{order.items.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
