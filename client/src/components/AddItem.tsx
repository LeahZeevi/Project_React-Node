import {Button,TextField,FormControl,InputLabel,Select,MenuItem,RadioGroup,FormControlLabel,Radio,
  Box,Stack,Typography,Paper,Alert} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Item from "../interfaces/Items"; // ייבוא ה-interface
import { zodResolver } from "@hookform/resolvers/zod";
import ItemSchema from "../schemas/ItemSchema";
import { Users } from "../interfaces/Users"
import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux"; // ייבוא useDispatch
import { selectUser } from "../redux/slices/userSlice";
import { setAllItems } from "../redux/slices/itemSlice";

const AddItem = () => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ mode: "onChange", resolver: zodResolver(ItemSchema) });
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [addItem] = useAddItemMutation();
  const dispatch = useDispatch();
  const user: Users = useSelector(selectUser)
  const [message, setMessage] = useState("");
  const [alertError, setAlertError] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      console.log("תמונה שהועלתה:", event.target.files[0]);
    }
  };


  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
      const flaskResponse = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        body: formData
      });
      const result = await flaskResponse.json();
      console.log("זיהוי המודל:", result);
      formData.append("userId", user._id);
      formData.append("categoryName", result.predictedCategory);
      formData.append("itemName", data.itemName);
      // formData.append("image", data.image[0]);
      formData.append("session", data.session || " ");
      formData.append("style", data.style || "");
      console.log("data.image[0]:", data.image[0]);

      try {
        const response: { newItem: Item } = await addItem({ _id: user._id, newItem: formData }).unwrap();
        if (response) {
          dispatch(setAllItems(response.newItem))
        }
        setImage(null);
        reset({ itemName: '', session: 'חורף', style: '', image: "", });
        navigate("/");

      }
      catch (error: any) {
        if (error?.data?.message) {
          setMessage(error.data.message);
        } else if (error.message === "Network Error") {
          setMessage("Unable to connect to the server. Check your internet connection.");
        } else if (error.code === "ECONNABORTED") {
          setMessage("The request to the server took too long. Please try again later.");
        }
        setAlertError(true);
      }
    }
  }




  return (
    <div>
      <Box display="flex" justifyContent="center" mt={4}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" color="secondary" textAlign="center" mb={3}>
            הוספת בגד לארון
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField label="שם הפריט" variant="outlined" color='secondary' {...register("itemName")} fullWidth />
              {errors.itemName && <p style={{ color: "red" }}>{errors.itemName.message}</p>}
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
                {...register("image")}
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
            </Stack>
          </form>
        </Paper>
      </Box>
      {alertError && (<Box sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 9999, }}>
        <Alert severity="error">{message}</Alert>
      </Box>)}
    </div>
  )
}

export default AddItem

