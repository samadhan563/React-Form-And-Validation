import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar-style.css';


const Navbar = () => {

    const navbarLinks = useRef(null);
    const handleNavbarButton = (e) => {
        navbarLinks.current.classList.toggle('menu-collapse');
    };

    const hideNavMenu = () => {
        if (!navbarLinks.current.classList.contains('menu-collapse')) {
            navbarLinks.current.classList.add('menu-collapse');
        }
    }

    return (
        <div className="App">
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link href="#" className='brand-title'>Brand Name</Link>
                    <button onClick={(e) => { handleNavbarButton(e); }} className='navbar-toggler'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div ref={navbarLinks} className='navbar-links menu-collapse'>
                        <ul className='links-list'>
                            <li className='nav-item'>
                                <Link activeClassName='is-active' exact className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link activeClassName='is-active' exact className='nav-link' to='/about'>About</Link>
                            </li>
                            <li className='nav-item'>
                                <Link activeClassName='is-active' exact className='nav-link' to='/registartion-from'>Register New</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <AllRoutes hideMenu={() => { hideNavMenu(); }}></AllRoutes>
            </div>
        </div>
    );
}

function AllRoutes({ hideMenu }) {

    let location = useLocation();
    useEffect(() => {
        hideMenu();
    }, [location]);

    return (
        <>
            <Link to="/about" >
            </Link>
            <Link to="/contact" >
            </Link>
            <Link to="/registartion-from" >
            </Link>
        </>
    );
}

export default Navbar;
