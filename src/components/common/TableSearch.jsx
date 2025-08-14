import Search from "./Search";
import './css/tablesearch.css'

function TableSearch({ table }) {
    let heading_list = []
    for (const [key, value] of Object.entries(table.list)) {
        heading_list.push(key);
    }
    let body_list = [[]]
    for (const eachRow of Object.values(table.list)) {
        const valuesInEachRow = []
        for( const eachValue in eachRow){
            valuesInEachRow.push(eachValue);
        }
        body_list.push(valuesInEachRow)
    }

    return (
        <div>
            <h1>{table.heading}</h1>
            <table>
                <thead>
                    <tr key={heading_list[0]}>
                        {heading_list.map((eachItem) => <th>{eachItem}</th>)}
                    </tr></thead>
                <tbody>
                    {body_list.map((eachRow)=> <tr key={eachRow[0]}> {eachRow.map((eachItem)=> <td> {eachItem} </td>)}</tr>)}
                    <tr>
                        {body_list.map((eachItem) => <td>{eachItem}</td>)}
                    </tr>

                </tbody>
            </table>
        </div>
    )

}

export default TableSearch

// yesma use le input must chai: no of rows, no of columns and headings of each columns