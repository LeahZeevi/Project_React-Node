
import { Box, Typography, Button, TextField } from '@mui/material';
import '../css/login.css'; // ייבוא קובץ ה-CSS
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { RegisterUserSchema, UserSchema } from '../schemas/UserSchema'
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
import { zodResolver } from '@hookform/resolvers/zod';

interface Data {
    user: Users | undefined,
    accessToken: string
}

const Register = () => {
    const [openRegister, setOpenRegister] = useState<Boolean>(false);
    const [open, setOpenLogin] = useState<Boolean>(false)
    const [send, setSend] = useState<Boolean>(false);
    const [cities, setCities] = useState<Array<string>>([]);
    const dispatch = useDispatch();
    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [cookies, setCookies] = useCookies(['token'])



    const { register: registerRegister, handleSubmit: handleSubmitRegister, control, formState: { errors: errorsRegister }, reset: resetRegister } = useForm({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema)
    });

    const { register: registeLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, reset: resetLogin } = useForm({
        mode: "onBlur",
        resolver: zodResolver(UserSchema)
    });

    useEffect(() => {

        axios.get('http://localhost:3001/users/excel-column') // כתובת השרת של
            .then((response) => {
                console.log(response.data);

                setCities(response.data);
            })
            .catch((error) => {
                console.error('שגיאה בקבלת ערי ישראל:', error);
            });
    }, []);

    const onSubmitRegister = async (newUser: { userName: string; city: string; email: string; password: string; }) => {
        const userWithWardrobe: Users = { ...newUser, _id: "" };
        console.log("1 - User data before registration:", userWithWardrobe, typeof userWithWardrobe);

        try {
            const response: { accessToken: string, user: Users } = await registerUser(userWithWardrobe).unwrap();
            console.log("response.user", response.user._id);
            const currentUser = response.user;
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
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
            const response: { accessToken: string, user: Users } = await loginUser(user).unwrap();
            const currentUser = response.user
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
                console.log('User saved to localStorage:', JSON.stringify(currentUser));
                dispatch(setCurrentUser(currentUser));

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
            {open &&
                <div className={`modal ${open ? 'open' : ''}`}>
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



export default Register