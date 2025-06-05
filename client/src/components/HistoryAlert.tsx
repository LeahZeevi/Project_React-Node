
import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Paper, Fade, Zoom } from '@mui/material';
import { useGetEventsWearningQuery } from '../redux/api/apiSllices/wearningApiSlice';
import Item from '../interfaces/Items';
import '../css/HistoryAlert.css';
import useUpdateItem from '../hooks/useUpdateItem';

type HistoryAlertProps = {
  open: boolean;
  onClose: () => void;
  item_Id: string;
};

//Displays worn histories for a specific item.
const HistoryAlert = ({ open, onClose, item_Id }: HistoryAlertProps) => {
  const [historyItems, setHistoryItems] = useState<Item[]>([]);
  const { data, error, isLoading } = useGetEventsWearningQuery(item_Id);
  const { updateItem } = useUpdateItem();


  const handleWear = (item: Item) => {
    updateItem(item, true);
    setHistoryItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem._id === item._id ? { ...prevItem, inUse: true } : prevItem
      ))
  };


  const handelCloseAlsert = () => {
    setHistoryItems([]);
    onClose();
  }

  useEffect(() => {
    if (error || (!isLoading && data?.length === 0)) {
      onClose();
    }
    if (data) {
      setHistoryItems(data);
    }

  }, [data, error]);



  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 500, exit: 300 }}
      PaperProps={{
        sx: {
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 8px 20px rgba(138, 43, 226, 0.2)',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.97), rgba(250,245,255,0.97))',
          overflowX: 'hidden'
        }
      }}
    >
      <Box
        sx={{
          minHeight: '40vh',
          maxHeight: '50vh',
          padding: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(138, 43, 226, 0.3)',
            borderRadius: '10px',
          }
        }}
      >
        <IconButton
          onClick={handelCloseAlsert}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#8a2be2',
            '&:hover': {
              backgroundColor: 'rgba(138, 43, 226, 0.1)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Fade in={open} timeout={800}>
          <div>
            <Typography
              component="h4"
              gutterBottom
              className='history-alert-title'
              sx={{
                fontSize: '2.0rem',
                fontWeight: 600,
              }}
            >
              אולי תרצה ללבוש את זה עם ביגוד שנבחר בעבר?
            </Typography>

            {isLoading && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: '#8a2be2', fontWeight: 500 }}>טוען פריטים...</Typography>
              </Box>
            )}

            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                mt: 1,
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                pb: 2,
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(138, 43, 226, 0.3)',
                  borderRadius: '10px',
                }
              }}
            >
              {historyItems.map((item, index) => (
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={item._id || index}>
                  <Grid item sx={{ minWidth: '180px', maxWidth: '220px' }}>
                    <Paper
                      elevation={2}
                      className="suggested-item-card"
                      sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 15px rgba(138, 43, 226, 0.15)'
                        }
                      }}
                    >
                      <div className="suggested-item-image-wrapper">
                        <img
                          src={`http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}`}
                          alt={item.itemName}
                        />
                        <button
                          className={`wear-btn ${item.inUse ? 'worn' : ''}`}
                          onClick={() => !item.inUse && handleWear(item)}
                          disabled={!!item.inUse}
                        >
                          {item.inUse ? 'בלבישה' : 'לבש'}
                        </button>
                      </div>
                      <div className="suggested-item-info">
                        <h4>{item.itemName}</h4>
                        <p>{item.categoryName}</p>
                      </div>
                    </Paper>
                  </Grid>
                </Zoom>
              ))}
            </Grid>
          </div>
        </Fade>
      </Box>
    </Drawer>
  );
};

export default HistoryAlert;