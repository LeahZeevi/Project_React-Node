import React, { useEffect, useRef, useState } from 'react'
import '../css/try.css'
import Item from '../interfaces/Items';
import { useDeleteItemMutation, useGetAllItemsMutation, useUpdateItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import Header1 from '../components/Header1';
import CurrentWorn from '../components/CurrentWorn';
import AddItemDialog from '../components/AddItemDialog';

// Define the type for the Header1 ref
type Header1Ref = {
    addItemsToLaundry: (items: Item[]) => void;
};

const MyWardrobe = () => {
    const categories = ['כל הקטגוריות', 'חולצות', 'חצאיות', 'מכנסים', 'שמלות', 'נעלים'];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [myWardrobe, setMyWardrobe] = useState<Item[]>([]);
    const [currentlyWornItems, setCurrentlyWornItems] = useState<Item[]>([]);
    const [addItemDialog, setAddItemDialog] = useState<boolean>(false)
    const [getAllItems] = useGetAllItemsMutation();
    const [updatedItem] = useUpdateItemMutation();
    const [deleteItem] = useDeleteItemMutation()
    const user: Users = useSelector(selectUser);
    const headerRef = useRef<Header1Ref>(null);

    const filteredItems =
        selectedCategory === 'all' || selectedCategory === 'כל הקטגוריות'
            ? myWardrobe
            : myWardrobe.filter(item => item.categoryName === selectedCategory);

    const handleWearItem = async (itemId: string,inUse:boolean) => {
        try {
            const inUseItems: Item[] = await updatedItem({ _id: itemId, inUse: inUse, userId: user._id }).unwrap();
            setCurrentlyWornItems(inUseItems)
        } catch (error) {
            console.error('Failed to update item:', error);
        }
        const updatedItems = myWardrobe.map(item =>
            item._id === itemId ? { ...item, inUse: !item.inUse } : item
        );
        setMyWardrobe(updatedItems);
    };

    const handleRemoveItem = async (itemForRemove: Item) => {
        try {
            await deleteItem(itemForRemove).unwrap();
            setMyWardrobe(prev => prev.filter(item => item._id !== itemForRemove._id));
        } catch (err) {
            console.error("שגיאה בהסרה:", err);
        }
    };

    const fetchWardrobe = async () => {
        try {
            const response: Item[] = await getAllItems(user._id).unwrap();
            if (response) {
                setMyWardrobe(response);
                const wornItems: Item[] = response.filter(item => item.inUse == true)
                setCurrentlyWornItems(wornItems);
            }
        } catch (error) {
            console.error('שגיאה בקבלת פריטים:', error);
        }
    };

    useEffect(() => {
        fetchWardrobe();
    }, []);

    const handleSendToLaundry = (items: Item[]) => {
        if (headerRef.current) {
            headerRef.current.addItemsToLaundry(items);
        }
    };

    return (
        <div className='page-content'>
            <Header1 ref={headerRef} />
            <CurrentWorn wornItems={currentlyWornItems} onRefresh={fetchWardrobe} onSendToLaundry={handleSendToLaundry} cancelWearning={handleWearItem}
            />
            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`tab ${(selectedCategory === category || (selectedCategory === 'all' && category === 'כל הקטגוריות')) ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category === 'כל הקטגוריות' ? 'all' : category)}>
                        {category}
                    </button>
                ))}

            </div>

            <div className="items-grid">
                {filteredItems.map(item => (
                    <div key={item._id} className={`item-card ${item.inUse ? 'worn' : ''}`}>
                        <button
                            className="remove-btn"
                            onClick={() => handleRemoveItem(item)}
                            title="הסר מהארון"
                        >
                            ✖
                        </button>
                        <div className="item-image">
                            <img src={`http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}`} alt={item.itemName} />
                            {item.inUse && <div className="worn-overlay">
                                ✓
                                <button className="overlay-button">העבר לסל הלבישה</button>
                            </div>}

                        </div>
                        <div className="item-info">
                            <h4>{item.itemName}</h4>
                            <p>{item.categoryName} • {item.session}</p>
                            <button
                                className={`wear-btn ${item.inUse ? 'worn' : ''}`}
                                onClick={() => handleWearItem(item._id,true)}
                                disabled={!!item.inUse}
                            >
                                {item.inUse ? 'בלבישה' : 'לבש'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="fab" onClick={() => setAddItemDialog(true)}>
                +
            </button>

            {addItemDialog && <AddItemDialog addItemDialogP={addItemDialog} setAddItemDialogP={setAddItemDialog} />}
        </div>
    );
};


export default MyWardrobe
