// import { useSelector } from "react-redux";
// import Item from "../interfaces/Items";
// import { useAddHistoryItemMutation } from "../redux/api/apiSllices/historyApiSlice"
// import { selectUser } from "../redux/slices/userSlice";
// import EventWearning from "../interfaces/EventWearning";
// import { useAddEventWearningMutation } from "../redux/api/apiSllices/wearningApiSlice";

// export const useAddNewHistory=async(cartItems:Item[])=>{
//     const [addHistory]=useAddHistoryItemMutation();
//     const [addEventWearning]=useAddEventWearningMutation()
//     const user=useSelector(selectUser)
//     const items_id:string[]=cartItems.map(item=>item._id)
//     const wearning:EventWearning={user_id:user._id,items:items_id}
//     const newHistory:EventWearning=await addEventWearning(wearning).unwrap();
//     return {EventHistory:newHistory}
// }