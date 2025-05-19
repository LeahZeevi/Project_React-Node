


import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { selectItems, selectItemsByCategoryName, updateItem } from '../redux/slices/itemsSlice';
import { useGetMyWardrobe } from "../hooks/useGetMyWardrobe";
import { useDispatch } from "react-redux";
import Item from "../interfaces/Items";
import { useUpdateItemMutation } from "../redux/api/apiSllices/itemsApiSlice";
import { Users } from "../interfaces/Users";



interface ItemListProps {
  items: Item[];
  onAddToCart: (item: Item) => void;
}


const GeneralCategory= () => {
  const {typeCategory}= useParams();
   const dispatch= useDispatch()
       const [updatedItem] = useUpdateItemMutation();
  const {myWardrobe,isLoadingMyWardrobe,errorMyWardrobe}=useGetMyWardrobe()
console.log("myWardrobe:", myWardrobe);
  const ItemsCategory:Item[]=useSelector(selectItemsByCategoryName(typeCategory || 'חולצות'))
  
  const userString = localStorage.getItem('user');
  const user: Users = userString ? JSON.parse(userString) : null
     const onAddToCart=async(item:Item)=>{
    // // item.inUse=true;
    // dispatch(updateItem(item));

    //        console.log('add to cart');

    // await updateItemMutation(item);
    // console.log("myWardrobe:", myWardrobe);
    try {
    const updateditem = { ...item, inUse: true };
    const response = await updatedItem({_id:user._id,updateItem:updateditem}).unwrap();
    console.log('Item updated on server:', response);
    dispatch(updateItem(updatedItem)); // אופציונלי — רק אם לא נשלף מחדש ע"י invalidateTags
  } catch (error) {
    console.error('Failed to update item:', error);
  }

   }

  console.log(ItemsCategory);
  
  return (
    <div key={typeCategory} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {ItemsCategory?.map((item:Item) => (
        <Card key={item._id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <CardMedia
            component="img"
            height="180"
            image={`http://localhost:3000/public/uploadsPic/${item.url}`} // עדכן לנתיב האמיתי מהשרת
            alt={item.itemName}
            className="object-cover"
          />
          <CardContent className="flex flex-col justify-between h-full">
            <Typography variant="h6" className="font-semibold mb-2 text-center">
              {item.itemName}
            </Typography>
            <Button
              variant="contained"
               startIcon={<AddShoppingCart />}
              onClick={() => onAddToCart(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              fullWidth
            >
              הוסף לסל
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


export default GeneralCategory
