import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useGetEventWearningQuery } from '../redux/api/apiSllices/wearningApiSlice';

type HistoryAlertProps = {
  open: boolean;
  onClose: () => void;
  item_Id: string;
};

const HistoryAlert = ({ open, onClose, item_Id }: HistoryAlertProps) => {
  const { data } = useGetEventWearningQuery("userId123");

  const hasHistory = data && data.length > 0;

  if (!hasHistory) {
    return (
      <Typography sx={{ padding: 2 }}>
        אין היסטוריה משותפת עם פריטים אחרים.
      </Typography>
    );
  }

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          פריטים שנלבשו יחד עם הפריט הזה:
        </Typography>
        <Grid container spacing={2}>
          {data.flatMap(event =>
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
                    <Typography variant="subtitle1">Test</Typography>
                    <Typography variant="body2" color="text.secondary">Test</Typography>
                  </Box>
                </Grid>
              ))
          )}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default HistoryAlert;
