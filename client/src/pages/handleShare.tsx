// בתוך הקומפוננטה שמציגה את הלוקים

import { Button } from '@mui/material';
import { Looks } from '../interfaces/Looks';

const handleShare = (look: Looks) => {
  const savedLooks = JSON.parse(localStorage.getItem('sharedLooks') || '{}');
  savedLooks[look._id] = look;
  localStorage.setItem('sharedLooks', JSON.stringify(savedLooks));
  const url = `${window.location.origin}/share/${look._id}`;
  navigator.clipboard.writeText(url);
  alert('קישור לשיתוף הועתק');
};

// לדוגמה בלולאת map של לוקים:
const looks: Looks[] = []; // TODO: Replace with your actual data source

{looks.map((look: Looks) => (
  <Button key={look._id} onClick={() => handleShare(look)} variant="outlined">שתפי</Button>
))}