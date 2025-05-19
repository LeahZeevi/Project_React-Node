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
import Item, { ItemWithId } from "../interfaces/Items"; // ייבוא ה-interface
import { zodResolver } from "@hookform/resolvers/zod";
import ItemSchema from "../schemas/ItemSchema";
import { Users } from "../interfaces/Users"
import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux"; // ייבוא useDispatch
import { selectUser } from "../redux/slices/userSlice";

const AddItem = () => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ mode: "onChange", resolver: zodResolver(ItemSchema) });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [addItem] = useAddItemMutation();
  // const user = useSelector(selectUser)

  const userString = localStorage.getItem('user');
  const user: Users = userString ? JSON.parse(userString) : null
  const dispatch = useDispatch(); // שימוש ב-useDispatch

  const onSubmit = async (data: any) => {

    // try {
    //   const response = await fetch('http://localhost:5000/predict', {
    //     method: 'POST',
    //     body: data.url,
    //   });
    //   const jsonResponse = await response.json();
    //   const predictedCategory = jsonResponse.predicted_class;



      const formData = new FormData();
      formData.append("itemName", data.itemName);
      formData.append("categoryName", data.categoryName);
      formData.append("session", data.session || " ");
      formData.append("style", data.style || "");
      if (data.url && data.url[0]) {
        formData.append("url", data.url[0]);

        try {
          const response = await addItem({ _id: user._id, newItem: formData });
          console.log("response add item", response);
          const addedItem = user.myWardrobe[user.myWardrobe.length - 1];
          // dispatch(addItemToWardrobe(addedItem)); // שליחת הפעולה לעדכון ה-state
          setImage(null);
          reset({
            itemName: '',
            categoryName: '',
            session: 'חורף',
            style: '',
            url: "",
          });
          navigate("/");
        }
        catch (error) {
          console.error("שגיאה בהוספת פריט:", error);
        }
      };
    }
  
  
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
                <TextField label="שם הפריט" variant="outlined" color='secondary' {...register("itemName")} fullWidth />
                {errors.itemName && <p style={{ color: "red" }}>{errors.itemName.message}</p>}
                <Controller
                  name="categoryName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="Category-select-label">קטגוריה</InputLabel>
                      <Select labelId="Category-select-label" id="Category-select" label="קטגוריה" {...register("categoryName")} {...field}>
                        <MenuItem value="חולצות">חולצות</MenuItem>
                        <MenuItem value="חצאיות">חצאיות</MenuItem>
                        <MenuItem value="שמלות">שמלות</MenuItem>
                        <MenuItem value="נעלים">נעלים</MenuItem>
                        <MenuItem value="פיג'מות">פיג'מות</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <Button variant="outlined" color="secondary" onClick={() => setIsAlertOpen(true)}>
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
                          field.onChange(fileList);
                          handleImageChange(e);
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
                      <FormControlLabel value="כללי" control={<Radio color="secondary" />} label="כללי" />
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
                <Button variant="contained" color="secondary" type="submit" fullWidth>
                  הוספה לארון
                </Button >
                {isAlertOpen && <AddItem_Alert setIsAlertOpen={setIsAlertOpen} isAlertOpen={isAlertOpen} />}
              </Stack>
            </form>
          </Paper>
        </Box>
      );
    }

  export default AddItem;