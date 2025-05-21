
import { Box, Typography, Button, TextField } from '@mui/material';
import '../css/login.css'; // ייבוא קובץ ה-CSS
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { RegisterUserSchema, LoginUserSchema } from '../schemas/UserSchema'
import { LoginedUser, Users } from '../interfaces/Users';
import { useLoginMutation, useRegisterMutation } from '../redux/api/apiSllices/usersApiSlice';
import { useCookies } from 'react-cookie';
import { RouterProvider } from 'react-router';
import axios from 'axios';
 import router from '../routes/AppRoute';
import { useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import Item from '../interfaces/Items';
import { setCurrentUser } from '../redux/slices/userSlice';


interface Data {
    user: Users | undefined,
    accessToken: string
}

const Login = () => {
    const [openRegister, setOpenRegister] = useState<Boolean>(false);
    const [openLogin, setOpenLogin] = useState<Boolean>(false)
    const [send, setSend] = useState<Boolean>(false);
    const [cities, setCities] = useState<Array<string>>([]);
    const dispatch=useDispatch();

    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [cookies, setCookies] = useCookies(['token'])
 


    const { register: registerRegister, handleSubmit: handleSubmitRegister, control, formState: { errors: errorsRegister }, reset: resetRegister } = useForm({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema)
    });

    const { register: registeLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, reset: resetLogin } = useForm({
        mode: "onBlur",
        resolver: zodResolver(LoginUserSchema)
    });

    useEffect(() => {

        axios.get('http://localhost:3000/users/excel-column') // כתובת השרת של
            .then((response) => {
                console.log(response.data);
                
                setCities(response.data);
            })
            .catch((error) => {
                console.error('שגיאה בקבלת ערי ישראל:', error);
            });
    }, []);

    const onSubmitRegister = async (newUser: { userName: string; city: string; email: string; password: string; }) => {
        const userWithWardrobe: Users = { ...newUser, _id: ""};
        console.log("1 - User data before registration:", userWithWardrobe, typeof userWithWardrobe);

        try {
            const response:{accessToken:string,user:Users} = await registerUser(userWithWardrobe).unwrap();
            console.log("response.user",response.user._id);
            const currentUser = response.user;
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                dispatch(setCurrentUser(currentUser));
            } else {
                console.log('currentUser is undefined, not saving to localStorage.');
            }
            setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
            setOpenRegister(false);
            setSend(true);
            resetRegister();
        }
    
        catch (error: any) {
            console.error("Registration error:", error);
            console.error("Registration error data:", error?.data);
            console.error("Registration error status:", error?.status);
        }
    };

    const onSubmitLogin = async (user: LoginedUser) => {
        try {
            const response:{accessToken:string,user:Users} = await loginUser(user).unwrap();
            const currentUser = response.user
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                 dispatch(setCurrentUser(currentUser));
                console.log('User saved to localStorage:', JSON.stringify(currentUser));
            } else {
                console.log('currentUser is undefined, not saving to localStorage.');
            }
            setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
        setSend(true)
        setOpenLogin(false);
        resetLogin()
    };

    return (
        <div>

            <Box className="container">
                <div className="App">

                    {isAlertOpen && (
                        <div
                            className={`modalL ${isAlertOpen ? 'open' : ''}`}

                        >
                            <div className="modal-content">
                                <span className="close" onClick={handlerCloseAlert}>
                                    ×
                                </span>

                                <div>
                                    {login ?
                                        <form>
                                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
                                            {errors.name && <p style={{ color: "red" }}></p>}

                                            <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' type='password'  {...register("password")} />
                                            {errors.email && <p style={{ color: "red" }}></p>}
                                            <Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
                                                Send
                                            </Button>
                                        </form>
                                        : <form>
                                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
                                            {errors.name && <p style={{ color: "red" }}></p>}

                                            <TextField id="outlined-basic" label="City" variant="outlined" color='secondary' {...register("city")} />
                                            {errors.name && <p style={{ color: "red" }}></p>}

                                            <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary' type='email' {...register("email")} />
                                            {errors.email && <p style={{ color: "red" }}></p>}

                                            <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' type='password' {...register("email")} />
                                            {errors.email && <p style={{ color: "red" }}></p>}
                                            
                                            <Button variant="contained" color={"secondary"} onClick={() => setValue("name", "userName")} >
                                                Send
                                            </Button>
                                        </form>}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                {!isAlertOpen &&
                    <><Button className="top-section" onClick={() => handleCreatAlert('login')}>
                        <Typography variant="h5" className="top-text">
                            התחברות
                        </Typography>
                    </Button><Button className="middle-section" onClick={() => handleCreatAlert('newAccount')}>
                            <Typography variant="subtitle1" className="middle-text">
                                הרשמה
                            </Typography>
                        </Button></>
                }
            </Box>
        </div>
    )
}

export default Login

