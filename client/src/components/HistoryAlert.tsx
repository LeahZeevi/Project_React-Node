import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useGetEventsWearningQuery } from '../redux/api/apiSllices/wearningApiSlice';
import Item from '../interfaces/Items';
import { useGetItemByIdQuery } from '../redux/api/apiSllices/itemsApiSlice';
import EventWearning from '../interfaces/EventWearning';
import '../css/HistoryAlert.css'
type HistoryAlertProps = {
  open: boolean;
  onClose: () => void;
  item_Id: string;
};

const HistoryAlert = ({ open, onClose, item_Id }: HistoryAlertProps) => {
  // const [getEventsWearning]=useGetEventsWearningQuery();
  const [historyItems, setHistoryItems] = useState<Item[]>([])
  const { data, error, isLoading } = useGetEventsWearningQuery(item_Id);

  useEffect(() => {
    if (data) {
      setHistoryItems(data);
    }
  }, [data]);



  // const wearning:EventWearning = await getEventsWearning(item_Id).unwrap();
  // data.flatMap(wearning =>
  //           wearning.items.map(item=>{
  //             const i=await useGetItemByIdQuery(item.)
  //           })




  // const hasHistory = data && data.length > 0;

  //   if (!hasHistory) {
  //     return (
  //       <Typography sx={{ padding: 2 }}>
  //         אין היסטוריה משותפת עם פריטים אחרים.
  //       </Typography>
  //     );
  //   }
  // console.log("history");
  console.log("data", typeof data);

  console.log("historyItems", historyItems);

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box sx={{ height: '40vh', padding: 4, backgroundColor: '#f5f5f5', position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography  gutterBottom>
          <h4 className='history-alert-title' >אולי תרצה ללבוש את זה עם ביגוד שנבחר בעבר?</h4>
        </Typography>
        <Grid container spacing={2}>
          {historyItems.map(item => (
            <div className="suggested-item-card">
              <div className="suggested-item-image-wrapper">
                <img
                  src={`http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}`}
                  alt={item.itemName}
                />
                <button
                  className={`wear-btn ${item.inUse ? 'worn' : ''}`} 
                  // onClick={() => onWear(item)}
                  disabled={!!item.inUse}
                >
                  {item.inUse ? 'בלבישה' : 'לבש'}
                </button>
              </div>
              {/* <div className="suggested-item-info">
                <h4>{item.itemName}</h4>
                <p>{item.categoryName}</p>
              </div> */}
            </div>

          )
          )}
          {/* {data.flatMap(event =>
            event.items
              .filter(id => id === item_Id)
              .map(id => (
                
                <Grid item xs={6} md={3} key={`${event._id}-${id}`}>
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: 2,
                      padding: 2,
                      background: 'white',
                    }}
                  >
                    {/* כאן אפשר להחליף בטקסטים אמיתיים או תמונה */}
          {/* <Typography variant="subtitle1">Test</Typography>
                    <Typography variant="body2" color="text.secondary">Test</Typography> */}
          {/* </Box> */}
          {/* </Grid> */}
          {/* )) */}
          {/* )} */}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default HistoryAlert;
