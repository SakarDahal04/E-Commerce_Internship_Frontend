import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Orders from "./components/Orders";
import OrderItems from "./components/OrderItems";

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/order-items" element={<OrderItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
