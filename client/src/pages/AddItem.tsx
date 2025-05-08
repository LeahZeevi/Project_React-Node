
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
import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useNavigate } from "react-router";


const AddItem = () => {
  const { register, handleSubmit, formState: { errors }, control,reset } = useForm({ mode: "onChange", resolver: zodResolver(ItemSchema) });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
    const [addItem] = useAddItemMutation();


  const onSubmit =  async(data:any) => {
    console.log("enter onsubmit");
   console.log(data);
    
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("categoryName", data.categoryName);
    formData.append("session", data.session || " ");
    formData.append("style", data.style || "");
    if (data.url && data.url[0]) {
      formData.append("url", data.url[0]); // הקובץ עצמו
    }
    
   
       try {
         const response = await addItem(formData).unwrap();
         console.log(response);
         setImage(null); // איפוס התמונה לאחר ההצלחה
        reset({
          itemName: '',
          categoryName: '',
          session: 'חורף', // או ערך ברירת מחדל אחר
          style: '',
          url: "",
        }); 
        // איפוס הטופס לאחר הצלחה
        navigate("/"); // ניווט לדף הבית או דף אחר
         } catch (error) {
         console.error("שגיאה בהוספת פריט:", error);
         }
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
              fullWidth
            />
            {errors.itemName && <p style={{ color: "red" }}>{errors.itemName.message}</p>}


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
                    {...register("categoryName")}
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

        

             <Controller
              control={control}
              render={({ field }) => (
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const fileList = e.target.files;
                    if (fileList && fileList.length > 0) {
                      field.onChange(fileList); // שולח את הקובץ ל-form
                      handleImageChange(e);    // מציג תצוגה מקדימה
                    }
                  }}
                  fullWidth
                />
              )}
              {...register("url")}
            />

            <Controller
              control={control}
              defaultValue="חורף"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="חורף" control={<Radio color="secondary" />} label="חורף" />
                  <FormControlLabel value="מעבר" control={<Radio color="secondary" />} label="מעבר" />
                  <FormControlLabel value="קיץ" control={<Radio color="secondary" />} label="קיץ" />
                </RadioGroup>
              )}
              {...register("session")}
            />


            <Controller
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>סגנון</InputLabel>
                  <Select label="סגנון" {...field}>
                    <MenuItem value="ביסיק">ביסיק</MenuItem>
                    <MenuItem value="ספורט">ספורט</MenuItem>
                    <MenuItem value="ספורט אלגנט">ספורט אלגנט</MenuItem>
                    <MenuItem value="אלגנט">אלגנט</MenuItem>
                    <MenuItem value="אחר">אחר</MenuItem>
                  </Select>
                </FormControl>
            
              )}
              {...register("style")}
            />

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
            </Button >
            {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen} />}
          </Stack> 
        </form> 

      </Paper>
    </Box>
  );
};

export default AddItem;

