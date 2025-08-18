import { useEffect, useState } from "react"
import useGetProductsData from "./../../hooks/useGetProductsData"
import Card from "./../../components/Card/Card"

import "./Product.css"

const Product = () => {
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
        <div className="shopContainer">
            <div>
                this is filter section
            </div>
            <div className='shopProductContainer'>
                {productList.map((product) => (
                    <Card key={product.id} cardDetails={product} />
                ))}
            </div>
        </div>
    )
}

export default Product