import React from "react";
import {Logo} from "../../img";
import './navbar.scss'

const Navbar: React.FC = () => {
    return (
        <div className={'container_navbar'}>
            <div className="logo">
                <div>
                    <img src={Logo} alt="logo"/>
                </div>
                <div>Networking-Communication</div>
            </div>
            <div className="user">Дастан</div>
        </div>
    )
}

export default Navbar