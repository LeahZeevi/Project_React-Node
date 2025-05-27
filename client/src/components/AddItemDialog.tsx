// // import React, { useState } from 'react';
// // import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
// // import { Controller, useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { useSelector } from 'react-redux';
// // import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
// // import { selectUser } from '../redux/slices/userSlice';
// // import ItemSchema from '../schemas/ItemSchema';
// // import { Users } from '../interfaces/Users';

// // interface AddItemDialogProps {
// //   open: boolean;
// //   onClose: () => void;
// //   onItemAdded: () => void;
// // }

// // const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, onClose, onItemAdded }) => {
// //   const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
// //     mode: 'onChange',
// //     resolver: zodResolver(ItemSchema),
// //   });
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const [addItem] = useAddItemMutation();
// //   const user: Users = useSelector(selectUser);

// //   // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //   //   if (event.target.files && event.target.files[0]) {
// //   //     setImagePreview(URL.createObjectURL(event.target.files[0]));
// //   //     console.log('תמונה שהועלתה:', event.target.files[0]);
// //   //   } else {
// //   //     setImagePreview(null);
// //   //   }
// //   // };

// //   const onSubmit = async (data: any) => {
// //     const formData = new FormData();
// //     if (data.image && data.image[0]) {
// //       formData.append('image', data.image[0]);

// //       try {
// //         const flaskResponse = await fetch('http://localhost:3000/api/predict', {
// //           method: 'POST',
// //           body: formData,
// //         });

// //         const result = await flaskResponse.json();
// //         console.log('זיהוי המודל:', result);

// //         formData.append('userId', user._id);
// //         formData.append('categoryName', result.predictedCategory);
// //         formData.append('itemName', data.itemName);
// //         formData.append('session', data.session || ' ');
// //         formData.append('style', data.style || '');

// //         const response = await addItem({ _id: user._id, newItem: formData }).unwrap();
// //         console.log('response add item', response);
// //         setImagePreview(null);
// //         reset({
// //           itemName: '',
// //           session: 'חורף',
// //           style: '',
// //           image: '',
// //         });
// //         onItemAdded();
// //         onClose();
// //       } catch (error) {
// //         console.error('שגיאה בהוספת פריט:', error);
// //       }
// //     }
// //   };

// //   if (!open) return null;

// // //   return (
// // //     <div className="dialog-overlay" onClick={onClose}>
// // //       <Box
// // //         display="flex"
// // //         justifyContent="center"
// // //         mt={4}
// // //         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
// // //       >
// // //         <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
// // //           <Typography variant="h5" color="secondary" textAlign="center" mb={3}>
// // //             הוספת בגד לארון
// // //           </Typography>
// // //           <form onSubmit={handleSubmit(onSubmit)}>
// // //             <Stack spacing={3}>
// // //               <TextField
// // //                 label="שם הפריט"
// // //                 variant="outlined"
// // //                 color="secondary"
// // //                 {...register('itemName')}
// // //                 fullWidth
// // //               />
// // //               {errors.itemName?.message && typeof errors.itemName.message === 'string' && (
// // //                 <p style={{ color: 'red' }}>{errors.itemName.message}</p>
// // //               )}

// // //               <Controller
// // //                 name="image"
// // //                 control={control}
// // //                 render={({ field: { onChange, value, ...field } }) => (
// // //                   <Button
// // //                     variant="outlined"
// // //                     component="label"
// // //                     color="secondary"
// // //                     sx={{ height: 100, borderStyle: 'dashed' }}
// // //                   >
// // //                     {imagePreview ? (
// // //                       <img src={imagePreview} alt="Item Preview" style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }} />
// // //                     ) : (
// // //                       'העלה תמונה'
// // //                     )}
// // //                     <input
// // //                       type="file"
// // //                       hidden
// // //                       {...field}
// // //                       onChange={(e) => {
// // //                         onChange(e);
// // //                         handleImageChange(e);
// // //                       }}
// // //                     />
// // //                   </Button>
// // //                 )}
// // //               />
// // //               {errors.image?.message && typeof errors.image.message === 'string' && (
// // //                 <p style={{ color: 'red' }}>{errors.image.message}</p>
// // //               )}

