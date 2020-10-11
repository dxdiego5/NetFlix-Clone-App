import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div class="header--logo">
                <a href="/">
                    <img  alt="Netflix" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"></img>
                </a>
            </div>
            <div class="header--user">
                <a href="/">
                    <img src="logo192.png" alt="Usuario"></img>
                </a>
            </div>
        </header>
    );
}