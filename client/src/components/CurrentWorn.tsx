
import { useState } from "react"
import "../css/myWardrobe.css"
import type EventWearning from "../interfaces/EventWearning"
import type { Users } from "../interfaces/Users"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/slices/userSlice"
import { useAddEventWearningMutation } from "../redux/api/apiSllices/wearningApiSlice"
import { useAddHistoryItemMutation } from "../redux/api/apiSllices/historyApiSlice"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import IconButton from "@mui/material/IconButton"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { selectItemInUse, setAllLooks, setItemsInUse, updateAllItems } from "../redux/slices/itemSlice"
import useUpdateItem from "../hooks/useUpdateItem"
import { useUpdateItemInUseMutation } from "../redux/api/apiSllices/itemsApiSlice"
import { Looks, SaveLook } from "../interfaces/Looks"
import { useAddLookMutation } from "../redux/api/apiSllices/looksApiSlice"

const MotionFavoriteIcon = motion(FavoriteIcon)
const MotionFavoriteBorderIcon = motion(FavoriteBorderIcon)

const CurrentWorn = () => {
  const user: Users = useSelector(selectUser)
  const [addEventWearning] = useAddEventWearningMutation()
  const [updateItemInuse] = useUpdateItemInUseMutation();
  const [addHistory] = useAddHistoryItemMutation()
  const [addLook]=useAddLookMutation();
  const [liked, setLiked] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const wornItems = useSelector(selectItemInUse)
  const dispatch = useDispatch()
  const { updateItem } = useUpdateItem()
console.log("wornItems",wornItems);

  const saveWearn = async () => {
    if (wornItems.length > 1) {
      const items_id: string[] = wornItems.map((item) => item._id)
      const wearning: EventWearning = { _id: "", user_id: user._id, items: items_id }
      try {
        const newEventWearning: { newWearn: EventWearning } = await addEventWearning(wearning).unwrap()
        await Promise.all(
          wornItems.map((item) => {
            return Promise.all([
              addHistory({
                item_id: item._id,
                wornEvent: [newEventWearning.newWearn._id],
              }).unwrap(),
              updateItemInuse({ _id: item._id, inUse: false, userId: user._id })
            ]);
          })
        );
        const updatedItems = wornItems.map((item) => ({ ...item, inUse: false, countWear: Number(item.countWear) + 1 }))
        dispatch(updateAllItems(updatedItems))
        dispatch(setItemsInUse([]))
      } catch {
        dispatch(setItemsInUse([]))
      }
    }
  }


  const saveLook = async () => {
    setLiked(!liked);
    const allItem: string[] = wornItems.map(worn => worn._id);
    const newItem:SaveLook= { user_id: user._id, _id: "", nameLook: "", itemsInlook: allItem, dateCreation: new Date(), inClothing: false }
    const response:{ newLook: Looks }=await addLook(newItem).unwrap();
    dispatch(setAllLooks(response.newLook))
  }


console.log("current.length", wornItems.length);

return (
  <div>
    <div className="current-outfit">
      {wornItems.length > 1 && (
        <div className="heart-container">
          <IconButton
            onClick={saveLook}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="heart-button"
            sx={{
              outline: "none",
              boxShadow: "none",
              padding: 0,
              position: "relative",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
                fontSize: "40px",
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
                  style={{ fontSize: "50px" }}
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
          </IconButton>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="heart-tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="tooltip-text">שמור כלוק</span>
                <div className="tooltip-arrow"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <h3>הלבוש הנוכחי</h3>
      {wornItems.length > 0 ? (
        <div className="outfit-items">
          {wornItems.map((item) => (
            <div key={item._id} className="outfit-chip">
              <button onClick={() => updateItem(item, false)} className="remove-btn">
                ×
              </button>
              <span>{item.itemName}</span>
            </div>
          ))}
          <button onClick={saveWearn} className="save-look-btn">
            סיימתי{" "}
          </button>
        </div>
      ) : (
        <p className="no-outfit">בחר בגדים מהארון</p>
      )}
    </div>
  </div>
)
}

export default CurrentWorn
