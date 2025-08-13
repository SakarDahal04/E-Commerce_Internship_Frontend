import React, { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserOrders from "./components/UserOrders";
import OrderItems from "./components/OrderItems";

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="orders" element={<UserOrders />} />
        <Route path="order-items" element={<OrderItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
