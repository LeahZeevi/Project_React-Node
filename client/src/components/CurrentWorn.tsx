import React, { useEffect, useState } from 'react'
import "../css/try.css"
import EventWearning from '../interfaces/EventWearning';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { useAddEventWearningMutation } from '../redux/api/apiSllices/wearningApiSlice';
import { useAddHistoryItemMutation } from '../redux/api/apiSllices/historyApiSlice';
import { useGetAllItemsMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useUpdateItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import Item from '../interfaces/Items';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
const CurrentWorn = () => {

  const [currentOutfit, setCurrentOutfit] = useState<Item[]>([]);
  const user: Users = useSelector(selectUser);
  const [addEventWearning] = useAddEventWearningMutation()
  const [addHistory] = useAddHistoryItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [getAllItems] = useGetAllItemsMutation();
  const [liked, setLiked] = useState(false);

  interface SavedLook {
    name: string;
    items: string[];
    date: string;
  }

  const handleUpdateItem = async (_id: string) => {
    try {
      await updateItem({ _id: _id, inUse: false }).unwrap();
      allItemsInUse()
    } catch (error) {
      console.error("שגיאה בעדכון הפריט:", error);
    }
  };
  const allItemsInUse = async () => {
    try {
      const response: Item[] = await getAllItems(user._id).unwrap()
      console.log("response", response);
      if (response) {
        const filterItems: Item[] = response.filter(item => item.inUse == true);
        setCurrentOutfit(filterItems);
      }
    }
    catch (error) {
      console.error('שגיאה בקבלת פריטים:', error);
    };
  }
  useEffect(() => {
    allItemsInUse()
  }, [])


  const toggleLike = () => {
    setLiked(!liked);
    if (!liked) {
      alert("אהבתי");
    }
  }

  const MotionFavoriteIcon = motion(FavoriteIcon);
  const MotionFavoriteBorderIcon = motion(FavoriteBorderIcon);
  const saveLook = async () => {
    // if (currentOutfit.length > 0) {
    // const newLook: SavedLook = {

    //   name: `לוק ${new Date().toLocaleDateString('he-IL')}`,
    //   items: [...currentOutfit],
    //   date: new Date().toISOString().split('T')[0],
    // };
    if (currentOutfit.length > 1) {
      const items_id: string[] = currentOutfit.map(item => item._id)
      const wearning: EventWearning = { _id: "", user_id: user._id, items: items_id }
      const newEventWearning: { newWearn: EventWearning } = await addEventWearning(wearning).unwrap();
      console.log("newEventWearning", newEventWearning.newWearn._id);

      await Promise.all(
        currentOutfit.map(item =>
          addHistory({
            item_id: item._id,
            wornEvent: [newEventWearning.newWearn._id]
          }).unwrap()
        )
      );
    }
  }
  console.log("currentOutfit:", currentOutfit);

  return (
    <div>
      <div className="current-outfit">

{currentOutfit.length >= 2 && (

        <IconButton
          onClick={() => setLiked(!liked)}
          className="heart-button"
          sx={{
            outline: 'none',
            boxShadow: 'none',
            padding: 0,
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
              fontSize: '40px',
         


            },
          }}
        >
          <div className="heart-icon-wrapper">
            {liked ? (
              <MotionFavoriteIcon
                key="filled"
                className="heart-icon liked"
                fontSize="inherit"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ fontSize: '50px' }}

              />
            ) : (
              <MotionFavoriteBorderIcon
                key="outline"
                className="heart-icon"
                fontSize="inherit"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </div>
        </IconButton>)}

        <h3>הלבוש הנוכחי</h3>

        {currentOutfit.length > 0 ? (
          <div className="outfit-items">
            {currentOutfit.map(item => (
              <div key={item._id} className="outfit-chip">
                <span>{item.categoryName}</span>
                <button onClick={() => handleUpdateItem(item._id)} className="remove-btn">×</button>
              </div>
            ))}
            <button onClick={saveLook} className="save-look-btn">שמור לוק</button>
          </div>
        ) : (
          <p className="no-outfit">בחר בגדים מהארון</p>
        )}
      </div>
    </div>
  )

}

export default CurrentWorn
