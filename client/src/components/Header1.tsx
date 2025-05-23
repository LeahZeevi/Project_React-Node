import React, { useState } from 'react'
import '../css/try.css'
import { NavLink } from 'react-router';
function Header1() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <div className="app">
            <header className="header">
                <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
                    ☰
                </button>
                <h1>הארון הדיגיטלי שלי</h1>
            </header>

            <nav className="drawer" style={{ right: `${drawerOpen ? '0' : '-300px'}`}}>
                <NavLink to="/" className={`menu-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}>
                    <span className="menu-icon">🏠</span>
                    בית
                </NavLink>
                <NavLink to="/myWardrobe"  className={`menu-item ${location.pathname === '/wardrobe' ? 'active' : ''}`}  onClick={() => setDrawerOpen(false)} >
                    <span className="menu-icon">👔</span>
                    הארון שלי
                </NavLink>
            </nav>
        </div>
    )
}

export default Header1
