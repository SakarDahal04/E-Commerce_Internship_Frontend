import { createContext, useEffect, useState } from "react";

const FilterContext = createContext()

export const FilterContextProvider = ({ children }) => {
    const filterKeys = useState({
        category: null,
        tags: [],
        minPrice:0,
        maxPrice:2000,
        search:""
    });


    return (<FilterContext.Provider value={filterKeys}>
        {children || null}
    </FilterContext.Provider>)
}

export default FilterContext;