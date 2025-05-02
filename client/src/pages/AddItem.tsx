// import { Button, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { useForm } from "react-hook-form";
// import AddItem_Alert from "./AddItem_Alert";
// import { useState } from "react";

// const AddItem = () => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onChange" });
//   const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//   const [image, setImage] = useState<string | null>(null);

//   const onSubmit = (data: any) => {
//     console.log(data);
//     setIsAlertOpen(true);
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField id="outlined-basic" label="Item Name" variant="outlined" color='secondary' {...register("name")} />
//         {errors.name && <p style={{ color: "red" }}></p>}

//         {/* <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary'  {...register("email")} />
//         {errors.email && <p style={{ color: "red" }}></p>} */}
//         <FormControl>
//           <InputLabel id="demo-simple-select-label">Category</InputLabel>
//           <Select
//             labelId="Category-select"
//             id="Category-select"
//             label="Age"
//           >
//             <MenuItem value={"חולצות"}>חולצות</MenuItem>
//             <MenuItem value={"חצאיות/מכנסיים"}>חצאיות/מכנסיים</MenuItem>
//             <MenuItem value={"שמלות"}>שמלות</MenuItem>
//             <MenuItem value={"נעלים"}>נעלים</MenuItem>
//             <MenuItem value={"פיג'מות"}>פיג'מות</MenuItem>
//           </Select>
//         </FormControl>
//         <button className="open-modal-btn" type="button" onClick={() => setIsAlertOpen(true)}>
//           להוספת התאמת בגדים - הצג את הקטלוג
//         </button>

//         <TextField
//           type="file"
//           sx={{ minWidth: '5cm' }}
//           inputProps={{ accept: 'image/*' }}
//           onChange={handleImageChange}
//           variant="outlined"
//         />
//         <RadioGroup
//           color={"secondary"}
//           aria-labelledby="demo-radio-buttons-group-label"
//           defaultValue="female"
//           name="session">
//           <FormControlLabel value="חורף" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="חורף" />
//           <FormControlLabel value="מעבר" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="מעבר" />
//           <FormControlLabel value="קיץ" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="קיץ" />
//         </RadioGroup>



//         <FormControl>
//           <InputLabel id="demo-simple-select-label">Style</InputLabel>
//           <Select
//             labelId="style"
//             id="style"
//             label="style"
//             autoWidth
//             sx={{ minWidth: '5cm' }}
//           >
//             <MenuItem value={"ביסיק"}>ביסיק</MenuItem>
//             <MenuItem value={"ספורט"}>ספורט</MenuItem>
//             <MenuItem value={"ספורט אלגנט"}>ספורט אלגנט</MenuItem>
//             <MenuItem value={"אלגנט"}>אלגנט</MenuItem>
//             <MenuItem value={"אחר"}>אחר</MenuItem>
//           </Select>
//         </FormControl>
//         {image && (
//           <div>
//             <h3>תמונה שהועלתה:</h3>
//             <img src={image} alt="uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
//           </div>
//         )}
//           {<Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
//           Send
//         </Button>}
//         {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen}/>}
//       </form>
//     </div>
//   );
// };


// export default AddItem
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import AddItem_Alert from "./AddItem_Alert";
import { useState } from "react";
import Item from "../interfaces/Items";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemSchema from "../schemas/ItemSchema";

const AddItem = () => {
  const { register, handleSubmit, setValue, formState: { errors },control } = useForm({ mode: "onChange" ,resolver:(zodResolver(ItemSchema))});
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    console.log(data);
    setIsAlertOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" color="secondary" textAlign="center" mb={3}>
          הוספת בגד לארון
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="שם הפריט"
              variant="outlined"
              color='secondary'
              {...register("itemName")}
              {...errors.itemName && <p style={{color: "red"}}>{errors.itemName.message}</p>}
              fullWidth
            />

     
<Controller
  name="categoryName"
  control={control} // מגיע מ-useForm
  defaultValue=""
  render={({ field }) => (
    <FormControl fullWidth>
      <InputLabel id="Category-select-label">קטגוריה</InputLabel>
      <Select
        labelId="Category-select-label"
        id="Category-select"
        label="קטגוריה"
        {...field} 
      >
        <MenuItem value="חולצות">חולצות</MenuItem>
        <MenuItem value="חצאיות/מכנסיים">חצאיות/מכנסיים</MenuItem>
        <MenuItem value="שמלות">שמלות</MenuItem>
        <MenuItem value="נעלים">נעלים</MenuItem>
        <MenuItem value="פיג'מות">פיג'מות</MenuItem>
      </Select>
    </FormControl>
  )}
/>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsAlertOpen(true)}
            >
              להוספת התאמת בגדים - הצג את הקטלוג
            </Button>

            <TextField
              type="file"
              // inputProps={{ accept: 'image/*' }}
              // {...register("url")}
              // {...errors.url && <p style={{color: "red"}}>{errors.url.message}</p>}
              onChange={handleImageChange}
              variant="outlined"
              fullWidth
            />

            <FormControl component="fieldset">
              <Typography variant="subtitle1" mb={1}>
                עונה
              </Typography>
              <RadioGroup
                row
                name="session"
                defaultValue="חורף"
              >
                <FormControlLabel value="חורף" control={<Radio color="secondary" />} label="חורף" />
                <FormControlLabel value="מעבר" control={<Radio color="secondary" />} label="מעבר" />
                <FormControlLabel value="קיץ" control={<Radio color="secondary" />} label="קיץ" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>סגנון</InputLabel>
              <Select
                label="סגנון"
                id="style"
                sx={{ minWidth: '5cm' }}
              >
                <MenuItem value={"ביסיק"}>ביסיק</MenuItem>
                <MenuItem value={"ספורט"}>ספורט</MenuItem>
                <MenuItem value={"ספורט אלגנט"}>ספורט אלגנט</MenuItem>
                <MenuItem value={"אלגנט"}>אלגנט</MenuItem>
                <MenuItem value={"אחר"}>אחר</MenuItem>
              </Select>
            </FormControl>

            {image && (
              <Box>
                <Typography variant="subtitle1">תמונה שהועלתה:</Typography>
                <img src={image} alt="uploaded" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 8 }} />
              </Box>
            )}

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              הוספה לארון
            </Button>

            {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen} />}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddItem;

