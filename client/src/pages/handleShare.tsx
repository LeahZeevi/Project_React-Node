// בתוך הקומפוננטה שמציגה את הלוקים

import { Button } from '@mui/material';
import { Look } from '../interfaces/Look';

const handleShare = (look: Look) => {
  const savedLooks = JSON.parse(localStorage.getItem('sharedLooks') || '{}');
  savedLooks[look.id] = look;
  localStorage.setItem('sharedLooks', JSON.stringify(savedLooks));
  const url = `${window.location.origin}/share/${look.id}`;
  navigator.clipboard.writeText(url);
  alert('קישור לשיתוף הועתק');
};

// לדוגמה בלולאת map של לוקים:
const looks: Look[] = []; // TODO: Replace with your actual data source

{looks.map((look: Look) => (
  <Button key={look.id} onClick={() => handleShare(look)} variant="outlined">שתפי</Button>
))}