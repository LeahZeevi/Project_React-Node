import React, { useEffect, useState } from 'react'
import "../css/try.css"
import EventWearning from '../interfaces/EventWearning';
import { Users } from '../interfaces/Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { useAddEventWearningMutation } from '../redux/api/apiSllices/wearningApiSlice';
import { useAddHistoryItemMutation } from '../redux/api/apiSllices/historyApiSlice';
import { useGetAllItemsQuery } from '../redux/api/apiSllices/itemsApiSlice';
import { useUpdateItemInUseMutation } from '../redux/api/apiSllices/itemsApiSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
import Item from '../interfaces/Items';
import { useDispatch } from 'react-redux';
import { selectItemInUse, setItemsInLaundry, setItemsInUse, updateAllItems } from '../redux/slices/itemSlice';
import useUpdateItem from '../hooks/useUpdateItem';
const MotionFavoriteIcon = motion(FavoriteIcon);
const MotionFavoriteBorderIcon = motion(FavoriteBorderIcon);
interface CurrentWornProps {
  wornItems: Item[];
  onRefresh: () => void

}


const CurrentWorn: React.FC<CurrentWornProps> = ({ wornItems, onRefresh }) => {


  const user: Users = useSelector(selectUser);
  const [addEventWearning] = useAddEventWearningMutation()
  const [addHistory] = useAddHistoryItemMutation();
  const [liked, setLiked] = useState(false);
  // const wornItems = useSelector(selectItemInUse)
  const dispatch = useDispatch();
  const { updateItem } = useUpdateItem();
  // interface SavedLook {
  //   name: string;
  //   items: string[];
  //   date: string;
  // }


  // const toggleLike = () => {
  //   setLiked(!liked);
  //   if (!liked) {
  //     alert("אהבתי");
  //   }
  // }

  const saveLook = async () => {
    if (wornItems.length > 1) {
      const items_id: string[] = wornItems.map(item => item._id)
      const wearning: EventWearning = { _id: "", user_id: user._id, items: items_id }
      try {
        const newEventWearning: { newWearn: EventWearning } = await addEventWearning(wearning).unwrap();
        await Promise.all(
          wornItems.map(item =>
            addHistory({
              item_id: item._id,
              wornEvent: [newEventWearning.newWearn._id]
            }).unwrap()
          )
        );
        const updatedItems = wornItems.map(item => ({ ...item, inUse: false }));
        dispatch(updateAllItems(updatedItems));
        dispatch(setItemsInUse([]))
      }
      catch {
        dispatch(setItemsInUse([]))
      }
    }
  }

  return (
    <div>

      <div className="current-outfit">
        {wornItems.length > 1 && (
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
        {wornItems.length > 0 ? (
          <div className="outfit-items">
            {wornItems.map(item => (
              <div key={item._id} className="outfit-chip">
                <button onClick={() => updateItem(item, false)} className="remove-btn">×</button>
                <span>{item.itemName}</span>
              </div>
            ))}
            <button onClick={saveLook} className="save-look-btn">סיימתי </button>
          </div>
        ) : (
          <p className="no-outfit">בחר בגדים מהארון</p>
        )}
      </div>
    </div>
  )
}

export default CurrentWorn











