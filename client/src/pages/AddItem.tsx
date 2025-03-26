import { Button, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useForm } from "react-hook-form";
import AddItem_Alert from "./AddItem_Alert";
import { useState } from "react";

const AddItem = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onChange" });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    console.log(data);
    setIsAlertOpen(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField id="outlined-basic" label="Item Name" variant="outlined" color='secondary' {...register("name")} />
        {errors.name && <p style={{ color: "red" }}></p>}

        <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary'  {...register("email")} />
        {errors.email && <p style={{ color: "red" }}></p>}
        {<Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
          Send
        </Button>}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="Category-select"
            id="Category-select"
            label="Age"
          >
            <MenuItem value={"חולצות"}>חולצות</MenuItem>
            <MenuItem value={"חצאיות/מכנסיים"}>חצאיות/מכנסיים</MenuItem>
            <MenuItem value={"שמלות"}>שמלות</MenuItem>
            <MenuItem value={"נעלים"}>נעלים</MenuItem>
            <MenuItem value={"פיג'מות"}>פיג'מות</MenuItem>
          </Select>
        </FormControl>
        <button className="open-modal-btn" type="button" onClick={() => setIsAlertOpen(true)}>
          להוספת התאמת בגדים - הצג את הקטלוג
        </button>

        <TextField
          type="file"
          sx={{ minWidth: '5cm' }}
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
          variant="outlined"
        />
        <RadioGroup
          color={"secondary"}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="session">
          <FormControlLabel value="חורף" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="חורף" />
          <FormControlLabel value="מעבר" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="מעבר" />
          <FormControlLabel value="קיץ" control={<Radio sx={{ color: 'secondary.main', '&.Mui-checked': { color: 'secondary.main' } }} />} label="קיץ" />
        </RadioGroup>



        <FormControl>
          <InputLabel id="demo-simple-select-label">Style</InputLabel>
          <Select
            labelId="style"
            id="style"
            label="style"
            autoWidth
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
          <div>
            <h3>תמונה שהועלתה:</h3>
            <img src={image} alt="uploaded" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </div>
        )}

        {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen}/>}
      </form>
    </div>
  );
};


export default AddItem
