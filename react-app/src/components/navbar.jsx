import React, { Component } from 'react';

// React will pass the props object as an argument to this function at runtime
const Navbar = ({ totalCounters }) => {


    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand">
                Navbar
                <span className="badge badge-pill badge-secondary">
                    { totalCounters }
                </span>
            </a>
        </nav>
    );
}
 
export default Navbar;