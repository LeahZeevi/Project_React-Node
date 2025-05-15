import { useState } from 'react';
import { NavLink } from 'react-router'
import Item from '../interfaces/Items';
import { useSelector } from 'react-redux';
import { selectItemsInUse } from '../redux/slices/itemsSlice';

const Header = () => {

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
const cartItems = useSelector(selectItemsInUse);

  const toggleSideNav = () => {
    setIsSideNavOpen(prev => !prev);
  };

   return (
    <div dir="rtl">
      <nav style={{ display: "flex", position: "fixed", top: 0, right: 0, left: 0, width: "100vw", backgroundColor: "gray", justifyContent: "space-around", zIndex: 100 }}>
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
        <div style={{ cursor: 'pointer' }} onClick={toggleSideNav}>🗑️</div>
      </nav>

      {/* Side Nav */}
   <div
  style={{
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: isSideNavOpen ? 0 : '-340px', // או -320px קצת יותר מחוץ למסך
    width: '300px',
    backgroundColor: '#eee',
    boxShadow: '2px 0 5px rgba(0,0,0,0.3)', // גם הצללה קצת הפוכה
    transition: 'left 0.3s ease', // עדכון אנימציה ל־left
    padding: '20px',
    zIndex: 200,
    overflowY: 'auto',
  }}
>


        <button onClick={toggleSideNav} style={{ marginBottom: '10px' }}>סגור</button>
        <h3>סל כביסה</h3>
        {cartItems.length === 0 ? (
          <p>הסל ריק</p>
        ) : (
          <ul>
            {cartItems?.map((item, idx) => (
              <li key={idx}>{item.url}</li>
            ))}
          </ul>
        )}
      </div>

      {isSideNavOpen && (
        <div
          onClick={toggleSideNav}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 150,
          }}
        />
      )}
    </div>
  );
};

export default Header
