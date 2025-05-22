import React, { useState } from 'react';
import CurrentOutfit from '../components/CurrentOutfit';
import Item from '../interfaces/Items';

interface MyWardrobePageProps {
  currentOutfit: number[];
  myWardrobe: Item[];
  handleWearItem: (itemId: number) => void;
  saveLook: () => void;
  categories: string[];
}

const MyWardrobePage: React.FC<MyWardrobePageProps> = ({
  currentOutfit,
  myWardrobe,
  handleWearItem,
  saveLook,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all' || selectedCategory === 'כל הקטגוריות'
      ? myWardrobe
      : myWardrobe.filter(item => item.categoryName === selectedCategory);

  return (
    <div className="page-content">
      <CurrentOutfit
        currentOutfit={currentOutfit}
        myWardrobe={myWardrobe}
        handleWearItem={handleWearItem}
        saveLook={saveLook}
      />

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`tab ${
              selectedCategory === category ||
              (selectedCategory === 'all' && category === 'כל הקטגוריות')
                ? 'active'
                : ''
            }`}
            onClick={() => setSelectedCategory(category === 'כל הקטגוריות' ? 'all' : category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filteredItems.map(item => (
          <div key={item._id} className={`item-card ${item.inUse ? 'worn' : ''}`}>
            <div className="item-image">
              <img
                src={`http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}`}
                alt={item.itemName}
              />
              {item.inUse && <div className="worn-overlay">✓</div>}
            </div>
            <div className="item-info">
              <h4>{item.itemName}</h4>
              <p>
                {item.categoryName} • {item.session}
              </p>
              <button
                className={`wear-btn ${item.inUse ? 'worn' : ''}`}
                onClick={() => handleWearItem(Number(item._id))}
                disabled={!!item.inUse}
              >
                {item.inUse ? 'בלבישה' : 'לבש'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWardrobePage;