import { NavLink, Link } from "react-router-dom"
// import styles from "./Navbar.module.css"
import "./Navbar.css"

import { NavData } from "../../data/Navdata"
import { DynamicIcon } from "../../utils/iconMap"

const RecursiveMenu = ({ items }) => {
    return (
        <ul className="subitems">
            {items.map((item, index) => (
                <li key={index} className={`subitem ${item.items ? "hasSubitems" : ""}`}>
                    <NavLink to={item.path || "#"} className="link">
                        {item.subtitle} {" "}
                        {item.items && (
                            <span className="submenu-icon">
                                <DynamicIcon iconName="FaChevronRight" />
                            </span>
                        )}
                    </NavLink>

                    {/* Recursive Call */}
                    {item.items && <RecursiveMenu items={item.items} />}
                </li>
            ))}
        </ul>
    )
}

const Navbar = () => {
    return (
        <nav className="navContainer">
            <div className="navContent">
                <div className="navLogo">
                    <h2>Intern-commerce</h2>
                </div>
                <ul className="navItems">
                    {
                        NavData.map((data, index) => {
                            return (
                                <li key={index} className={`navItem ${data.items ? "hasSubitems" : ""} `} >
                                    <NavLink to={data.path} className={({ isActive }) => isActive ? "navLink active" : "navLink"}>
                                        <DynamicIcon iconName={data.icon} className="navIcon" />
                                        <div className="linkContent">
                                            {data.title}{" "}
                                            {data.items && <DynamicIcon iconName="FaChevronDown" className="arrowIcon" />}
                                        </div>
                                    </NavLink>

                                    {data.items && (
                                        <RecursiveMenu items={data.items} />
                                    )}
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="navUserInfo">
                    <Link to={'/cart'}>
                        <DynamicIcon size={24} iconName={"FaShoppingCart"} />
                    </Link>
                    <Link to={"/login"}>
                        <button>Login</button>
                    </Link>
                    <Link to={"/register"}>
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar