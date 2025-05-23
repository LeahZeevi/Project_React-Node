import React from 'react';
import CurrentOutfit from '../components/CurrentOutfit';
import WeatherWidget from '../components/WeatherWidget';
import Item from '../interfaces/Items';
import SavedLook from '../interfaces/SavedLook'; // Assuming you define this interface
import CurrentWorn from '../components/CurrentWorn';
import '../css/try.css'
interface HomePageProps {
    currentOutfit: number[];
    myWardrobe: Item[];
    savedLooks: SavedLook[];
    wearHistory: { date: string; items: number[] }[];
    handleWearItem: (itemId: number) => void;
    saveLook: () => void;
}

const HomePage = () => {
    {console.log("HomePage");
    }
    return (
        
        <div className="page-content">
            <WeatherWidget city="ירושלים" />

            <CurrentWorn />
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">2</div>
                    <div className="stat-label">פריטים בארון</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">1</div>
                    <div className="stat-label">לוקים שמורים</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">3</div>
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