import React from 'react';
import CurrentOutfit from '../components/CurrentOutfit';
import WeatherWidget from '../components/WeatherWidget';
import Item from '../interfaces/Items';
import SavedLook from '../interfaces/SavedLook'; // Assuming you define this interface

interface HomePageProps {
  currentOutfit: number[];
  myWardrobe: Item[];
  savedLooks: SavedLook[];
  wearHistory: { date: string; items: number[] }[];
  handleWearItem: (itemId: number) => void;
  saveLook: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ currentOutfit, myWardrobe, savedLooks, handleWearItem, saveLook }) => {
  return (
    <div className="page-content">
      <WeatherWidget city="ירושלים" />

      <CurrentOutfit
        currentOutfit={currentOutfit}
        myWardrobe={myWardrobe}
        handleWearItem={handleWearItem}
        saveLook={saveLook}
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{myWardrobe.length}</div>
          <div className="stat-label">פריטים בארון</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{savedLooks.length}</div>
          <div className="stat-label">לוקים שמורים</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{myWardrobe.filter(item => item.inUse).length}</div>
          <div className="stat-label">בלבישה</div>
        </div>
      </div>

      <div className="section">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;