import React from 'react'
import './css/search.css'
import Button from './Button.jsx'

function Search({ search }) {
    const myButton = {
        text: "SEARCH",
        onClickFunction: search.onSearch, 
        textColor: 'green'
    }
    return (
        <div className='common-search-button'>
            <input type="search" 
                className='common-search' 
                placeholder={search.searchPlaceholder ? search.searchPlaceholder : "Search it"} 
                value ={search.value}    
                onChange={(e) => search.onChange(e.target.value)}  
                style={{ '--text-color': search.textColor, '--width': search.width }} />
            <Button button={myButton} />
        </div>
    )
}

export default Search