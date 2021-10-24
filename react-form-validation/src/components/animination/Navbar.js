import React from 'react';
import GiftImage from './../../images/GiftImage.jpeg'
import './navbar-style.css';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <img className="gift-image " src={GiftImage} alt="image" />
            </div>
            <input type="checkbox" id="click" />
            <label for="click" className="menu-btn">
                <i className="fas fa-bars"></i>
            </label>
            <ul>
                <li>
                    <a href="/home-page">Home</a>
                </li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Feedback</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