// // //               <FormControl fullWidth>
// // //                 <InputLabel id="session-label" color="secondary">
// // //                   עונה
// // //                 </InputLabel>
// // //                 <Controller
// // //                   name="session"
// // //                   control={control}
// // //                   defaultValue="חורף"
// // //                   render={({ field }) => (
// // //                     <Select labelId="session-label" label="עונה" {...field}>
// // //                       <MenuItem value="חורף">חורף</MenuItem>
// // //                       <MenuItem value="אביב">אביב</MenuItem>
// // //                       <MenuItem value="קיץ">קיץ</MenuItem>
// // //                       <MenuItem value="סתיו">סתיו</MenuItem>
// // //                     </Select>
// // //                   )}
// // //                 />
// // //               </FormControl>

// // //               <TextField
// // //                 label="סגנון (אופציונלי)"
// // //                 variant="outlined"
// // //                 color="secondary"
// // //                 {...register('style')}
// // //                 fullWidth
// // //               />

// // //               <Stack direction="row" spacing={2}>
// // //                 <Button type="submit" variant="contained" color="secondary" sx={{ flexGrow: 1 }}>
// // //                   הוסף פריט
// // //                 </Button>
// // //                 <Button variant="outlined" color="secondary" onClick={onClose} sx={{ flexGrow: 1 }}>
// // //                   ביטול
// // //                 </Button>
// // //               </Stack>
// // //             </Stack>
// // //           </form>
// // //         </Paper>
// // //       </Box>
// // //     </div>
// // //   );
// // // };

// // // export default AddItemDialog;


// //   const [formData, setFormData] = useState<{
// //     name: string;
// //     category: string;
// //     season: string;
// //     image: File | null;
// //   }>({
// //     name: '',
// //     category: '',
// //     season: '',
// //     image: null
// //   });

// //   const categories = [
// //     'חולצות',
// //     'מכנסים',
// //     'שמלות',
// //     'חצאיות',
// //     'נעלים'
// //   ];

// //   const seasons = [
// //     { value: 'spring', label: 'אביב' },
// //     { value: 'summer', label: 'קיץ' },
// //     { value: 'winter', label: 'חורף' }
// //   ];

// //   const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files && e.target.files[0];
// //     if (file) {
// //       setFormData(prev => ({
// //         ...prev,
// //         image: file
// //       }));

// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         if (e.target && typeof e.target.result === 'string') {
// //           setImagePreview(e.target.result);
// //         }
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };


// // if (!open) return null; // לא מציג את הקומפוננטה כלל כשהיא סגורה
// //   return (
// //     <div style={{
// //       // minHeight: '100vh',
// //       // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //       // padding: '20px',
// //       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
// //     }}>
// //       <div style={{
// //         maxWidth: '400px',
// //         margin: '0 auto',
// //         background: 'rgba(255, 255, 255, 0.95)',
// //         borderRadius: '16px',
// //         padding: '30px',
// //         boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
// //         backdropFilter: 'blur(10px)',
// //         border: '1px solid rgba(255, 255, 255, 0.2)'
// //       }}>
// //         <h1 style={{
// //           textAlign: 'center',
// //           color: '#333',
// //           fontSize: '24px',
// //           marginBottom: '25px',
// //           fontWeight: '600',
// //           background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //           WebkitBackgroundClip: 'text',
// //           WebkitTextFillColor: 'transparent',
// //           backgroundClip: 'text'
// //         }}>
// //           הוספת בגד חדש
// //         </h1>

// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

// //           {/* שדה שם */}
// //           <div style={{ position: 'relative' }}>
// //             <label style={{
// //               display: 'block',
// //               marginBottom: '8px',
// //               color: '#555',
// //               fontWeight: '500',
// //               fontSize: '14px'
// //             }}>
// //               שם הבגד
// //             </label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleInputChange}
// //               required
// //               style={{
// //                 width: '100%',
// //                 padding: '12px 16px',
// //                 border: '2px solid #e1e5e9',
// //                 borderRadius: '10px',
// //                 fontSize: '14px',
// //                 backgroundColor: '#fff',
// //                 transition: 'all 0.3s ease',
// //                 outline: 'none',
// //                 boxSizing: 'border-box',
// //                 direction: 'rtl',
// //                 textAlign: 'right'
// //               }}
// //               onFocus={(e) => {
// //                 (e.target as HTMLInputElement).style.borderColor = '#667eea';
// //                 (e.target as HTMLInputElement).style.transform = 'translateY(-2px)';
// //                 (e.target as HTMLInputElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
// //               }}
// //               onBlur={(e) => {
// //                 e.target.style.borderColor = '#e1e5e9';
// //                 (e.target as HTMLInputElement).style.transform = 'translateY(0)';
// //                 (e.target as HTMLInputElement).style.boxShadow = 'none';
// //               }}
// //               placeholder="לדוגמה: חולצה כחולה"
// //             />
// //           </div>

