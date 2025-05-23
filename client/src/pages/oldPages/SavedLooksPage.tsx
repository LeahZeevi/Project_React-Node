import React from 'react';
import Item from '../interfaces/Items';
import SavedLook from '../interfaces/SavedLook'; // Assuming you define this interface

interface SavedLooksPageProps {
  savedLooks: SavedLook[];
  myWardrobe: Item[];
  // onDeleteLook: (lookId: number) => void; // Add this if you implement delete functionality
  // onWearAgain: (lookId: number) => void; // Add this if you implement "wear again" functionality
}

const SavedLooksPage: React.FC<SavedLooksPageProps> = ({ savedLooks, myWardrobe }) => {
  return (
    <div className="page-content">
      <h2>הלוקים השמורים שלי</h2>
      <div className="looks-grid">
        {savedLooks.map(look => (
          <div key={look._id} className="saved-look-card">
            <div className="look-header">
              <h3>{look.name}</h3>
              <button className="delete-btn">🗑️</button>
            </div>
            <p className="look-date">{look.date}</p>
            <div className="look-items-list">
              {look.items.map(itemId => {
                const item = myWardrobe.find(i => String(i._id) === String(itemId));
                return item ? (
                  <div key={itemId} className="look-item">
                    <img src={`http://localhost:3000/${item.image.replace(/^public[\\/]/,'')}`} alt={item.itemName} className="item-avatar" />
                    <span>{item.itemName}</span>
                  </div>
                ) : null;
              })}
            </div>
            <button className="wear-again-btn">❤️ לבש שוב</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLooksPage;