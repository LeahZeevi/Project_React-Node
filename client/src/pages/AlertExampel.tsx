import React, { useState } from 'react';
import { Drawer, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertExampel=()=> {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        פתח דיאלוג מלמטה
      </Button>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: '45vh', // רבע גובה המסך
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflowY: 'auto',
          },
        }}
      >
        <Box sx={{ p: 4, position: 'relative', height: '100%' }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {/* <Typography variant="h6" gutterBottom>
            דיאלוג מלמטה
          </Typography>

          <Typography paragraph>
            כאן תוכן שיכול להיות ארוך וניתן לגלול בתוכו.
          </Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography>
          <Typography paragraph>עוד שורות תוכן...</Typography> */}
        </Box>
      </Drawer>
    </>
  );
}
export default AlertExampel;