
// import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// // import { AddShoppingCart } from "@mui/icons-material";
// import  { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useParams} from 'react-router';
// import Item from "../interfaces/Items";
// import { useGetAllItemsMutation, useUpdateItemMutation } from "../redux/api/apiSllices/itemsApiSlice";
// import { Users } from "../interfaces/Users";
// import { selectUser } from "../redux/slices/userSlice";



// // const GeneralCategory = () => {

// //   const { typeCategory } = useParams();
// //   const [myWardrobe, setMyWardrobe] = useState<Item[]>([]);
// //   const [updatedItem] = useUpdateItemMutation();
// //   const [getAllItems] = useGetAllItemsMutation()
// //   const user: Users = useSelector(selectUser)

// //   useEffect(() => {
// //     const fetchWardrobe = async () => {
// //       try {
// //         const response = await getAllItems(user._id).unwrap()
// //         console.log("getAllItems",response);
        
// //         if (response) {
// //           setMyWardrobe(response);
// //         }
// //       }
// //       catch (error) {
// //         console.error('שגיאה בקבלת פריטים:', error);
// //       }
// //     };
// //     fetchWardrobe();
// //   }, []);
// // console.log("myWardRobe",myWardrobe);
// //   const ItemsCategory = myWardrobe.filter(item => item.categoryName === typeCategory)
  


// //   const onAddToCart = async (_id: string) => {
// //     try {
// //       const response = await updatedItem({ _id:_id,inUse:true }).unwrap();
// //       console.log('Item updated on server:', response);
// //     } catch (error) {
// //       console.error('Failed to update item:', error);
// //     }
// //   }



//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//       {ItemsCategory?.map((item: Item) => (
//         <Card key={item._id} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//           <CardMedia
//             component="img"
//             height="180"
//             image={`http://localhost:3000/public/uploadsPic/${item.url}`} // עדכן לנתיב האמיתי מהשרת
//             alt={item.itemName}
//             className="object-cover"
//           />
//           <CardContent className="flex flex-col justify-between h-full">
//             <Typography variant="h6" className="font-semibold mb-2 text-center">
//               {item.itemName}
//             </Typography>
//             <Button
//               variant="contained"
//               // startIcon={<AddShoppingCart />}
//               onClick={() => onAddToCart(item)}
//               className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
//               fullWidth
//             >
//               הוסף לסל
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };
// >>>>>>> 8d3957836de94dff990d346e89b2bb62be886d95


// // export default GeneralCategory
