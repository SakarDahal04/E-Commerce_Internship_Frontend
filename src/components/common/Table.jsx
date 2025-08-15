import Search from "./Search";
import './css/table.css'
import { isDictionary, FilterDictionary } from "../products/filter_result";
import { SiContributorcovenant } from "react-icons/si";

function Table({ table }) {

    // let heading_list = []
    // for (const [key, value] of Object.entries(table.list)) {
    //     heading_list.push(key);
    // }
    let body_list = []
    for (let[key, value]  of Object.entries(table.list)) {
        if(isDictionary(value)){
            value = value.name
        }
        if(value==null){
            continue;
        }
        body_list.push([key, value])
    }

    return (
        <div>
            <h1>{table.heading}</h1>

                <table>
                    {body_list.map((eachRow)=> <tr key={eachRow[0]}> 
                        <td>{eachRow[0]}</td>
                        <td>{eachRow[1]}</td>
                         </tr>)}
                </table>
        </div>
    )

}

export default Table

// yesma use le input must chai: no of rows, no of columns and headings of each columns