import { useEffect, useState } from 'react';
import { NavLink } from 'react-router'
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import Item from '../interfaces/Items';
import { useGetAllItemsMutation, useUpdateItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

const Header = () => {
  const [cartItems, setCartItems] = useState<Item[]>();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [, , removeCookie] = useCookies(['token']);
  const [getAllItems] = useGetAllItemsMutation();
    const [updateItem] = useUpdateItemMutation();

  const user: Users = useSelector(selectUser);
const handleUpdateItem = async ( _id: string) => {
  try {
    await updateItem({ _id:_id,inUse:false }).unwrap();
    allItemsInUse();
    // setCartItems(prev => prev?.filter(i => i._id !== _id));
  } catch (error) {
    console.error("שגיאה בעדכון הפריט:", error);
  }
};

  const closeBasket = () => {
    setIsSideNavOpen(false);

  };
  const HanddleLogOut = () => {
    removeCookie('token')
    localStorage.clear()
  }
  
    const allItemsInUse = async () => {
      try {
        setIsSideNavOpen(true);
        const response:Item[] = await getAllItems(user._id).unwrap()
                  console.log("response",response);
        if(response){
          
        const filterItems=response.filter(item=>item.inUse==true);
        setCartItems(filterItems);
        }
      }
      catch (error) {
        console.error('שגיאה בקבלת פריטים:', error);
      }
    };
  
console.log(cartItems);

  return (
    <div dir="rtl">
      <nav style={{ display: "flex", position: "fixed", top: 0, right: 0, left: 0, width: "100vw", backgroundColor: "gray", justifyContent: "space-around", zIndex: 100 }}>
        <div>
          {/* <NavLink to='/' style={({ isActive }) => ({ color: isActive ? "pink" : "palevioletred" })}>UserHomePage</NavLink> */}
          <Button onClick={HanddleLogOut}
            variant="text"
            sx={{
              background: 'none',
              boxShadow: 'none',
              padding: 0,
              minWidth: 'auto',
              textTransform: 'none',
              color: 'palevioletred',
              '&:hover': {
                background: 'none',
                textDecoration: 'underline',

              },
            }}

          > Exit ➡️</Button>
        </div>
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
        <div style={{ cursor: 'pointer' }} onClick={allItemsInUse}>🗑️</div>
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


        <button onClick={closeBasket} style={{ marginBottom: '10px' }}>סגור</button>
        {/* <h3>סל כביסה</h3>
        {cartItems?.length === 0 ? (
          <p>הסל ריק</p>
        ) : (
          <ul>
            {cartItems?.map((item, idx) => (
              <li key={idx}>{item.itemName}</li>
            ))}
          </ul>
        )} */}
        {cartItems?.length === 0 ? (
  <p>הסל ריק</p>
) : (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {cartItems?.map(item => (
      <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={item.itemName} // ודאי שזו התכונה הנכונה אצלך
          // alt={item.itemName}
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <button
         onClick={() => handleUpdateItem(item._id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'red',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          ❌
        </button>
      </div>
    ))}
  </div>
)}

      </div>

      {isSideNavOpen && (
        <div
          onClick={closeBasket}
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
