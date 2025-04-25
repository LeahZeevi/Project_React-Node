import { NavLink } from 'react-router'

const Header = () => {
  return (
    <div dir='rtl'>
      <nav style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw", backgroundColor: "gray", justifyContent: "space-around" }}>
        <div>
            <NavLink to='/' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>UserHomePage</NavLink>
        </div>
        <div>
        <NavLink to='/myWardrobe' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>MyWardrobe</NavLink>
        </div>
        <div>
        <NavLink to='/mySets' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>Mysets</NavLink>
        </div>
        <div>
        <NavLink to='/addItem' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>Add Item</NavLink>
        </div>
        <div>
        <NavLink to='/weather' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>Weather</NavLink>
        </div>
            <div>🗑️</div>
      </nav>
    </div>
  )
}

export default Header