// //           {/* שדה עונה */}
// //           <div style={{ position: 'relative' }}>
// //             <label style={{
// //               display: 'block',
// //               marginBottom: '8px',
// //               color: '#555',
// //               fontWeight: '500',
// //               fontSize: '14px'
// //             }}>
// //               עונה מתאימה
// //             </label>
// //             <div style={{
// //               display: 'flex',
// //               gap: '15px',
// //               flexWrap: 'wrap',
// //               justifyContent: 'space-between'
// //             }}>
// //               {seasons.map((season) => (
// //                 <label key={season.value} style={{
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   gap: '6px',
// //                   cursor: 'pointer',
// //                   padding: '8px 12px',
// //                   borderRadius: '8px',
// //                   backgroundColor: formData.season === season.value ? '#f0f4ff' : 'transparent',
// //                   border: formData.season === season.value ? '2px solid #667eea' : '2px solid transparent',
// //                   transition: 'all 0.2s ease',
// //                   fontSize: '14px',
// //                   fontWeight: '500',
// //                   color: formData.season === season.value ? '#667eea' : '#666'
// //                 }}>
// //                   <input
// //                     type="radio"
// //                     name="season"
// //                     value={season.value}
// //                     checked={formData.season === season.value}
// //                     onChange={handleInputChange}
// //                     style={{
// //                       margin: 0,
// //                       width: '16px',
// //                       height: '16px',
// //                       accentColor: '#667eea'
// //                     }}
// //                   />
// //                   {season.label}
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* שדה קטגוריה */}
// //           <div style={{ position: 'relative' }}>
// //             <label style={{
// //               display: 'block',
// //               marginBottom: '8px',
// //               color: '#555',
// //               fontWeight: '500',
// //               fontSize: '14px'
// //             }}>
// //               קטגוריית הבגד
// //             </label>
// //             <select
// //               name="category"
// //               value={formData.category}
// //               onChange={handleInputChange}
// //               required
// //               style={{
// //                 width: '100%',
// //                 padding: '12px 16px',
// //                 border: '2px solid #e1e5e9',
// //                 borderRadius: '10px',
// //                 fontSize: '14px',
// //                 backgroundColor: '#fff',
// //                 transition: 'all 0.3s ease',
// //                 outline: 'none',
// //                 boxSizing: 'border-box',
// //                 direction: 'rtl',
// //                 textAlign: 'right',
// //                 cursor: 'pointer'
// //               }}
// //               onFocus={(e) => {
// //                 e.target.style.borderColor = '#667eea';
// //                 e.target.style.transform = 'translateY(-2px)';
// //                 e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
// //               }}
// //               onBlur={(e) => {
// //                 e.target.style.borderColor = '#e1e5e9';
// //                 e.target.style.transform = 'translateY(0)';
// //                 e.target.style.boxShadow = 'none';
// //               }}
// //             >
// //               <option value="">בחר קטגוריה</option>
// //               {categories.map((category, index) => (
// //                 <option key={index} value={category}>
// //                   {category}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* שדה תמונה */}
// //           <div style={{ position: 'relative' }}>
// //             <label style={{
// //               display: 'block',
// //               marginBottom: '8px',
// //               color: '#555',
// //               fontWeight: '500',
// //               fontSize: '14px'
// //             }}>
// //               תמונת הבגד
// //             </label>

// //             <div style={{
// //               border: '2px dashed #e1e5e9',
// //               borderRadius: '10px',
// //               padding: '15px',
// //               textAlign: 'center',
// //               backgroundColor: '#fafbfc',
// //               transition: 'all 0.3s ease',
// //               cursor: 'pointer',
// //               position: 'relative',
// //               overflow: 'hidden'
// //             }}
// //             onMouseEnter={(e) => {
// //               (e.currentTarget as HTMLDivElement).style.borderColor = '#667eea';
// //               (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f8f9ff';
// //             }}
// //             onMouseLeave={(e) => {
// //               (e.currentTarget as HTMLDivElement).style.borderColor = '#e1e5e9';
// //               (e.currentTarget as HTMLDivElement).style.backgroundColor = '#fafbfc';
// //             }}>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 style={{
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                   width: '100%',
// //                   height: '100%',
// //                   opacity: 0,
// //                   cursor: 'pointer'
// //                 }}
// //               />

