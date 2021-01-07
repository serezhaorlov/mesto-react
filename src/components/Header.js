import React from 'react';
import logo from '../images/logo-image.svg';

function Header () {
    return (
        <header className="header">
            <img src={logo} alt="логотип-место" className="header__logo" />
        </header>
    )
}


export default Header;