"use client"

import type React from "react"
import { useState } from "react"
import { useAddItemMutation } from "../redux/api/apiSllices/itemsApiSlice"
import { useDispatch, useSelector } from "react-redux"
import type { Users } from "../interfaces/Users"
import { selectUser } from "../redux/slices/userSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import ItemSchema from "../schemas/ItemSchema"
import { Box,Button, FormControl,FormControlLabel,IconButton,InputLabel,MenuItem,Paper,Radio,
  RadioGroup,Select,TextField,Typography,Backdrop,Slide,} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import type Item from "../interfaces/Items"
import { setAllItems } from "../redux/slices/itemSlice"
import '../css/AddItemDialog.css'
interface AddItemDialogProps {
  addItemDialogP: boolean
  setAddItemDialogP: (value: boolean) => void
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ addItemDialogP, setAddItemDialogP }) => {
  const user: Users | null = useSelector(selectUser)
  const [addItem] = useAddItemMutation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(ItemSchema),
  })

  const [formData, setFormData] = useState<{
    name: string
    category: string
    season: string
    image: File | null
  }>({
    name: "",
    category: "",
    season: "",
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  if (!user) {
    console.error("User is null – ייתכן שעדיין לא התחבר או שה־state לא נטען")
    return null
  }

  const resetForm = () => {
    reset()
    setFormData({
      name: "",
      category: "",
      season: "",
      image: null,
    })
    setImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImagePreview(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    if (data.image && data.image[0]) {
      console.log("data.image[0]:", data.image[0])

      formData.append("image", data.image[0])
      const flaskResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
      if (!flaskResponse.ok) {
        console.error("❌ קריאה ל־Flask נכשלה", flaskResponse.status)
        alert("שרת זיהוי לא מגיב. נסי שוב מאוחר יותר.")
        return
      }
      const result = await flaskResponse.json()
      console.log("זיהוי המודל:", result)
      formData.append("userId", user._id)
      formData.append("categoryName", result.predicted_class)
      formData.append("itemName", data.itemName)
      formData.append("session", data.session || " ")
      formData.append("style", data.style || "")

      try {
        const response: { newItem: Item } = await addItem({ _id: user._id, newItem: formData }).unwrap()
        if (response) {
          dispatch(setAllItems(response.newItem))
        }
        resetForm()
        setAddItemDialogP(false)
      } catch (error) {
        console.error("שגיאה בהוספת פריט:", error)
      }
    }
  }

  return (
    <Backdrop open={addItemDialogP} className="styled-backdrop">
      <Slide direction="down" in={addItemDialogP} timeout={400}>
        <Box className="slide-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper className="dialog-container">
              <Box className="dialog-header">
                <Typography className="gradient-title">הוספת בגד חדש</Typography>
                <IconButton
                  onClick={() => {
                    resetForm()
                    setAddItemDialogP(false)
                  }}
                  size="small"
                  className="close-button"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box className="form-content">
                <TextField
                  label="שם הבגד"
                  fullWidth
                  variant="outlined"
                  error={!!errors.itemName}
                  helperText={errors.itemName?.message?.toString()}
                  className="styled-text-field"
                  {...register("itemName")}
                />

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  fullWidth
                  className="image-upload-button"
                >
                  העלאת תמונה
                  <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        className="visually-hidden-input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const fileList = e.target.files
                          if (fileList && fileList.length > 0) {
                            field.onChange(fileList)
                            handleImageChange(e)
                          }
                        }}
                      />
                    )}
                  />
                </Button>

                {errors.image && (
                  <Typography color="error" variant="caption">
                    {errors.image.message?.toString()}
                  </Typography>
                )}

                {imagePreview && (
                  <Box className="image-preview-container">
                    <Typography variant="subtitle2" className="image-preview-title">
                      תמונה שהועלתה
                    </Typography>
                    <img src={imagePreview || "/placeholder.svg"} alt="תצוגה מקדימה" className="image-preview" />
                  </Box>
                )}

                <Box className="radio-group-container">
                  <Typography variant="subtitle2" className="radio-group-title">
                    עונה
                  </Typography>
                  <Controller
                    control={control}
                    name="session"
                    defaultValue="חורף"
                    render={({ field }) => (
                      <RadioGroup row {...field} className="radio-group">
                        <FormControlLabel
                          value="חורף"
                          control={<Radio size="small" className="styled-radio" />}
                          label="חורף"
                        />
                        <FormControlLabel
                          value="כללי"
                          control={<Radio size="small" className="styled-radio" />}
                          label="כללי"
                        />
                        <FormControlLabel
                          value="קיץ"
                          control={<Radio size="small" className="styled-radio" />}
                          label="קיץ"
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>

                <Controller
                  control={control}
                  name="style"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth className="styled-form-control">
                      <InputLabel>סגנון</InputLabel>
                      <Select label="סגנון" {...field} className="styled-select">
                        <MenuItem value="ביסיק">ביסיק</MenuItem>
                        <MenuItem value="ספורט">ספורט</MenuItem>
                        <MenuItem value="ספורט אלגנט">ספורט אלגנט</MenuItem>
                        <MenuItem value="אלגנט">אלגנט</MenuItem>
                        <MenuItem value="אחר">אחר</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Button type="submit" fullWidth className="submit-button">
                  הוסף לארון הבגדים 
                </Button>
              </Box>
            </Paper>
          </form>
        </Box>
      </Slide>
    </Backdrop>
  )
}
export default AddItemDialog
