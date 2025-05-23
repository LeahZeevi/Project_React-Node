import { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

function CitiesDropdown() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users/excel-column') // כתובת השרת שלך
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('שגיאה בקבלת ערי ישראל:', error);
      });
  }, []);


  return (
    <div>
    <Autocomplete
      id="city-autocomplete"
      options={cities}
      autoSave='true'
      autoHighlight
      getOptionLabel={(option) => option}
    
      renderInput={(params) => (
        <TextField {...params} label="בחר או הקלד עיר" variant="outlined" />
      )}
       sx={{ width: 300 }} // הגדרת רוחב ל-300 פיקסלים (שנה לפי הצורך)
    />
    </div>
  )
}

export default CitiesDropdown;