// //               {imagePreview ? (
// //                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
// //                   <img
// //                     src={imagePreview}
// //                     alt="תצוגה מקדימה"
// //                     style={{
// //                       width: '60px',
// //                       height: '60px',
// //                       objectFit: 'cover',
// //                       borderRadius: '8px',
// //                       border: '2px solid #667eea'
// //                     }}
// //                   />
// //                   <div style={{ textAlign: 'right' }}>
// //                     <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
// //                       התמונה נבחרה!
// //                     </p>
// //                     <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
// //                       לחץ לשינוי
// //                     </p>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div>
// //                   <div style={{
// //                     width: '40px',
// //                     height: '40px',
// //                     margin: '0 auto 10px',
// //                     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //                     borderRadius: '50%',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     color: 'white',
// //                     fontSize: '18px'
// //                   }}>
// //                     📷
// //                   </div>
// //                   <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
// //                     העלה תמונה
// //                   </p>
// //                   <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
// //                     PNG, JPG עד 5MB
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* כפתור שליחה */}
// //           <Button
// //             type="button"
// //             onClick={handleSubmit}
// //             style={{
// //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //               color: 'white',
// //               border: 'none',
// //               padding: '14px 24px',
// //               borderRadius: '10px',
// //               fontSize: '16px',
// //               fontWeight: '600',
// //               cursor: 'pointer',
// //               transition: 'all 0.3s ease',
// //               marginTop: '5px',
// //               boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
// //             }}
// //             onMouseEnter={(e) => {
// //               (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
// //               (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
// //             }}
// //             onMouseLeave={(e) => {
// //               (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
// //               (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
// //             }}
// //             onMouseDown={(e) => {
// //               (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
// //             }}
// //             onMouseUp={(e) => {
// //               (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
// //             }}
// //           >
// //             הוסף לארון הבגדים 👗
// //           </Button>
// //         </div>

// //         {/* הערה */}
// //         <p style={{
// //           textAlign: 'center',
// //           color: '#888',
// //           fontSize: '12px',
// //           marginTop: '15px',
// //           fontStyle: 'italic'
// //         }}>
// //           כל הבגדים ישמרו בארון הוירטואלי שלך
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddItemDialog;













// // ClothingModal.tsx
// import  { useState } from 'react';
// import Button from '@mui/material/Button';
// import AddItem from '../pages/AddItem';

// interface AddItemDialogProps {
//   addItemDialogP: boolean;
//   setAddItemDialogP: (value: Boolean) => void;
// }
// import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
// import { useSelector } from 'react-redux';
// import { Users } from '../interfaces/Users';
// import { selectUser } from '../redux/slices/userSlice';
// const [image, setImage] = useState<string | null>(null);
// const AddItemDialog: React.FC<AddItemDialogProps> = ({ addItemDialogP, setAddItemDialogP }) => {
//   const [addItem] = useAddItemMutation();
//   const user: Users = useSelector(selectUser);

