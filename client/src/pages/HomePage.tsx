import React, { useEffect, useRef, useState } from 'react';
import CurrentOutfit from '../components/CurrentOutfit';
import WeatherWidget from '../components/WeatherWidget';
import Item from '../interfaces/Items';
import SavedLook from '../interfaces/SavedLook'; // Assuming you define this interface
import CurrentWorn from '../components/CurrentWorn';
import '../css/try.css'
import { useGetAllItemsQuery, useUpdateItemInUseMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { selectUser } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import CountUp from '../components/CountUp';
interface HomePageProps {
    currentOutfit: number[];
    myWardrobe: Item[];
    savedLooks: SavedLook[];
    wearHistory: { date: string; items: number[] }[];
    handleWearItem: (itemId: number) => void;
    saveLook: () => void;
}


const HomePage = () => {
    const user: Users = useSelector(selectUser);
    const [myWardrobe, setMyWardrobe] = useState<Item[]>([]);
     const { data, error, isLoading } = useGetAllItemsQuery(user._id);
    const [updateItemInUse] = useUpdateItemInUseMutation();
    const [currentOutfit, setCurrentOutfit] = useState<Item[]>([]);
    const headerRef = useRef<any>(null);

    const fetchWardrobe = async () => {
        try {
            if (data) {
                setMyWardrobe(data);
                const wornItems1 = myWardrobe.filter(item => item.inUse);

            }
        } catch (error) {
            console.error('שגיאה בקבלת פריטים:', error);
        }
    };
    useEffect(() => {
        fetchWardrobe();
    }, []);
    const wornItems1 = myWardrobe.filter(item => item.inUse);

    // Define the onSendToLaundry function
    const onSendToLaundry = (items: Item[]) => {
        console.log(`Send items to laundry`, items);
        setCurrentOutfit([]); // איפוס הלבוש הנוכחי
        headerRef.current?.addItemsToLaundry(items);
    };
    // const handleWearItem = (item: Item) => {
    //     if (!currentOutfit.find(i => i._id === item._id)) {
    //         setCurrentOutfit(prev => [...prev, item]);
    //     }
    // };
    const handleWearItem = async (item: Item, inUse: boolean) => {
        try {
            // setAlertItemId(itemId);
            // setShowAlert(inUse);
            const inUseItems: Item[] = await updateItemInUse({ _id: item._id, inUse: inUse, userId: user._id }).unwrap();
            // setCurrentlyWornItems(inUseItems)
        } catch (error) {
            console.error('Failed to update item inUse:', error);
        }
        const updatedItems = myWardrobe.map(item =>
            item._id === item._id ? { ...item, inUse: !item.inUse } : item
        );
        setMyWardrobe(updatedItems);
    };

    return (

        <div className="page-content">
            <WeatherWidget city="ירושלים" />
            {/* Pass the actual wardrobe data as a prop */}
            <CurrentWorn wornItems={wornItems1} onRefresh={fetchWardrobe} cancelWearning={handleWearItem} />
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">
                        {/* <Typography variant="h4"> */}
                        <CountUp target={myWardrobe.length} duration={900} />
                        {/* </Typography> */}
                    </div>
                    <div className="stat-label">פריטים בארון</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">1</div>
                    <div className="stat-label">לוקים שמורים</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">
                        <CountUp target={wornItems1.length} duration={200} />

                       </div>
                    <div className="stat-label">בלבישה</div>
                </div>
            </div>

            {/* <div className="section">
                <h3>לוקים אחרונים</h3>
                <div className="looks-grid">
                    {savedLooks.slice(-3).map(look => (
                        <div key={look._id} className="look-card">
                            <h4>{look.name}</h4>
                            <p className="look-date">{look.date}</p>
                            <div className="look-items">
                                {look.items.slice(0, 3).map(itemId => {
                                    const item = myWardrobe.find(i => i._id === String(itemId));
                                    return item ? (
                                        <span key={itemId} className="item-chip">
                                            {item.itemName}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    ))}
                </div> */}
            {/* </div> */}
        </div>
    );
};

export default HomePage;