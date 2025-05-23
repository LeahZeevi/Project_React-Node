import React from 'react';
import Item from '../interfaces/Items';

interface CurrentOutfitProps {
  currentOutfit: number[];
  myWardrobe: Item[];
  handleWearItem: (itemId: number) => void;
  saveLook: () => void;
}

const CurrentOutfit: React.FC<CurrentOutfitProps> = ({ currentOutfit, myWardrobe, handleWearItem, saveLook }) => {
  const currentItems = myWardrobe.filter(item => currentOutfit.includes(Number(item._id)));

  return (
    <div className="current-outfit">
      <h3>הלבוש הנוכחי</h3>
      {currentItems.length > 0 ? (
        <div className="outfit-items">
          {currentItems.map(item => (
            <div key={item._id} className="outfit-chip">
              <span>{item.categoryName}</span>
              <button onClick={() => handleWearItem(Number(item._id))} className="remove-btn">×</button>
            </div>
          ))}
          <button onClick={saveLook} className="save-look-btn">שמור לוק</button>
        </div>
      ) : (
        <p className="no-outfit">בחר בגדים מהארון</p>
      )}
    </div>
  );
};

export default CurrentOutfit;