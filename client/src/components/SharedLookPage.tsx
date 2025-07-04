// src/pages/SharedLookPage.tsx
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Looks } from '../interfaces/Looks';
import { Typography, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';

export default function SharedLookPage() {
  const { lookId } = useParams<{ lookId: string }>();
  const [look, setLook] = useState<Looks | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const savedLooks = JSON.parse(localStorage.getItem('sharedLooks') || '{}');
    setLook(savedLooks[lookId!]);
  }, [lookId]);

  const handleComment = () => {
    if (!look) return;
    const updatedLook = {
      ...look,
      comments: [...(look.itemsInlook || []), comment],
    };
    const savedLooks = JSON.parse(localStorage.getItem('sharedLooks') || '{}');
    savedLooks[look._id] = updatedLook;
    localStorage.setItem('sharedLooks', JSON.stringify(savedLooks));
    setLook(updatedLook);
    setComment('');
  };

  if (!look) return <Typography>לא נמצא לוק</Typography>;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>{look.nameLook}</Typography>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {look.itemsInlook.map((item, i) => (
          <Card key={i} style={{ width: 150 }}>
            <CardMedia image={item.image} style={{ height: 150 }} />
            <CardContent>
              <Typography>{item.itemName}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <TextField
          label="הוסיפי תגובה"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleComment} variant="contained" style={{ marginTop: 10 }}>
          שלחי תגובה
        </Button>
      </div>

      <div style={{ marginTop: 30 }}>
        <Typography variant="h6">תגובות</Typography>
        {look.itemsInlook?.map((c, i) => (
          <Typography key={i} style={{ borderBottom: '1px solid #ccc' }}>{c.itemName}</Typography>
        ))}
      </div>
    </div>
  );
}
