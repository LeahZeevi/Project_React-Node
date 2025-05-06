

import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { selectItems, selectItemsByCategoryName } from '../redux/slices/itemsSlice';

interface Item {
  id: string;
  itemName: string;
  imagePath: string; // הנתיב לתמונה מה-Backend
}

interface ItemListProps {
  items: Item[];
  onAddToCart: (item: Item) => void;
}
   

const GeneralCategory: React.FC<ItemListProps> = ({ items, onAddToCart }) => {
  const {typeCategory} = useParams();
  const [itemList]=
  const ItemsCategory=useSelector(()=>selectItemsByCategoryName(typeCategory || 'חולצות'))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {items?.map((item) => (
  
        <Card key={item.id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <CardMedia
            component="img"
            height="180"
            image={`http://localhost:5000/public/uploadsPic/undefined/${item.imagePath}`} // עדכן לנתיב האמיתי מהשרת
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
