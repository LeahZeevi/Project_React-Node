
import React, { useEffect, useState } from 'react';
import '../css/try.css';
import Item from '../interfaces/Items';
import { useDeleteItemMutation, useGetAllItemsMutation, useUpdateItemInLaundryBasketMutation, useUpdateItemInUseMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { selectAllItems, setAllItems, setItemsInLaundry, setItemsInUse } from '../redux/slices/itemSlice';
import AddItemDialog from '../components/AddItemDialog';
import CurrentWorn from '../components/CurrentWorn';
import HistoryAlert from '../components/HistoryAlert';
import FilterMenu from '../components/FilterMenu';



const MyWardrobe = () => {
    console.log("MyWardrobe");

    const categories = ['כל הקטגוריות', 'חולצות', 'חצאיות', 'מכנסים', 'שמלות', 'נעלים'];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const allItems = useSelector(selectAllItems);
    const [myWardrobe, setMyWardrobe] = useState<Item[]>(allItems);
    const [showAlert, setShowAlert] = useState(false);
    const [alertItemId, setAlertItemId] = useState<string | null>(null);
    const [currentlyWornItems, setCurrentlyWornItems] = useState<Item[]>([]);
    const [addItemDialog, setAddItemDialog] = useState(false);
    const dispatch=useDispatch();
    const [getAllItems] = useGetAllItemsMutation();
    const [updateItemInUse] = useUpdateItemInUseMutation();
    const [deleteItem] = useDeleteItemMutation()
    const [updateItemInLaundry] = useUpdateItemInLaundryBasketMutation();
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const user: Users = useSelector(selectUser);
    // const headerRef = useRef<Header1Ref>(null);
    const filteredItems = myWardrobe.filter(item => {
        if (selectedCategory !== 'all' && item.categoryName !== selectedCategory) return false;
        if (!selectedFilter) return true;
        return (
            item.session === selectedFilter ||
            item.style === selectedFilter // תלוי מה בדיוק את מסננת
        );
    });

    const handleWearItem = async (item: Item, inUse: boolean) => {
        try {
            setAlertItemId(item._id);
            setShowAlert(inUse);
            const inUseItems: Item[] = await updateItemInUse({ _id: item._id, inUse: inUse, userId: user._id }).unwrap();
            setCurrentlyWornItems(inUseItems)
        } catch (error) {
            console.error('Failed to update item inUse:', error);
        }
        const updatedItems = myWardrobe.map(item =>
            item._id === item._id ? { ...item, inUse: !item.inUse } : item
        );
        setMyWardrobe(updatedItems);
    }

    const handleRemoveItem = async (itemForRemove: Item) => {
        try {
            await deleteItem(itemForRemove).unwrap();
            setMyWardrobe(prev => prev.filter(item => item._id !== itemForRemove._id));
        } catch (err) {
            console.error("שגיאה בהסרה:", err);
        }
    };

    const fetchWardrobe = async () => {
        if (myWardrobe.length === 0) {
            try {
                const response = await getAllItems(user._id).unwrap();
                dispatch(setAllItems(response));
                setMyWardrobe(response);
                setCurrentlyWornItems(response.filter(i => i.inUse));
            } catch (err) {
                console.error('שגיאה בקבלת פריטים:', err);
            }
        }
        else {
            setCurrentlyWornItems(myWardrobe.filter(item => item.inUse));
        }
    };

    useEffect(() => {
        fetchWardrobe();
    }, [allItems]);
    console.log("allItems", allItems);


    const handleUpdateItem = async (item: Item, inUse: boolean) => {
        try {
            const updated = await updateItemInUse({ _id: item._id, inUse, userId: user._id }).unwrap();
            dispatch(setItemsInUse(updated));
            dispatch(setAllItems(updated));
            setMyWardrobe(prev => prev.map(i => i._id === item._id ? { ...i, inUse } : i));
            setCurrentlyWornItems(updated);
        } catch (err) {
            console.error('שגיאה בעדכון לבישה:', err);
        }
    };

    const handleSendToLaundry = async (item: Item, inLaundry: boolean) => {
        try {
            const updated = await updateItemInLaundry({ _id: item._id, inLaundryBasket: inLaundry, userId: user._id }).unwrap();
            dispatch(setItemsInLaundry(updated));
            setMyWardrobe(prev => prev.map(i => i._id === item._id ? { ...i, inLaundryBasket: inLaundry } : i));
        } catch (err) {
            console.error('שגיאה בשליחת לכביסה:', err);
        }
    };



    return (
        <div className='page-content'>
            {/* <Header1 ref={headerRef} /> */}
            <CurrentWorn wornItems={currentlyWornItems} onRefresh={fetchWardrobe} cancelWearning={handleWearItem}
            />

            <div className="category-tabs">
                <FilterMenu onFilterSelect={(filter) => setSelectedFilter(filter)} />


                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`tab ${selectedCategory === cat || (selectedCategory === 'all' && cat === 'כל הקטגוריות') ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat === 'כל הקטגוריות' ? 'all' : cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="items-grid">
                {filteredItems.map(item => (
                    <div key={item._id} className={`item-card ${item.inUse || item.inLaundryBasket ? 'worn' : ''}`}>
                        <button className="remove-btn" onClick={() => handleRemoveItem(item)} title="הסר מהארון">✖</button>
                        <div className="item-image">
                            <img src={`http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}`} alt={item.itemName} />

                            {(item.inUse || item.inLaundryBasket) && (
                                <div className="worn-overlay">
                                    ✓
                                    <button
                                        className={`overlay-button ${item.inLaundryBasket ? 'clicked' : ''}`}
                                        onClick={(e) => {
                                            if (!item.inLaundryBasket) {
                                                e.currentTarget.classList.add("clicked");
                                                e.currentTarget.disabled = true;
                                                handleSendToLaundry(item, true);
                                            }
                                        }}
                                        disabled={!!item.inLaundryBasket}
                                    >
                                        העבר לסל כביסה
                                    </button>
                                    <label>{item.inLaundryBasket.toString()}</label>
                                </div>
                            )}
                        </div>
                        <div className="item-info">
                            <h4>{item.itemName}</h4>
                            <p>{item.categoryName} • {item.session}</p>
                            <button

                                className={`wear-btn ${item.inUse || item.inLaundryBasket ? 'worn' : ''}`}
                                onClick={() => handleUpdateItem(item, true)}
                                disabled={!!item.inUse}
                            >
                                {item.inUse || item.inLaundryBasket ? 'בלבישה' : 'לבש'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="fab" onClick={() => setAddItemDialog(true)}>+</button>


            {addItemDialog && <AddItemDialog addItemDialogP={addItemDialog} setAddItemDialogP={setAddItemDialog} />}
            {alertItemId && (
                <HistoryAlert
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    item_Id={alertItemId}
                />
            )}
        </div>
    );
};

export default MyWardrobe;

