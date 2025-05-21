
// import { Box, Typography, Button, TextField } from '@mui/material';
// import '../css/login.css'; // ייבוא קובץ ה-CSS
// import { useState } from "react";
// import { useForm } from 'react-hook-form';

// const Login = () => {

//     const [isAlertOpen, setIsAlertOpen] = useState(false);
//     const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onChange" });
//     const [login, setIsLogin] = useState(false);
//     const [newAccount, setNewAccount] = useState(false);

//     const handleCreatAlert = (action: string) => {
//         action === 'login' ? setIsLogin(true) : setNewAccount(true)
//         setIsAlertOpen(true)
//         console.log(isAlertOpen);

//     }
//     const handlerCloseAlert = () => {
//         setIsAlertOpen(false);
//         setIsLogin(false);
//         setNewAccount(false);
//     }
//     const handleRegister = () => {

//     }
//     const handlogin = () => {

//     }

//     return (
//         <div>

//             <Box className="container">
//                 <div className="App">

//                     {isAlertOpen && (
//                         <div
//                             className={`modalL ${isAlertOpen ? 'open' : ''}`}

//                         >
//                             <div className="modal-content">
//                                 <span className="close" onClick={handlerCloseAlert}>
//                                     ×
//                                 </span>

//                                 <div>
//                                     {login ?
//                                         <form>
//                                             <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
//                                             {errors.name && <p style={{ color: "red" }}></p>}

//                                             <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' type='password'  {...register("password")} />
//                                             {errors.email && <p style={{ color: "red" }}></p>}
//                                             <Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
//                                                 Send
//                                             </Button>
//                                         </form>
//                                         : <form>
//                                             <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
//                                             {errors.name && <p style={{ color: "red" }}></p>}

//                                             <TextField id="outlined-basic" label="City" variant="outlined" color='secondary' {...register("city")} />
//                                             {errors.name && <p style={{ color: "red" }}></p>}

//                                             <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary' type='email' {...register("email")} />
//                                             {errors.email && <p style={{ color: "red" }}></p>}

//                                             <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' type='password' {...register("email")} />
//                                             {errors.email && <p style={{ color: "red" }}></p>}
                                            
//                                             <Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
//                                                 Send
//                                             </Button>
//                                         </form>}
//                                 </div>
//                             </div>

//                         </div>
//                     )}
//                 </div>
//                 {!isAlertOpen &&
//                     <><Button className="top-section" onClick={() => handleCreatAlert('login')}>
//                         <Typography variant="h5" className="top-text">
//                             התחברות
//                         </Typography>
//                     </Button><Button className="middle-section" onClick={() => handleCreatAlert('newAccount')}>
//                             <Typography variant="subtitle1" className="middle-text">
//                                 הרשמה
//                             </Typography>
//                         </Button></>
//                 }
//             </Box>
//         </div>
//     )
// }

// export default Login

