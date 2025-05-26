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

interface CurrentWornProps {
  wornItems: Item[];
  onRefresh: () => void
}


const CurrentWorn: React.FC<CurrentWornProps> = ({ wornItems, onRefresh }) => {

  // const [currentOutfit, setCurrentOutfit] = useState<Item[]>([]);
  const user: Users = useSelector(selectUser);
  const [addEventWearning] = useAddEventWearningMutation()
  const [addHistory] = useAddHistoryItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [getAllItems] = useGetAllItemsMutation();

  interface SavedLook {
    name: string;
    items: string[];
    date: string;
  }

  const handleUpdateItem = async (_id: string) => {
    try {
      await updateItem({ _id: _id, inUse: false }).unwrap();
      await onRefresh(); // ← מרענן את הארון כולו מהשרת

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
        wornItems = filterItems;
      }
    }
    catch (error) {
      console.error('שגיאה בקבלת פריטים:', error);
    };
  }
  // useEffect(() => {
  //   allItemsInUse()
  // }, [])





  const saveLook = async () => {
    // if (currentOutfit.length > 0) {
    // const newLook: SavedLook = {

    //   name: `לוק ${new Date().toLocaleDateString('he-IL')}`,
    //   items: [...currentOutfit],
    //   date: new Date().toISOString().split('T')[0],
    // };
    if (wornItems.length > 1) {
      const items_id: string[] = wornItems.map(item => item._id)
      const wearning: EventWearning = { _id: "", user_id: user._id, items: items_id }
      const newEventWearning: { newWearn: EventWearning } = await addEventWearning(wearning).unwrap();
      console.log("newEventWearning", newEventWearning.newWearn._id);

      await Promise.all(
        wornItems.map(item =>
          addHistory({
            item_id: item._id,
            wornEvent: [newEventWearning.newWearn._id]
          }).unwrap()
        )
      );
    }
  }
  return (
    <div>
      <div className="current-outfit">
        <h3>הלבוש הנוכחי</h3>
        {wornItems.length > 0 ? (
          <div className="outfit-items">
            {wornItems.map(item => (
              <div key={item._id} className="outfit-chip">
                <button onClick={() => handleUpdateItem(item._id)} className="remove-btn">×</button>
                <span>{item.itemName}</span>
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
