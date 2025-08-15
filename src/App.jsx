import './App.css'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import RootLayout from './Layout/RootLayout'
import { AuthContextProvider } from './context/AuthContext'

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import CartLayout from './Layout/CartLayout'
import Cart from './components/Cart/Cart'
// import CartItem from './components/CartItem/CartItem'
import { fetchCartLoader, fetchOrderLoader } from './utils/loaders'
import Login from './pages/Login'
import { Outlet } from 'react-router-dom'
import Register from './pages/Register'
import PrivateRoute from './context/PrivateRoute'
import UserOrders from "./components/UserOrders";
import OrderItems from "./components/OrderItems";

function AuthWrapper() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  )
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AuthWrapper />}>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path='cart' element={
            <PrivateRoute>
              <CartLayout />
            </PrivateRoute>
          }>
            <Route index element={<Cart />} loader={fetchCartLoader} />
            {/* <Route path=':id' element={<CartItem />} /> */}
          </Route>

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path="orders" element={<UserOrders />} loader={fetchOrderLoader} />
        <Route path="/order-items/:orderId" element={<OrderItems />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App;
