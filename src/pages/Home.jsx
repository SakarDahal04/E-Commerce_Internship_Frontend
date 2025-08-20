import { useEffect, useState } from "react"
import useGetProductsData from "../hooks/useGetProductsData"
import Card from "../components/Card/Card"

import "./../styles/Home.css"

const Home = () => {
  const [productList, setProductList] = useState([])
  const getProductList = useGetProductsData()

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const obtainedData = await getProductList()
        console.log("Result Obtained: ", obtainedData)
        setProductList(obtainedData)
      } catch (error) {
        console.log("Error in getting product list", error)
      }
    }
    fetchProductList()
  }, [])

  useEffect(() => {
    console.log("Updated productList: ", productList)
  }, [productList])

  return (
    <div>
      <div className="homeHeading">
        <h1>New Arrivals</h1>
        <p>
          Check out our new furniture collection! Cozy sofa, fancy chair, wooden casket, and many more. The new collection brings an informal elegance to your home.
        </p>
      </div>
      <div className="productGridContainer">
        {productList ? 
          productList.map((product) => (
          <Card key={product.id} cardDetails={product} />
        )) : <h2>There is not products to show</h2> }
      </div>
    </div>
  )
}

export default Home
