import React from 'react'
// import styles from "./Footer.module.css"
import "./Footer.css"


import { Link } from 'react-router-dom'
import { DynamicIcon } from '../../utils/iconMap'
import { SocialData } from '../../data/Socialdata'
import { FooterData } from '../../data/Footerdata'

const Footer = () => {
    return (
        <footer>
            <div className="footerContent">
                <div className="leftContent">
                    <div className="logo"><h2>Intern-commerce</h2></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reprehenderit aspernatur amet libero quaerat ipsum non nesciunt doloribus sint. Et.</p>
                    <ul className="socialIcons">
                        {SocialData.map((social, index) => {
                            return (
                                <li key={index}>
                                    {/* hello */}
                                    <Link to={social.link}>
                                        <DynamicIcon iconName={social.icon} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="rightContent">
                    {FooterData.map((info, index) => {
                        return (
                            <div className="infoContainer" key={index}>
                                <h2>{info.heading}</h2>
                                <div className="infoLinks">
                                    {info.items.map((infoLinks, infoIndex) => {
                                        return (
                                            <Link to={infoLinks.link} key={infoIndex} >
                                                {infoLinks.title}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr />
            <div className="copyright-container">
                <p>&copy; 2025 powered by Intern-commerce</p>
            </div>
        </footer>
    )
}

export default Footer