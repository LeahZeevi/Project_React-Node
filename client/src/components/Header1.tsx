import React, { useState } from 'react'
import '../css/try.css'
import { NavLink } from 'react-router';
import Item from '../interfaces/Items';
import { useGetAllItemsMutation, useUpdateItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
const Header1 = React.forwardRef((props, ref) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState<Item[]>();
    const [getAllItems] = useGetAllItemsMutation();
    const [updateItem] = useUpdateItemMutation();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const user: Users = useSelector(selectUser);

    const addItemsToLaundry = (items: Item[]) => {
    setCartItems(prev => [...(prev ?? []), ...items]);
        setIsSideNavOpen(true); // לפתוח את סל הכביסה אם תרצי

    };
    React.useImperativeHandle(ref, () => ({
        addItemsToLaundry
    }));

    const handleUpdateItem = async (_id: string) => {
        try {
            await updateItem({ _id: _id, inUse: false,userId:user._id }).unwrap();
            // allItemsInUse();
        } catch (error) {
            console.error("שגיאה בעדכון הפריט:", error);
        }
    };
    const closeBasket = () => {
        setIsSideNavOpen(false);

    };
    // const allItemsInUse = async () => {
    //     try {
    //         setIsSideNavOpen(true);
    //         const response: Item[] = await getAllItems(user._id).unwrap()
    //         console.log("response", response);
    //         if (response) {

    //             const filterItems = response.filter(item => item.inUse == true);
    //             setCartItems(filterItems);
    //         }
    //     }
    //     catch (error) {
    //         console.error('שגיאה בקבלת פריטים:', error);
    //     }
    // };

const allItemsInUse = () => {
  setIsSideNavOpen(true); // רק פותח את סל הכביסה, לא משנה את הפריטים שבו
};
    return (
        <div className="app">
            <header className="header">
                <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
                    ☰
                </button>
                <h1>הארון הדיגיטלי שלי</h1>
                <img
                    src="../../public/laundry-machine_3322854.png"
                    alt="סל כביסה"
                    className="basket-icon"
                    onClick={allItemsInUse}
                />
            </header>

            <nav className="drawer" style={{ right: `${drawerOpen ? '0' : '-300px'}` }}>
                <NavLink to="/" className={`menu-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}>
                    <span className="menu-icon">🏠</span>
                    בית
                </NavLink>
                <NavLink to="/myWardrobe" className={`menu-item ${location.pathname === '/wardrobe' ? 'active' : ''}`} onClick={() => setDrawerOpen(false)} >
                    <span className="menu-icon">👔</span>
                    הארון שלי
                </NavLink>

            </nav>
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
                                    src={item.image} // ודאי שזו התכונה הנכונה אצלך
                                    // alt={item.itemName}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                                <h4>{item.itemName}</h4>
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
    )
})

export default Header1
