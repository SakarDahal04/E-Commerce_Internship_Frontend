import './css/search.css'
import Button from './Button.jsx'

function Search({ search }) {
        const myButton = {
                text: "SEARCH",
                textColor: 'green'
        }
        return (
                <div className='common-search-button'>
                        <input type="search" className='common-search' placeholder={search.searchPlaceholder ? search.searchPlaceholder : "Search it"} style={{'--text-color': search.textColor, '--width': search.width}}></input>
                        <Button button={myButton}/>
                </div>

        )
}

export default Search