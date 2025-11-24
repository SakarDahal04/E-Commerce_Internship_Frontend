import { useEffect, useState, useContext } from "react"

import FilterContext from "../../context/FilterContext"

import useGetProductsData from "./../../hooks/useGetProductsData"

import Card from "./../../components/Card/Card"
import Filter from "../Filter/Filter"

import "./Product.css"

const Product = () => {
    const [productList, setProductList] = useState([])
    const [filters, setFilters] = useContext(FilterContext)
    const [categories, setCategories] = useState([])

    const getProductList = useGetProductsData(filters)
    
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const obtainedData = await getProductList()
                setProductList(obtainedData)
            } catch (error) {
                console.log("Error in getting product list", error)
            }
        }
        fetchProductList()
    }, [filters])

    // useEffect(() => {
    //     console.log("Updated productList: ", productList)
    // }, [productList])


    return (
        <div className="shopContainer">
            <div className="filterContainer">
                <Filter min={0}
                    max={2000}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)} />
            </div>
            <div className='shopProductContainer'>
                {
                    productList 
                    ?
                    productList.map((product) => (
                        <Card key={product.id} cardDetails={product} />
                    )) 
                    : 
                    <p>No Products with the provided filter found.</p>}
            </div>
        </div>
    )
}

export default Product