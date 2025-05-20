// import { useState } from "react"
// import GeneralCategory from "./GeneralCategory"
// import { Link } from "react-router"
// import Tabs from '@mui/joy/Tabs';
// import TabList from '@mui/joy/TabList';
// import Tab, { tabClasses } from '@mui/joy/Tab';
// import TabPanel from '@mui/joy/TabPanel';
// import Typography from '@mui/joy/Typography';
// const MyWardrobe = () => {
//   const [typeCategory, setTypeCategory] = useState<string>("")

// const categories = ["Shirts", "Skirts", "Pants", "Dresses", "Shoes"];

//   return (
//     <div>
//       {/* <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", textAlign: "center" }}>
//         <Link to="חולצות"  > <div style={{ height: "40vh", width: "49vw", backgroundColor: "pink" }} onClick={() => handleChooseType("חולצות")}>חולצות</div></Link>
//         <Link to="חצאיות"> <div style={{ height: "40vh", width: "49vw", backgroundColor: "green" }} onClick={() => handleChooseType("חצאיות")}>חצאיות</div></Link>
//         <Link to="שמלות"> <div style={{ height: "40vh", width: "30vw", backgroundColor: "violet" }} onClick={() => handleChooseType("שמלות")}>שמלות</div></Link>
//         <Link to="פיז'מות"><div style={{ height: "40vh", width: "30vw", backgroundColor: "red" }} onClick={() => handleChooseType("פיז'מות")}>פיז'מות</div></Link>
//         <Link to="נעלים"> <div style={{ height: "40vh", width: "30vw", backgroundColor: "blue" }} onClick={() => handleChooseType("נעלים")}>נעלים</div></Link>
//       </div> */}




//    <Tabs
//   variant="outlined"
//   aria-label="Pricing plan"
//   defaultValue={0}
//   sx={{
//     width: 1200,
//     overflow: 'hidden',  // לאפשר גלילה רק בפנל
//     height: 600,
//     margin: 1,
//     boxShadow: 'none', // מסיר צל
//     border: 'none', // מסיר גבול
//  [`& .${tabClasses.root}`]: {
//     '&:focus-visible, &:focus': {
//       outline: 'none !important',
//       boxShadow: 'none !important',
//     },
//   },
//   }}
// >
//     <TabList
//     disableUnderline
//     tabFlex={1}
//     sx={{
//       borderBottom: 'none', // מסיר את הגבול התחתון
//       boxShadow: 'none',
//       [`& .${tabClasses.root}`]: {
//         fontSize: 'sm',
//         fontWeight: 'lg',
//         [`&[aria-selected="true"]`]: {
//           color: 'primary.500',
//           bgcolor: 'background.surface',
//         },
//         [`&.${tabClasses.focusVisible}`]: {
//           outlineOffset: '-4px',
//         },
//       },
//     }}
//   >
//         <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
//           Shirts
//         </Tab>
//         <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
//           Skirts
//         </Tab>
//         <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
//           Pants
//         </Tab>
//            <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
//           Dresses
//         </Tab>
//            <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
//           Shoes
//         </Tab>
//       </TabList>
//   <TabPanel value={0} sx={{ overflowY: 'auto', maxHeight: 540 }}>
//         <Typography level="inherit">
//           Get started with the industry-standard React UI library, MIT-licensed.
//         </Typography>
//         <Typography
//           textColor="success.400"
//           sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
//         >
//           $0{' '}
//           <Typography
//             textColor="text.secondary"
//             sx={{ fontSize: 'sm', fontWeight: 'md' }}
//           >
//             － Free forever
//           </Typography>
//         </Typography>
//       </TabPanel>
//   <TabPanel value={1} sx={{ overflowY: 'auto', maxHeight: 540 }}>
//         <Typography level="inherit">
//           Best for professional developers building enterprise or data-rich
//           applications.
//         </Typography>
//         <Typography
//           textColor="primary.400"
//           sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
//         >
//           $15{' '}
//           <Typography
//             textColor="text.secondary"
//             sx={{ fontSize: 'sm', fontWeight: 'md' }}
//           >
//             / dev / month
//           </Typography>
//         </Typography>
//       </TabPanel>
//   <TabPanel value={2} sx={{ overflowY: 'auto', maxHeight: 540 }}>
//         <Typography level="inherit">
//           The most advanced features for data-rich applications, as well as the
//           highest priority for support.
//         </Typography>
//         <Typography
//           textColor="primary.400"
//           sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
//         >
//           <Typography
//             sx={[
//               {
//                 fontSize: 'xl',
//                 borderRadius: 'sm',
//                 px: 0.5,
//                 mr: 0.5,
//               },
//               (theme: { variants: { soft: { danger: any; }; }; }) => ({
//                 ...theme.variants.soft.danger,
//                 color: 'danger.400',
//                 verticalAlign: 'text-top',
//                 textDecoration: 'line-through',
//               }),
//             ]}
//           >
//             $49
//           </Typography>
//           $37*{' '}
//           <Typography
//             textColor="text.secondary"
//             sx={{ fontSize: 'sm', fontWeight: 'md' }}
//           >
//             / dev / month
//           </Typography>
//         </Typography>
//       </TabPanel>
//   <TabPanel value={3} sx={{ overflowY: 'auto', maxHeight: 540 }}>
//         <Typography level="inherit">
//           Best for professional developers building enterprise or data-rich
//           applications.
//         </Typography>
//         <Typography
//           textColor="primary.400"
//           sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
//         >
//           $15{' '}
//           <Typography
//             textColor="text.secondary"
//             sx={{ fontSize: 'sm', fontWeight: 'md' }}
//           >
//             / dev / month
//           </Typography>
//         </Typography>
//       </TabPanel>
//   <TabPanel value={4} sx={{ overflowY: 'auto', maxHeight: 540 }}>
//         <Typography level="inherit">
//           Best for professional developers building enterprise or data-rich
//           applications.
//         </Typography>
//         <Typography
//           textColor="primary.400"
//           sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
//         >
//           $15{' '}
//           <Typography
//             textColor="text.secondary"
//             sx={{ fontSize: 'sm', fontWeight: 'md' }}
//           >
//             / dev / month
//           </Typography>
//         </Typography>
//       </TabPanel>

