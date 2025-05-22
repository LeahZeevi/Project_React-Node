import  { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAddItemMutation, useGetAllItemsMutation, useUpdateItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useSelector } from 'react-redux';
import { Users } from '../interfaces/Users';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectUser } from "../redux/slices/userSlice";
import ItemSchema from "../schemas/ItemSchema";
import Item from '../interfaces/Items';
import MyWardrobe from './MyWardrobe';
import Weather from './Weather';


const DigitalWardrobeApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentOutfit, setCurrentOutfit] = useState<number[]>([]);
  const [addItemDialog, setAddItemDialog] = useState(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [myWardrobe, setMyWardrobe] = useState<Item[]>([]);
  const [inCart, setInCart] = useState(false);
  // const user: Users = useSelector(selectUser);
  const [updatedItem] = useUpdateItemMutation();
  const [getAllItems] = useGetAllItemsMutation();


  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    season: '',
    style: '',
    image: null
  });

  // Sample data


  const [savedLooks, setSavedLooks] = useState([
    { _id: 1, name: 'לוק קז׳ואל', items: [1, 2, 4], date: '2024-11-15' },
    { _id: 2, name: 'לוק אלגנטי', items: [3, 8], date: '2024-11-14' },
    { _id: 3, name: 'לוק עסקי', items: [6, 7, 8], date: '2024-11-13' }
  ]);

  const [wearHistory, setWearHistory] = useState([
    { date: '2024-11-15', items: [1, 2, 4] },
    { date: '2024-11-14', items: [3, 8] },
    { date: '2024-11-13', items: [6, 7, 8] }
  ]);

  const categories = ['כל הקטגוריות', 'חולצות', 'חצאיות', 'מכנסים', 'שמלות', 'נעלים'];
  



  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const response: Item[] = await getAllItems(user._id).unwrap();
        console.log("getAllItems", response);
        if (response) {
          setMyWardrobe(response);
        }
      } catch (error) {
        console.error('שגיאה בקבלת פריטים:', error);
      }
    };
    fetchWardrobe();
  }, []);



  const handleWearItem = (itemId:any) => {
    const updatedItems = myWardrobe.map(item => 
      item._id === itemId ? { ...item, inUse: !item.inUse } : item
    );
    setMyWardrobe(updatedItems);
    
    const foundItem = myWardrobe.find(item => item._id === itemId);
    if (foundItem && !foundItem.inUse) {
      setCurrentOutfit([...currentOutfit, itemId]);
      suggestItemsFromHistory(itemId);
    } else {
      setCurrentOutfit(currentOutfit.filter(id => id !== itemId));
    }
  };

  const suggestItemsFromHistory = (itemId:any) => {
    const relatedLooks = savedLooks.filter(look => look.items.includes(itemId));
    if (relatedLooks.length > 0) {
      console.log('Suggested items based on history:', relatedLooks);
    }
  };

  const saveLook = () => {
    if (currentOutfit.length > 0) {
      const newLook = {
        _id: savedLooks.length + 1,
        name: `לוק ${new Date().toLocaleDateString('he-IL')}`,
        items: [...currentOutfit],
        date: new Date().toISOString().split('T')[0]
      };
      setSavedLooks([...savedLooks, newLook]);
      
      setWearHistory([...wearHistory, {
        date: new Date().toISOString().split('T')[0],
        items: [...currentOutfit]
      }]);
      
      const updatedItems = myWardrobe.map(item => ({ ...item, inUse: false }));
      setMyWardrobe(updatedItems);
      setCurrentOutfit([]);
    }
  };

  const addNewItem =async (data:any) => {
    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
      const flaskResponse = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        body: formData
      });

      const result = await flaskResponse.json();
      console.log("זיהוי המודל:", result);
      formData.append("userId", user._id);
      formData.append("categoryName", result.predictedCategory);
      formData.append("itemName", data.itemName);
      // formData.append("image", data.image[0]);
      formData.append("session", data.session || " ");
      formData.append("style", data.style || "");

      console.log("data.image[0]:", data.image[0]);

      try {
        const response = await addItem({ _id: user._id, newItem: formData });
        console.log("response add item", response);
        setImage(null);
        reset({
          itemName: '',
          session: 'חורף',
          style: '',
          image: "",
        });
      }
      catch (error) {
        console.error("שגיאה בהוספת פריט:", error);
      }
    }
  }
  

  const renderCurrentOutfit = () => {
    const currentItems = myWardrobe.filter(item => currentOutfit.includes(Number(item._id)));
    
    return (
      <div className="current-outfit">
        <h3>הלבוש הנוכחי</h3>
        {currentItems.length > 0 ? (
          <div className="outfit-items">
            {currentItems.map(item => (
              <div key={item._id} className="outfit-chip">
                <span>{item.categoryName}</span>
                <button onClick={() => handleWearItem(item._id)} className="remove-btn">×</button>
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

  const renderHome = () => (
    <div className="page-content">
      <div className="weather-widget">
        <div className="weather-info">
          <div className="temp"></div>
          <Weather city="ירושלים"></Weather>
          <div className="condition"></div>
        </div>
        {/* <div className="weather-icon"><Weather city=""></Weather></div> */}
      </div>

      {renderCurrentOutfit()}

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

  const renderWardrobe = () => {
    const filteredItems = selectedCategory === 'all' || selectedCategory === 'כל הקטגוריות' 
      ? myWardrobe 
      : myWardrobe.filter(item => item.categoryName === selectedCategory);

    return (
      <div className="page-content">
        {renderCurrentOutfit()}
        
        <div className="category-tabs">
          {categories.map(category => (
            <button 
              key={category}
              className={`tab ${(selectedCategory === category || (selectedCategory === 'all' && category === 'כל הקטגוריות')) ? 'active' : ''}`}
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
                <img   src={`http://localhost:3000/${item.image.replace(/^public[\\/]/,'')}`}  alt={item.itemName}  />
                {item.inUse && <div className="worn-overlay">✓</div>}
              </div>
              <div className="item-info">
                <h4>{item.itemName}</h4>
                <p>{item.categoryName} • {item.session}</p>
                <button 
                  className={`wear-btn ${item.inUse ? 'worn' : ''}`}
                  onClick={() => handleWearItem(item._id)}
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

  const renderLooks = () => (
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
                    <img src={item.image} alt={item.itemName} className="item-avatar" />
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

  const renderHistory = () => (
    <div className="page-content">
      <h2>היסטוריית לבוש</h2>
      {wearHistory.map((entry, index) => (
        <div key={index} className="history-card">
          <h3>{entry.date}</h3>
          <div className="history-items">
            {entry.items.map(itemId => {
              const item = myWardrobe.find(i => String(i._id) === String(itemId));
              return item ? (
                <span key={itemId} className="history-chip">{item.itemName}</span>
              ) : null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ mode: "onChange", resolver: zodResolver(ItemSchema) });
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [addItem] = useAddItemMutation();
    const user: Users = useSelector(selectUser)
  
    const onSubmit = async (data: any) => {
      const formData = new FormData();
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
        const flaskResponse = await fetch("http://localhost:3000/api/predict", {
          method: "POST",
          body: formData
        });
  
        const result = await flaskResponse.json();
        console.log("זיהוי המודל:", result);
        formData.append("userId", user._id);
        formData.append("categoryName", result.predictedCategory);
        formData.append("itemName", data.itemName);
        // formData.append("image", data.image[0]);
        formData.append("session", data.session || " ");
        formData.append("style", data.style || "");
  
        console.log("data.image[0]:", data.image[0]);
  
        try {
          const response = await addItem({ _id: user._id, newItem: formData });
          console.log("response add item", response);
          setImage(null);
          reset({
            itemName: '',
            session: 'חורף',
            style: '',
            image: "",
          });
          
        }
        catch (error) {
          console.error("שגיאה בהוספת פריט:", error);
        
  
          try {
            const response = await addItem({ _id: user._id, newItem: formData });
            console.log("response add item", response);
            setImage(null);
            reset({
              itemName: '',
              session: 'חורף',
              style: '',
              image: "",
            });
           
          }
          catch (error) {
            console.error("שגיאה בהוספת פריט:", error);
  
          }
        }
      }
    }
  
      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          console.log("תמונה שהועלתה:", event.target.files[0]);
  
        }
      };
  

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          direction: rtl;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100vw;
        }

        .header {
          background: linear-gradient(135deg,rgb(255, 152, 188) 0%,rgb(149, 230, 244) 100%);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    height: 15vh;

        }

        .menu-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          margin-left: 1rem;
        }

        .header h1 {
          flex: 1;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .outfit-badge {
          background: #ff4081;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          position: relative;
          top: -8px;
          right: -8px;
        }

        .drawer {
          position: fixed;
          top: 0;
          right: ${drawerOpen ? '0' : '-300px'};
          width: 300px;
          height: 100vh;
          background: white;
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          transition: right 0.3s ease;
          z-index: 1000;
          padding: 2rem 0;
        }

        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          display: ${drawerOpen ? 'block' : 'none'};
        }

        .menu-item {
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          background: none;
          width: 100%;
          text-align: right;
        }

        .menu-item:hover {
          background: #f0f0f0;
        }

        .menu-item.active {
          background: #e3f2fd;
          color:rgb(222, 118, 189);
        }

        .menu-icon {
          margin-left: 1rem;
          font-size: 1.2rem;
        }

        .page-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .weather-widget {
          background: linear-gradient(135deg,rgb(207, 170, 191) 0%,rgb(158, 248, 254) 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    height:15vh;

        }

        .temp {
          font-size: 2rem;
          font-weight: bold;
        }

        .condition {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .weather-icon {
          font-size: 3rem;
          opacity: 0.8;
        }

        .current-outfit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .current-outfit h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .outfit-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }

        .outfit-chip {
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .remove-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-look-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .save-look-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .no-outfit {
          color: rgba(255,255,255,0.8);
          font-style: italic;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #667eea;
        }

        .stat-label {
          color: #666;
          margin-top: 0.5rem;
        }

        .section {
          margin-bottom: 2rem;
        }

        .section h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          color: #333;
        }

        .looks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .look-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }

        .look-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 25px rgba(0,0,0,0.15);
        }

        .look-card h4 {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .look-date {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .look-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .item-chip {
          background: #e3f2fd;
          color:rgb(131, 234, 145);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .category-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .tab {
          background: white;
          border: 2px solid #e0e0e0;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .tab:hover {
          border-color: #667eea;
        }

        .tab.active {
          background:rgb(197, 35, 14);
          color: white;
          border-color: #667eea;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .item-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }

        .item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 25px rgba(0,0,0,0.15);
        }

        .item-card.worn {
          opacity: 0.6;
        }

        .item-card.worn:hover {
          transform: none;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .item-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .worn-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
        }

        .item-info {
          padding: 1rem;
        }

        .item-info h4 {
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 1rem;
        }

        .item-info p {
          color: #666;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        .wear-btn {
          width: 100%;
          padding: 0.8rem;
          border: none;
          border-radius: 8px;
          background: #667eea;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 0.9rem;
        }

        .wear-btn:hover {
          background: #5a6fd8;
        }

        .wear-btn.worn {
          background: #e0e0e0;
          color: #666;
          cursor: not-allowed;
        }

        .saved-look-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .saved-look-card:hover {
          transform: translateY(-4px);
        }

        .look-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .delete-btn:hover {
          opacity: 1;
        }

        .look-items-list {
          margin: 1rem 0;
        }

        .look-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .item-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .wear-again-btn {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #667eea;
          background: none;
          color: #667eea;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wear-again-btn:hover {
          background: #667eea;
          color: white;
        }

        .history-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .history-card h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        .history-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .history-chip {
          background: #f0f0f0;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #333;
        }

        .fab {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: transform 0.2s;
          z-index: 100;
        }

        .fab:hover {
          transform: scale(1.1);
        }

        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          display: ${addItemDialog ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .dialog {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .dialog h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #667eea;
          color: white;
        }

        .btn-primary:hover {
          background: #5a6fd8;
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        .photo-btn {
          width: 100%;
          padding: 1rem;
          border: 2px dashed #e0e0e0;
          border-radius: 8px;
          background: none;
          cursor: pointer;
          color: #666;
          transition: border-color 0.2s;
          margin-bottom: 1rem;
        }

        .photo-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .items-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .looks-grid {
            grid-template-columns: 1fr;
          }
          
          .page-content {
            padding: 1rem;
          }
          
          .weather-widget {
            padding: 1.5rem;
          }
          
          .temp {
            font-size: 2rem;
          }
          
          .category-tabs {
            gap: 0.3rem;
          }
          
          .tab {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .items-grid {
            grid-template-columns: 1fr;
          }
          
          .outfit-items {
            flex-direction: column;
            align-items: center;
          }
          
          .fab {
            bottom: 1rem;
            left: 1rem;
          }
        }
      `}</style>

      <div className="app">
        <header className="header">
          <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
            ☰
          </button>
          <h1>הארון הדיגיטלי שלי</h1>
          <div style={{ position: 'relative' }}>
            👔
            {currentOutfit.length > 0 && (
              <div className="outfit-badge">{currentOutfit.length}</div>
            )}
          </div>
        </header>

        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
        <nav className="drawer">
          <button 
            className={`menu-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('home'); setDrawerOpen(false); }}
          >
            <span className="menu-icon">🏠</span>
            בית
          </button>
          <button 
            className={`menu-item ${currentPage === 'wardrobe' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('wardrobe'); setDrawerOpen(false); }}
          >
            <span className="menu-icon">👔</span>
            הארון שלי
          </button>
          <button 
            className={`menu-item ${currentPage === 'looks' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('looks'); setDrawerOpen(false); }}
          >
            <span className="menu-icon">✨</span>
            הלוקים שלי
          </button>
          <button 
            className={`menu-item ${currentPage === 'history' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('history'); setDrawerOpen(false); }}
          >
            <span className="menu-icon">📅</span>
            היסטוריה
          </button>
        </nav>

        <main>
          {currentPage === 'home' && renderHome()}
          {currentPage === 'wardrobe' && renderWardrobe()}
          {currentPage === 'looks' && renderLooks()}
          {currentPage === 'history' && renderHistory()}
        </main>

        <button className="fab" onClick={() => setAddItemDialog(true)}>
          +
        </button>

        <div className="dialog-overlay" onClick={() => setAddItemDialog(false)}>
         <Box display="flex" justifyContent="center" mt={4}>
          <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
            <Typography variant="h5" color="secondary" textAlign="center" mb={3}>
              הוספת בגד לארון
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField label="שם הפריט" variant="outlined" color='secondary' {...register("itemName")} fullWidth />
                {errors.itemName?.message && typeof errors.itemName.message === "string" && (
                  <p style={{ color: "red" }}>{errors.itemName.message}</p>
                )}
                <Button variant="outlined" color="secondary" onClick={() => setIsAlertOpen(true)}>
                  להוספת התאמת בגדים - הצג את הקטלוג
                </Button>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const fileList = e.target.files;
                        if (fileList && fileList.length > 0) {
                          field.onChange(fileList);
                          handleImageChange(e);
                        }
                      }}
                      fullWidth
                    />
                  )}
                  {...register("image")}
                />
                <Controller
                  control={control}
                  defaultValue="חורף"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="חורף" control={<Radio color="secondary" />} label="חורף" />
                      <FormControlLabel value="כללי" control={<Radio color="secondary" />} label="כללי" />
                      <FormControlLabel value="קיץ" control={<Radio color="secondary" />} label="קיץ" />
                    </RadioGroup>
                  )}
                  {...register("session")}
                />
                <Controller
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>סגנון</InputLabel>
                      <Select label="סגנון" {...field}>
                        <MenuItem value="ביסיק">ביסיק</MenuItem>
                        <MenuItem value="ספורט">ספורט</MenuItem>
                        <MenuItem value="ספורט אלגנט">ספורט אלגנט</MenuItem>
                        <MenuItem value="אלגנט">אלגנט</MenuItem>
                        <MenuItem value="אחר">אחר</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  {...register("style")}
                />
                {image && (
                  <Box>
                    <Typography variant="subtitle1">תמונה שהועלתה:</Typography>
                    <img src={image} alt="uploaded" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 8 }} />
                  </Box>
                )}
                <Button variant="contained" color="secondary" type="submit" fullWidth>
                  הוספה לארון
                </Button >
                {/* {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen} />} */}
              </Stack>
            </form>
          </Paper>
        </Box>
        
              </div>
      </div>
    </>
  );
};

export default DigitalWardrobeApp;