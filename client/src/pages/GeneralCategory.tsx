// // import { useSelector } from "react-redux";
// // import { useParams } from "react-router";
// // import { selectItemsByCategoryName, selectUser, selectUserWardrobe } from "../redux/slices/userSlice";
// // // import { selectItemsByCategoryName } from "../redux/slices/itemsSlice";


// // const GeneralCategory = () => {
// //   const { typeCategory } = useParams();
// //   const allItems = useSelector(selectUser)


// //   return (
// //     <div>
     
// //       <p>Type Category: {typeCategory}</p>

          
// //         </div>

// //   )
// // }


// // export default GeneralCategory


// import { useSelector } from "react-redux";
// import { useParams } from "react-router";
// import { selectUser } from "../redux/slices/userSlice";
// import axios from "axios";

// const GeneralCategory = () => {
//   const { typeCategory } = useParams();
//   const allItems = useSelector(selectUser);
// console.log(allItems);
//     // axios.get('http://localhost:5000/images/`${}`') // כתובת השרת שלך

//   return (
//     <div>
//       <p>Type Category: {typeCategory}</p>
//       <div>
//         {allItems.myWardrobe && allItems.myWardrobe.length > 0 ? (
//           allItems.myWardrobe.map((item, index) => (
//             <div key={index}>
//               <p>שם פריט: {item.itemName}</p>
// {/* <img src={`/uploadsPic/${item.url}`} /> בניית כתובת התמונה */}
// {/* <img src={`http://localhost:5000/${item.url}`} /> */}
// <img src={`http://localhost:5000/${item.url.replace(/^public[\\/]/, '')}`} />

//       <p>כתובת תמונה: {item.url}</p>
//               <p>קטגוריה: {item.categoryName}</p>
//               {/* תוכל להוסיף כאן שדות נוספים שאתה רוצה להציג */}
//             </div>
//           ))
//         ) : (
//           <p>אין פריטים בארון הבגדים.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeneralCategory;


import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { selectUser } from '../redux/slices/userSlice';

const GeneralCategory = () => {
  const { typeCategory } = useParams();
  const allItems = useSelector(selectUser);

  console.log("typeCategory:", typeCategory);
  console.log("allItems:", allItems);

  if (!allItems?.myWardrobe) {
    console.log("myWardrobe is not available yet");
    return <Typography>טוען ארון בגדים...</Typography>;
  }

  console.log("allItems.myWardrobe:", allItems.myWardrobe);

  const filteredItems = allItems.myWardrobe.filter(item => item.categoryName === typeCategory);
  console.log("filteredItems:", filteredItems);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        קטגוריה: {typeCategory}
      </Typography>
      {filteredItems.length > 0 ? (
        <Grid container spacing={2}>
          {filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:3000/${item.url.replace(/^public[\\/]/, '')}`}
                  alt={item.itemName as string}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    קטגוריה: {item.categoryName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    כתובת תמונה: {item.url}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">אין פריטים בקטגוריה זו.</Typography>
      )}
    </div>
  );
};

export default GeneralCategory;