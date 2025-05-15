import { Button, TextField, Autocomplete } from '@mui/material'
import '../css/login.css'
import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserSchema, LoginUserSchema } from '../schemas/UserSchema'
import { LoginedUser, Users } from '../interfaces/Users';
import { useLoginMutation, useRegisterMutation } from '../redux/api/apiSllices/usersApiSlice';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { RouterProvider } from 'react-router';
import axios from 'axios';
import router from '../routes/AppRoute';
import { useDispatch } from 'react-redux';
import { selectUser, setCurrentUser } from '../redux/slices/userSlice';
import { Controller } from 'react-hook-form';
import Item from '../interfaces/Items';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

interface Data {
    user: Users | undefined,
    accessToken: string
}

const Login = () => {
    const [openRegister, setOpenRegister] = useState<Boolean>(false);
    const [openLogin, setOpenLogin] = useState<Boolean>(false)
    const [send, setSend] = useState<Boolean>(false);
    const [cities, setCities] = useState<Array<string>>([]);


    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [cookies, setCookies] = useCookies(['token'])
    const dispatch = useDispatch()


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
                setCities(response.data);
            })
            .catch((error) => {
                console.error('שגיאה בקבלת ערי ישראל:', error);
            });
    }, []);

    const onSubmitRegister = async (newUser: { userName: string; city: string; email: string; password: string; }) => {
        const userWithWardrobe: Users = { ...newUser, _id: "", myWardrobe: [{} as Item] };
        console.log("1 - User data before registration:", userWithWardrobe, typeof userWithWardrobe);

        try {
            const response = await registerUser(userWithWardrobe).unwrap();
            console.log("response.user",response.user._id);
            
            const currentUser = response.user;
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                console.log('currentUser is undefined, not saving to localStorage.');
            }
            setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
            dispatch(setCurrentUser(currentUser))
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
            const response = await loginUser(user);
            const currentUser = response.data?.user
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                console.log('User saved to localStorage:', JSON.stringify(currentUser));
            } else {
                console.log('currentUser is undefined, not saving to localStorage.');
            }
            dispatch(setCurrentUser(currentUser))
            setCookies("token", response.data?.accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
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
        <div className='container'>
            {openRegister &&
                <div className={`modal ${openRegister ? 'open' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={() => setOpenRegister(false)}>
                            ×
                        </span>
                        <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...registerRegister("userName")} />
                            {errorsRegister.userName && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="city" variant="outlined" color='secondary' {...registerRegister("city")} />
                            {errorsRegister.userName && <p style={{ color: "red" }}></p>}


                            {/* <TextField id="outlined-basic" label="City" variant="outlined" color='secondary' {...registerRegister("city")} /> */}

                            {/* <Autocomplete
                                id="outlined-basic"
                                options={cities}
                                autoSave='true'
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField {...params} label="בחר או הקלד עיר" variant="outlined" />
                                )}
                                sx={{ width: 300 }}
                                {...registerRegister("city")} 

                         
                       <Controller
                                name="city"
                                control={control}
                                defaultValue=''
                                // rules={{ required: "שדה זה הוא חובה" }}
                                render={({ field }) => (
                                    <Autocomplete
                                        id="outlined-basic"
                                        options={cities}
                                        autoSave="true"
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="בחר או הקלד עיר"
                                                variant="outlined"
                                                error={!!errorsRegister.city}
                                                helperText={errorsRegister.city?.message}
                                                {...field} // Spread the field props to the TextField
                                            />
                                        )}
                                        sx={{ width: 300 }}
                                        value={field.value || null} // Ensure value is always a value (null if undefined initially)
                                        onChange={(event, newValue) => field.onChange(newValue)}
                                    />
                                )}
                            /> */}

                            {errorsRegister.city && <p style={{ color: "red" }}>{errorsRegister.city.message}</p>}
                            {errorsRegister.city && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary' {...registerRegister("email")} />
                            {errorsRegister.email && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' {...registerRegister("password")} />
                            {errorsRegister.password && <p style={{ color: "red" }}></p>}

                            {<Button variant="contained" color={"secondary"} type='submit' >
                                Send
                            </Button>}
                        </form>

                    </div>
                </div>
            }

            {openLogin &&
                <div className={`modal ${openLogin ? 'open' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={() => setOpenLogin(false)}>
                            ×
                        </span>

                        <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...registeLogin("userName")} />
                            {errorsLogin.userName && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' {...registeLogin("password")} />
                            {errorsLogin.password && <p style={{ color: "red" }}></p>}
                            <Button variant="contained" color={"secondary"} type='submit' >
                                Send
                            </Button>

                        </form>
                    </div>
                </div>
            }
            {send && <RouterProvider router={router} />}

            <Button variant="contained" onClick={() => setOpenRegister(true)}>הרשמה</Button>
            <Button variant="contained" onClick={() => setOpenLogin(true)}>התחברות</Button>
        </div>
    )
}
export default Login