//   const [formData, setFormData] = useState<{
//     name: string;
//     category: string;
//     season: string;
//     image: File | null;
//   }>({
//     name: '',
//     category: '',
//     season: '',
//     image: null
//   });
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const style = ['שבת', 'אלגנט', 'ספורט אלגנט', 'יומיומי', 'ספורט'];
//   const seasons = [
//     { value: 'spring', label: 'אביב' },
//     { value: 'between', label: 'מעבר' },
//     { value: 'winter', label: 'חורף' }
//   ];

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       category: '',
//       season: '',
//       image: null
//     });
//     setImagePreview(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     if (e.target instanceof HTMLInputElement && e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setFormData(prev => ({ ...prev, image: file }));
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target && typeof e.target.result === 'string') {
//           setImagePreview(e.target.result);
//         }
//       }
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     const data = formData;
//     const form = new FormData();
//     if (data.image) {
//       form.append("image", data.image);
//       const flaskResponse = await fetch("http://localhost:3000/api/predict", {
//         method: "POST",
//         body: form
//       });

//       const result = await flaskResponse.json();
//       console.log("זיהוי המודל:", result);
//       form.append("userId", user._id);
//       form.append("categoryName", result.predictedCategory);
//       form.append("itemName", data.name);
//       form.append("session", data.season || " ");
//       form.append("style", data.category || "");

//       try {
//         const response = await addItem({ _id: user._id, newItem: form });
//         console.log("response add item", response);
//         resetForm();
//         setAddItemDialogP(false);
//       }
//       catch (error) {
//         console.error("שגיאה בהוספת פריט:", error);
//       }
//     }
//   };

//   if (!addItemDialogP) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: addItemDialogP ? '50%' : '-100%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       zIndex: 1000,
//       transition: 'top 0.4s ease-in-out',
//       background: 'white',
//       borderRadius: '16px',
//       padding: '30px',
//       boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
//       width: '90%',
//       maxWidth: '400px',
//       fontFamily: 'sans-serif',
//     }}>
//       <button onClick={() => {
//         resetForm();
//         setAddItemDialogP(false);
//       }} style={{
//         position: 'absolute',
//         top: '10px',
//         left: '10px',
//         background: 'none',
//         border: 'none',
//         fontSize: '20px',
//         cursor: 'pointer'
//       }}>×</button>

//       <h1 style={{
//         textAlign: 'center',
//         color: '#333',
//         fontSize: '24px',
//         marginBottom: '25px',
//         fontWeight: '600',
//         background: 'linear-gradient(135deg, #667eea, #764ba2)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//         backgroundClip: 'text'
//       }}>
//         הוספת בגד חדש
//       </h1>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

//         {/* שדה שם */}
//         <div style={{ position: 'relative' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             color: '#555',
//             fontWeight: '500',
//             fontSize: '14px'
//           }}>
//             שם הבגד
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             style={{
//               width: '100%',
//               padding: '12px 16px',
//               border: '2px solid #e1e5e9',
//               borderRadius: '10px',
//               fontSize: '14px',
//               backgroundColor: '#fff',
//               transition: 'all 0.3s ease',
//               outline: 'none',
//               boxSizing: 'border-box',
//               direction: 'rtl',
//               textAlign: 'right'
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#667eea';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#e1e5e9';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}
//             placeholder="לדוגמה: חולצה כחולה"
//           />
//         </div>

//         {/* שדה עונה */}
//         <div style={{ position: 'relative' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             color: '#555',
//             fontWeight: '500',
//             fontSize: '14px'
//           }}>
//             עונה מתאימה
//           </label>
//           <div style={{
//             display: 'flex',
//             gap: '15px',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between'
//           }}>
//             {seasons.map((season) => (
//               <label key={season.value} style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '6px',
//                 cursor: 'pointer',
//                 padding: '8px 12px',
//                 borderRadius: '8px',
//                 backgroundColor: formData.season === season.value ? '#f0f4ff' : 'transparent',
//                 border: formData.season === season.value ? '2px solid #667eea' : '2px solid transparent',
//                 transition: 'all 0.2s ease',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: formData.season === season.value ? '#667eea' : '#666'
//               }}>
//                 <input
//                   type="radio"
//                   name="season"
//                   value={season.value}
//                   checked={formData.season === season.value}
//                   onChange={handleInputChange}
//                   style={{
//                     margin: 0,
//                     width: '16px',
//                     height: '16px',
//                     accentColor: '#667eea'
//                   }}
//                 />
//                 {season.label}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* שדה קטגוריה */}
//         <div style={{ position: 'relative' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             color: '#555',
//             fontWeight: '500',
//             fontSize: '14px'
//           }}>
//             סגנון הבגד
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             required
//             style={{
//               width: '100%',
//               padding: '12px 16px',
//               border: '2px solid #e1e5e9',
//               borderRadius: '10px',
//               fontSize: '14px',
//               backgroundColor: '#fff',
//               transition: 'all 0.3s ease',
//               outline: 'none',
//               boxSizing: 'border-box',
//               direction: 'rtl',
//               textAlign: 'right',
//               cursor: 'pointer'
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#667eea';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#e1e5e9';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}
//           >
//             <option value="">בחר סגנון</option>
//             {style.map((style, index) => (
//               <option key={index} value={style}>
//                 {style}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* שדה תמונה */}
//         <div style={{ position: 'relative' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             color: '#555',
//             fontWeight: '500',
//             fontSize: '14px'
//           }}>
//             תמונת הבגד
//           </label>

//           <div style={{
//             border: '2px dashed #e1e5e9',
//             borderRadius: '10px',
//             padding: '15px',
//             textAlign: 'center',
//             backgroundColor: '#fafbfc',
//             transition: 'all 0.3s ease',
//             cursor: 'pointer',
//             position: 'relative',
//             overflow: 'hidden'
//           }}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 opacity: 0,
//                 cursor: 'pointer'
//               }}
//             />

//             {imagePreview ? (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
//                 <img
//                   src={imagePreview ?? undefined}
//                   alt="תצוגה מקדימה"
//                   style={{
//                     width: '60px',
//                     height: '60px',
//                     objectFit: 'cover',
//                     borderRadius: '8px',
//                     border: '2px solid #667eea'
//                   }}
//                 />
//                 <div style={{ textAlign: 'right' }}>
//                   <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
//                     התמונה נבחרה!
//                   </p>
//                   <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
//                     לחץ לשינוי
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div style={{
//                   width: '40px',
//                   height: '40px',
//                   margin: '0 auto 10px',
//                   background: 'linear-gradient(135deg, #667eea, #764ba2)',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'white',
//                   fontSize: '18px'
//                 }}>
//                   📷
//                 </div>
//                 <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
//                   העלה תמונה
//                 </p>
//                 <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
//                   PNG, JPG עד 5MB
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* כפתור שליחה */}
//         <Button
//           type="button"
//           onClick={handleSubmit}
//           style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             border: 'none',
//             padding: '14px 24px',
//             borderRadius: '10px',
//             fontSize: '16px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             transition: 'all 0.3s ease',
//             marginTop: '5px',
//             boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
//           }}
//         >
//           הוסף לארון הבגדים 👗
//         </Button>
//       </div>

//       {/* הערה */}
//       <p style={{
//         textAlign: 'center',
//         color: '#888',
//         fontSize: '12px',
//         marginTop: '15px',
//         fontStyle: 'italic'
//       }}>
//         כל הבגדים ישמרו בארון הוירטואלי שלך
//       </p>

//     </div>
//   );





// return (
//   <div style={{
//     position: 'fixed',
//     top: addItemDialogP ? '50%' : '-100%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     zIndex: 1000,
//     transition: 'top 0.4s ease-in-out',
//     background: 'white',
//     borderRadius: '16px',
//     padding: '30px',
//     boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
//     width: '90%',
//     maxWidth: '400px',
//     fontFamily: 'sans-serif',
//   }}>
//     <button onClick={() => {
//       setImage(null),
//       resetForm(),
//       setAddItemDialogP(false);
//     }} style={{
//       position: 'absolute',
//       top: '10px',
//       left: '10px',
//       background: 'none',
//       border: 'none',
//       fontSize: '20px',
//       cursor: 'pointer'
//     }}>×</button>

//     <h1 style={{
//       textAlign: 'center',
//       color: '#333',
//       fontSize: '24px',
//       marginBottom: '25px',
//       fontWeight: '600',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     }}>
//       הוספת בגד חדש
//     </h1>

//     <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

//       {/* שדה שם */}
//       <div style={{ position: 'relative' }}>
//         <label style={{
//           display: 'block',
//           marginBottom: '8px',
//           color: '#555',
//           fontWeight: '500',
//           fontSize: '14px'
//         }}>
//           שם הבגד
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           required
//           style={{
//             width: '100%',
//             padding: '12px 16px',
//             border: '2px solid #e1e5e9',
//             borderRadius: '10px',
//             fontSize: '14px',
//             backgroundColor: '#fff',
//             transition: 'all 0.3s ease',
//             outline: 'none',
//             boxSizing: 'border-box',
//             direction: 'rtl',
//             textAlign: 'right'
//           }}
//           onFocus={(e) => {
//             e.target.style.borderColor = '#667eea';
//             e.target.style.transform = 'translateY(-2px)';
//             e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = '#e1e5e9';
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = 'none';
//           }}
//           placeholder="לדוגמה: חולצה כחולה"
//         />
//       </div>

//       {/* שדה עונה */}
//       <div style={{ position: 'relative' }}>
//         <label style={{
//           display: 'block',
//           marginBottom: '8px',
//           color: '#555',
//           fontWeight: '500',
//           fontSize: '14px'
//         }}>
//           עונה מתאימה
//         </label>
//         <div style={{
//           display: 'flex',
//           gap: '15px',
//           flexWrap: 'wrap',
//           justifyContent: 'space-between'
//         }}>
//           {seasons.map((season) => (
//             <label key={season.value} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               cursor: 'pointer',
//               padding: '8px 12px',
//               borderRadius: '8px',
//               backgroundColor: formData.season === season.value ? '#f0f4ff' : 'transparent',
//               border: formData.season === season.value ? '2px solid #667eea' : '2px solid transparent',
//               transition: 'all 0.2s ease',
//               fontSize: '14px',
//               fontWeight: '500',
//               color: formData.season === season.value ? '#667eea' : '#666'
//             }}>
//               <input
//                 type="radio"
//                 name="season"
//                 value={season.value}
//                 checked={formData.season === season.value}
//                 onChange={handleInputChange}
//                 style={{
//                   margin: 0,
//                   width: '16px',
//                   height: '16px',
//                   accentColor: '#667eea'
//                 }}
//               />
//               {season.label}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* שדה קטגוריה */}
//       <div style={{ position: 'relative' }}>
//         <label style={{
//           display: 'block',
//           marginBottom: '8px',
//           color: '#555',
//           fontWeight: '500',
//           fontSize: '14px'
//         }}>
//           סגנון הבגד
//         </label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//           required
//           style={{
//             width: '100%',
//             padding: '12px 16px',
//             border: '2px solid #e1e5e9',
//             borderRadius: '10px',
//             fontSize: '14px',
//             backgroundColor: '#fff',
//             transition: 'all 0.3s ease',
//             outline: 'none',
//             boxSizing: 'border-box',
//             direction: 'rtl',
//             textAlign: 'right',
//             cursor: 'pointer'
//           }}
//           onFocus={(e) => {
//             e.target.style.borderColor = '#667eea';
//             e.target.style.transform = 'translateY(-2px)';
//             e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = '#e1e5e9';
//             e.target.style.transform = 'translateY(0)';
//             e.target.style.boxShadow = 'none';
//           }}
//         >
//           <option value="">בחר סגנון</option>
//           {style.map((style, index) => (
//             <option key={index} value={style}>
//               {style}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* שדה תמונה */}
//       <div style={{ position: 'relative' }}>
//         <label style={{
//           display: 'block',
//           marginBottom: '8px',
//           color: '#555',
//           fontWeight: '500',
//           fontSize: '14px'
//         }}>
//           תמונת הבגד
//         </label>

//         <div style={{
//           border: '2px dashed #e1e5e9',
//           borderRadius: '10px',
//           padding: '15px',
//           textAlign: 'center',
//           backgroundColor: '#fafbfc',
//           transition: 'all 0.3s ease',
//           cursor: 'pointer',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//         // onMouseEnter={(e) => {
//         //   e.target.style.borderColor = '#667eea';
//         //   e.target.style.backgroundColor = '#f8f9ff';
//         // }}
//         // onMouseLeave={(e) => {
//         //   e.target.style.borderColor = '#e1e5e9';
//         //   e.target.style.backgroundColor = '#fafbfc';
//         // }}
//         >

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               opacity: 0,
//               cursor: 'pointer'
//             }}
//           />

//           {imagePreview ? (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
//               <img
//                 src={imagePreview ?? undefined}
//                 alt="תצוגה מקדימה"

//                 style={{
//                   width: '60px',
//                   height: '60px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   border: '2px solid #667eea'
//                 }}
//               />
//               <div style={{ textAlign: 'right' }}>
//                 <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
//                   התמונה נבחרה!
//                 </p>
//                 <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
//                   לחץ לשינוי
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div style={{
//                 width: '40px',
//                 height: '40px',
//                 margin: '0 auto 10px',
//                 background: 'linear-gradient(135deg, #667eea, #764ba2)',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '18px'
//               }}>
//                 📷
//               </div>
//               <p style={{ margin: 0, color: '#667eea', fontWeight: '500', fontSize: '14px' }}>
//                 העלה תמונה
//               </p>
//               <p style={{ margin: '3px 0 0 0', color: '#888', fontSize: '12px' }}>
//                 PNG, JPG עד 5MB
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* כפתור שליחה */}
//       <Button
//         type="button"
//         onClick={handleSubmit}
//         style={{
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           border: 'none',
//           padding: '14px 24px',
//           borderRadius: '10px',
//           fontSize: '16px',
//           fontWeight: '600',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//           marginTop: '5px',
//           boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
//         }}
//       // onMouseEnter={(e) => {
//       //   (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)';
//       //   e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
//       // }}
//       // onMouseLeave={(e) => {
//       //   e.target.style.transform = 'translateY(0)';
//       //   e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
//       // }}
//       // onMouseDown={(e) => {
//       //   e.target.style.transform = 'translateY(-1px)';
//       // }}
//       // onMouseUp={(e) => {
//       //   (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)';
//       // }}
//       >
//         הוסף לארון הבגדים 👗
//       </Button>
//     </div>

//     {/* הערה */}
//     <p style={{
//       textAlign: 'center',
//       color: '#888',
//       fontSize: '12px',
//       marginTop: '15px',
//       fontStyle: 'italic'
//     }}>
//       כל הבגדים ישמרו בארון הוירטואלי שלך
//     </p>

//   </div>
// );
// }
// export default AddItemDialog



















import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useAddItemMutation } from '../redux/api/apiSllices/itemsApiSlice';
import { useSelector } from 'react-redux';
import { Users } from '../interfaces/Users';
import { selectUser } from '../redux/slices/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import ItemSchema from '../schemas/ItemSchema';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import Item from '../interfaces/Items';

interface AddItemDialogProps {
  addItemDialogP: boolean;
  setAddItemDialogP: (value: boolean) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ addItemDialogP, setAddItemDialogP }) => {
  const [addItem] = useAddItemMutation();
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({ mode: "onChange", resolver: zodResolver(ItemSchema) });

  const user: Users = useSelector(selectUser);
  if (!user) {
    console.error("User is null – ייתכן שעדיין לא התחבר או שה־state לא נטען");
    return null;
  }
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    season: string;
    image: File | null;
  }>({
    name: '',
    category: '',
    season: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const style = ['שבת', 'אלגנט', 'ספורט אלגנט', 'יומיומי', 'ספורט'];
  const seasons = [
    { value: 'spring', label: 'אביב' },
    { value: 'between', label: 'מעבר' },
    { value: 'winter', label: 'חורף' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      season: '',
      image: null
    });
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImagePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (data.image && data.image[0]) {
      console.log("data.image[0]:", data.image[0]);

      formData.append("image", data.image[0]);
      const flaskResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData
      });
      if (!flaskResponse.ok) {
        console.error("❌ קריאה ל־Flask נכשלה", flaskResponse.status);
        alert("שרת זיהוי לא מגיב. נסי שוב מאוחר יותר.");
        return;
      }
      const result = await flaskResponse.json();
      console.log("זיהוי המודל:", result);
      formData.append("userId", user._id);
      formData.append("categoryName", result.predicted_class);
      formData.append("itemName", data.itemName);
      // formData.append("image", data.image[0]);
      formData.append("session", data.session || " ");
      formData.append("style", data.style || "");

      try {
        const response = await addItem({ _id: user._id, newItem: formData });
        resetForm();
        setAddItemDialogP(false);
        
      } catch (error) {
        console.error("שגיאה בהוספת פריט:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
        width: '90%',
        maxWidth: '400px',
        fontFamily: 'sans-serif',
      }}>

        <button onClick={() => {
          resetForm();
          setAddItemDialogP(false);
        }} style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer'
        }}>×</button>

        <h1 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '25px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          הוספת בגד חדש
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* <input
          type="text"
          name="name"
          placeholder="שם הבגד"
          value={formData.name}
          onChange={handleInputChange}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        /> */}

          <TextField
            label="שם הבגד"
            fullWidth
            {...register("itemName")}
          />

          {/* <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">בחר סגנון</option>
          {style.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
          {...register}
        </Select>

        <Select
          name="season"
          value={formData.season}
          onChange={handleInputChange}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">בחר עונה</option>
          {seasons.map((s, i) => (
            <option key={i} value={s.value}>{s.label}</option>
          ))}
           {...register}
        </Select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

      
 */}

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
          {imagePreview && (
            <Box>
              <Typography variant="subtitle1">תמונה שהועלתה:</Typography>
              <img src={imagePreview} alt="תצוגה מקדימה" style={{ width: '30%', borderRadius: '8px' }} />
            </Box>)}
          {/* כפתור שליחה */}
          <Button
            type="submit"
            // onClick={handleSubmit}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '14px 24px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
            }}
          >
            הוסף לארון הבגדים 👗
          </Button>
        </div>

        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '12px',
          marginTop: '15px',
          fontStyle: 'italic'
        }}>
          כל הבגדים ישמרו בארון הוירטואלי שלך
        </p>
      </div>
    </form>
  );
};

export default AddItemDialog;











