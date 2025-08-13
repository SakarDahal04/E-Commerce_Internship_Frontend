import { useState } from 'react'
import './App.css'
import Product from './components/products/ProductList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Welcome !!!</h1>
    <Product />
    </>
  )
}

export default App
