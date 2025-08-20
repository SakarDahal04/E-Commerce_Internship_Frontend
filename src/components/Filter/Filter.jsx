import { useState, useRef, useEffect, useCallback } from "react"

import "./Filter.css"
import { AvailabilityData, Categoriesdata, TagsData } from '../../data/Categoriesdata'

import { useContext } from "react"
import FilterContext from "../../context/FilterContext"
import useGetCategories from "../../hooks/useGetCategories"
import useGetProductsData from "../../hooks/useGetProductsData"


const Filter = ({ min, max, onChange }) => {

    const [filters, setFilters] = useContext(FilterContext)
    const [query, setQuery] = useState('')
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const [categories, setCategories] = useState([])

    // const getProductList = useGetProductsData(filters)
    const useGetCategoriesList = useGetCategories()

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(query)
        setFilters({
            ...filters,
            search: query
        })
    }

    useEffect(() => {
        const fetchCategoriesList = async () => {
            try {
                const data = await useGetCategoriesList()
                setCategories(data)
            } catch (error) {
                console.log("Error in getting the categories: ", error)
            }
        }
        fetchCategoriesList();
    }, [])

    const handleCategoryChange = (categoryId) => {
        setFilters({
            ...filters,
            category: filters.category === categoryId ? null : categoryId
        });
    }

    const handlePriceRangeChange = () => {
        setFilters({
            ...filters,
            minPrice: minVal,
            maxPrice: maxVal
        })
    }


    const handleTagChange = (tagId) => {
        const tags = filters.tags.includes(tagId)
            ? filters.tags.filter(id => id !== tagId)
            : [...filters.tags, tagId];
        setFilters({ ...filters, tags });
    }

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <>
            <form className="searchContainer" onSubmit={handleSearch}>
                <input 
                    type="text"
                    onChange={(e) => setQuery(e.target.value)} 
                    value={query}
                />
                <button>Search</button>
            </form>

            <div className='categories'>
                <h2 className="filterHeading">CATEGORIES</h2>
                <ul className="categoriesList">
                    {categories.map((category, index) => (
                        <li className='categoryItem' key={`cat-${index}`}>
                            <input
                                type="checkbox"
                                value={category.name}
                                id={`cat-${index}`}
                                checked={filters.category === category.id}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label htmlFor={`cat-${index}`}>{category.name}</label>
                        </li>)
                    )}
                </ul>
            </div>

            <div className="price">
                <h2 className="filterHeading">PRICE</h2>
                <div className="priceContainer">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        onChange={(event) => {
                            const value = Math.min(Number(event.target.value), maxVal - 1);
                            setMinVal(value);
                            minValRef.current = value;
                        }}
                        onMouseUp={handlePriceRangeChange}
                        onTouchEnd={handlePriceRangeChange}
                        className="thumb thumb--left"
                    />

                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        onChange={(event) => {
                            const value = Math.max(Number(event.target.value), minVal + 1);
                            setMaxVal(value);
                            maxValRef.current = value;
                        }}
                        onMouseUp={handlePriceRangeChange}
                        onTouchEnd={handlePriceRangeChange}
                        className="thumb thumb--right"
                    />

                    <div className="slider">
                        <div className="slider__track" />
                        <div ref={range} className="slider__range" />
                        <div className="slider__left-value">{minVal}</div>
                        <div className="slider__right-value">{maxVal}</div>
                    </div>
                </div>
            </div>

            <div className="tags">
                <h2 className="filterHeading">TAGS</h2>
                <ul className="categoriesList">
                    {TagsData.map((tag, index) => (
                        <li className='categoryItem' key={`tag-${index}`}>
                            <input
                                type="checkbox"
                                value={tag.name}
                                id={`tag-${index}`}
                                onChange={() => handleTagChange(tag.id)} />
                            <label htmlFor={`tag-${index}`}>{tag.name}</label>
                        </li>)
                    )}
                </ul>
            </div>

            <div className="availability">
                <h2 className="filterHeading">AVAILABILITY</h2>
                <ul className="categoriesList">
                    {AvailabilityData.map((avail, index) => (
                        <li className='categoryItem' key={`avail-${index}`}>
                            <input type="checkbox" value={avail.name} id={`avail-${index}`} />
                            <label htmlFor={`avail-${index}`}>{avail.name}</label>
                        </li>)
                    )}
                </ul>
            </div>
        </>
    )
}

export default Filter