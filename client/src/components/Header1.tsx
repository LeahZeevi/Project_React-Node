import React, { useEffect, useState } from 'react'
import '../css/try.css'
import { NavLink } from 'react-router';
import Item from '../interfaces/Items';
import { useGetAllItemsQuery, useUpdateItemInLaundryBasketMutation, useUpdateItemInUseMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { selectAllItems, selectItemInLaundry, setAllItems, setItemsInLaundry, updateAllItems } from '../redux/slices/itemSlice';
import { useDispatch } from 'react-redux';
import { set } from 'react-hook-form';
import useUpdateItem from '../hooks/useUpdateItem';
const Header1 = () => {
  
    console.log("Header");
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [updateItemInLaundry] = useUpdateItemInLaundryBasketMutation();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const user: Users = useSelector(selectUser);
const [itemInLaundryBasket, setItemsInLaundryBasket] = useState<Item[]>(useSelector(selectItemInLaundry));
    const dispatch = useDispatch();
      const { updateItem } = useUpdateItem();
    const { data, error, isLoading } = useGetAllItemsQuery(user._id);
     const myWardrobe = useSelector(selectAllItems);
 

    const handleUpdateItem = async (_id: string) => {
        try {
            const response = await updateItemInLaundry({ _id: _id, inLaundryBasket: false, userId: user._id }).unwrap();
            const updateItems: Item[] = response.itemsInLaundry;
            dispatch(setItemsInLaundry(updateItems));
            setItemsInLaundryBasket(updateItems);
            dispatch(updateAllItems(updateItems));
        } catch (error) {
            console.error("שגיאה בעדכון הפריט:", error);
        }
    };
    const closeBasket = () => {
        setIsSideNavOpen(false);
    };

    const allItemsInLaundry =async () => {
        setIsSideNavOpen(true);
        await fetchWardrobe();
    };

 

        const fetchWardrobe = async () => {
            if (myWardrobe.length === 0) {
                try {
                    const items = data ? data : [];
                    dispatch(setAllItems(items));
                } catch (err) {
                    console.error('שגיאה בקבלת פריטים:', err);
                }
            }
        };
    
        useEffect(() => {
            fetchWardrobe();
        }, [data]);
    
      

    useEffect(() => {
        fetchWardrobe();
    }, []);

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
                    onClick={allItemsInLaundry}
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
                   <NavLink to="/graphs" className={`menu-item ${location.pathname === '/graphs' ? 'active' : ''}`} onClick={() => setDrawerOpen(false)} >
                    <span className="menu-icon">📊</span>
                    ניתוח נתוני לבישה
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
                 {itemInLaundryBasket?.length === 0 ? (
                    <p>הסל ריק</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {itemInLaundryBasket?.map(item => (
                            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img
                                    src={item.image}
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

}

export default Header1





