//     </Tabs>

// </div>
//  );
// }

// export default MyWardrobe



import React, { useEffect, useState } from "react";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Item from "../interfaces/Items";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { Users } from "../interfaces/Users";
import { useGetAllItemsMutation, useUpdateItemMutation } from "../redux/api/apiSllices/itemsApiSlice";
import { Button, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

const categories = ["חצאיות", "שמלות", "חולצות", "נעלים", "מכנסים"];

const MyWardrobe = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [myWardrobe, setMyWardrobe] = useState<Item[]>([]);
  const user: Users = useSelector(selectUser);
  const [getAllItems] = useGetAllItemsMutation();
  const [updatedItem] = useUpdateItemMutation();

  const onAddToCart = async (id: string) => {
    try {
      const response:Item= await updatedItem({ _id: id,inUse:true }).unwrap();
      console.log('Item updated on server:', response);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };
 
   
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
 console.log(myWardrobe);
  return (
    <Tabs
      variant="outlined"
      aria-label="My wardrobe tabs"
      value={tabValue}
      onChange={(event: React.SyntheticEvent<Element, Event> | null, newValue: number | string | null) => {
        if (newValue !== null) {
          setTabValue(newValue as number);
        }
      }}
      sx={{
        width: 1300,
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
        height: 600,
        marginLeft: 15,
      }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab key={category} disableIndicator variant="soft" sx={{ flexGrow: 1 }} value={index}>
            {category}
          </Tab>
        ))}
      </TabList>

      {categories.map((category, index) => (
        <TabPanel key={category} value={index} sx={{ overflowY: 'auto', maxHeight: 540 }}>
          <Typography>קטגוריה: {category}</Typography>
          <Typography sx={{ mt: 2 }}>
            כאן יוצגו הפריטים של קטגוריית ה-{category}.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {myWardrobe
              .filter(item => item.categoryName === category)
              .map((item: Item) => (
                <Grid item xs={12} sm={6} md={3} key={item._id}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <CardMedia
                      component="img"
                      height="180"
                      image={`http://localhost:3000/public/uploadsPic/${item.url}`}
                      alt={item.itemName}
                      className="object-cover"
                      
                    />
                    <CardContent className="flex flex-col justify-between h-full">
                      <Typography className="font-semibold mb-2 text-center">
                        {item.itemName}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCart />}
                        onClick={() => onAddToCart(item._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                        fullWidth
                      >
                        הוסף לסל
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </TabPanel>
      ))}
    </Tabs>
  );
};


export default MyWardrobe
