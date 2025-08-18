import { useEffect } from "react"
import useGetProductsData from "../hooks/useGetProductsData"

const Home = () => {

  const getProductList = useGetProductsData()

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const productList = await getProductList()
        console.log(productList)

      } catch (error) {
        console.log("Error in getting product list")
        
      }
    }

    fetchProductList()
  }, [])

  return (
    <div>lorem500</div>
  )
}

export default Home