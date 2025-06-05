
import { useEffect, useState } from 'react';
import '../css/try.css';
import Item from '../interfaces/Items';
import { useDeleteItemMutation, useGetAllItemsQuery, useUpdateItemInLaundryBasketMutation, useUpdateItemInUseMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { selectAllItems, selectItemInUse, setAllItems, setItemsInLaundry, setItemsInUse, updateAllItems } from '../redux/slices/itemSlice';
import AddItemDialog from '../components/AddItemDialog';
import CurrentWorn from '../components/CurrentWorn';
import HistoryAlert from '../components/HistoryAlert';
import FilterMenu from '../components/FilterMenu';
import useUpdateItem from '../hooks/useUpdateItem';
import ShirtHangerLoader from '../components/ShirtHangerLoader';
import ErrorPage from './ErrorPage';


//Showing my entire wardrobe
const MyWardrobe = () => {

    const categories = ['כל הקטגוריות', 'חולצות', 'חצאיות', 'מכנסים', 'שמלות', 'נעלים'];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAlert, setShowAlert] = useState(false);
    const [alertItemId, setAlertItemId] = useState<string | null>(null);
    const [addItemDialog, setAddItemDialog] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [deleteItem] = useDeleteItemMutation()
    const [updateItemInLaundry] = useUpdateItemInLaundryBasketMutation();
    const user: Users = useSelector(selectUser);
    const myWardrobe = useSelector(selectAllItems);
    const { updateItem } = useUpdateItem();
    const { data, error, isLoading } = useGetAllItemsQuery(user._id);

//Filters the items according to the desired category.
    const filteredItems = myWardrobe.filter(item => {
        if (selectedCategory !== 'all' && item.categoryName !== selectedCategory)
            return false;
        if (!selectedFilter)
            return true;
        return (
            item.session === selectedFilter ||
            item.style === selectedFilter
        );
    });

    //לא גמור
    const handleRemoveItem = async (itemForRemove: Item) => {
        try {
            await deleteItem(itemForRemove).unwrap();
        } catch (err) {
            console.error("שגיאה בהסרה:", err);
        }
    };
//Sending the item to the laundry basket
    const handleSendToLaundry = async (item: Item, inLaundry: boolean) => {//כאן רק מכניסים לסל הכביסה ולא מוציאים
        try {
            const { itemsInLaundry, updatedItem } = await updateItemInLaundry({ _id: item._id, inLaundryBasket: inLaundry, userId: user._id }).unwrap();
            dispatch(setItemsInLaundry(itemsInLaundry));
            dispatch(updateAllItems(itemsInLaundry))
        } catch (err) {
            console.error('שגיאה בשליחת לכביסה:', err);
        }
    };
//Updates a single item's usage status
    const handleUpdateItem = async (item: Item, inUse: boolean) => {
        updateItem(item, inUse);
        if (inUse === true) {
            setAlertItemId(item._id);
            setShowAlert(true)
        }
    };
//Reorganizing the items in the wardrobe
    const fetchWardrobe = async () => {
        if (myWardrobe.length === 0) {
            const items = data ? data : [];
            dispatch(setAllItems(items));
        }
    };
//Reorganizing the items in the wardrobe
    useEffect(() => {
        fetchWardrobe();
    }, [data]);
    
//Listen to the status. If you update something, they will see the updates on the screen.
    useEffect(() => {
    }, [myWardrobe]);

    return (
        <>
            {isLoading ? (
                <ShirtHangerLoader />
            ) : error ? (
                <ErrorPage errorMessage="There is a problem loading the site. Please try again later." />
            ) : (
                <div className='page-content'>

            {/* Shows the details of the clothing */}
                    <CurrentWorn />

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
                                        </div>
                                    )}
                                </div>
                                <div className="item-info">
                                    <h4>{item.itemName}</h4>
                                    <p>{item.categoryName} • {item.session}</p>
                                    <button className={`wear-btn ${item.inUse || item.inLaundryBasket ? 'worn' : ''}`}
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
            )}
        </>
    )
};

export default MyWardrobe;

