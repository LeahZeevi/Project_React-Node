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