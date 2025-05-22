import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { selectUser } from '../redux/slices/userSlice';
import ItemSchema from '../schemas/ItemSchema';
import { Users } from '../interfaces/Users';

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onItemAdded: () => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onClose, onItemAdded }) => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    mode: 'onChange',
    resolver: zodResolver(ItemSchema),
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [addItem] = useAddItemMutation();
  const user: Users = useSelector(selectUser);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      console.log('תמונה שהועלתה:', event.target.files[0]);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);

      try {
        const flaskResponse = await fetch('http://localhost:3000/api/predict', {
          method: 'POST',
          body: formData,
        });

        const result = await flaskResponse.json();
        console.log('זיהוי המודל:', result);

        formData.append('userId', user._id);
        formData.append('categoryName', result.predictedCategory);
        formData.append('itemName', data.itemName);
        formData.append('session', data.session || ' ');
        formData.append('style', data.style || '');

        const response = await addItem({ _id: user._id, newItem: formData }).unwrap();
        console.log('response add item', response);
        setImagePreview(null);
        reset({
          itemName: '',
          session: 'חורף',
          style: '',
          image: '',
        });
        onItemAdded();
        onClose();
      } catch (error) {
        console.error('שגיאה בהוספת פריט:', error);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <Box
        display="flex"
        justifyContent="center"
        mt={4}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" color="secondary" textAlign="center" mb={3}>
            הוספת בגד לארון
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="שם הפריט"
                variant="outlined"
                color="secondary"
                {...register('itemName')}
                fullWidth
              />
              {errors.itemName?.message && typeof errors.itemName.message === 'string' && (
                <p style={{ color: 'red' }}>{errors.itemName.message}</p>
              )}

              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Button
                    variant="outlined"
                    component="label"
                    color="secondary"
                    sx={{ height: 100, borderStyle: 'dashed' }}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Item Preview" style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }} />
                    ) : (
                      'העלה תמונה'
                    )}
                    <input
                      type="file"
                      hidden
                      {...field}
                      onChange={(e) => {
                        onChange(e);
                        handleImageChange(e);
                      }}
                    />
                  </Button>
                )}
              />
              {errors.image?.message && typeof errors.image.message === 'string' && (
                <p style={{ color: 'red' }}>{errors.image.message}</p>
              )}

              <FormControl fullWidth>
                <InputLabel id="session-label" color="secondary">
                  עונה
                </InputLabel>
                <Controller
                  name="session"
                  control={control}
                  defaultValue="חורף"
                  render={({ field }) => (
                    <Select labelId="session-label" label="עונה" {...field}>
                      <MenuItem value="חורף">חורף</MenuItem>
                      <MenuItem value="אביב">אביב</MenuItem>
                      <MenuItem value="קיץ">קיץ</MenuItem>
                      <MenuItem value="סתיו">סתיו</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <TextField
                label="סגנון (אופציונלי)"
                variant="outlined"
                color="secondary"
                {...register('style')}
                fullWidth
              />

              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" color="secondary" sx={{ flexGrow: 1 }}>
                  הוסף פריט
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose} sx={{ flexGrow: 1 }}>
                  ביטול
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default AddItemDialog;