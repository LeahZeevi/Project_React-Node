import { Button, TextField } from '@mui/material'
import '../css/login.css'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserSchema, LoginUserSchema } from '../schemas/UserSchema'
import { LoginedUser, Users } from '../interfaces/Users';
import { useLoginMutation, useRegisterMutation } from '../redux/api/apiSllices/usersApiSlice';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { RouterProvider } from 'react-router';
import router from '../routes/AppRoute';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';




const Login = () => {
    const [openRegister, setOpenRegister] = useState<Boolean>(false);
    const [openLogin, setOpenLogin] = useState<Boolean>(false)
    const [send, setSend] = useState<Boolean>(false);


    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation();
    const [cookies, setCookies] = useCookies(['token'])
     const dispatch=useDispatch()
  

    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister }, reset: resetRegister } = useForm({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema)
    });

    const { register: registeLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin }, reset: resetLogin } = useForm({
        mode: "onBlur",
        resolver: zodResolver(LoginUserSchema)
    });





    const onSubmitRegister = async (newUser: any) => {
        try {
            console.log(typeof newUser);
            
            const response = await registerUser(newUser)
            const currentUser:Users = jwtDecode<Users>(JSON.stringify(response))
            setCookies("token", response, { path: "/", maxAge: 3600 * 24 * 7 });
           
            
        }
        catch (error) {
            console.log(error);
        }
        setOpenRegister(false);
        setSend(true)
        resetRegister()
    };

    const onSubmitLogin = async (user: LoginedUser) => {
        try {
            console.log(typeof user);
            
            const response = await loginUser(user); 
            const currentUser:Users= jwtDecode<Users>(JSON.stringify(response));
            dispatch(setCurrentUser(currentUser))
            setCookies("token", response, { path: "/", maxAge: 3600 * 24 * 7 });
        }
        catch (error) {
            console.log(error);
        }
        setSend(true)
        setOpenLogin(false);
        resetLogin()
    };
      console.log(typeof cookies.token.data.accessToken);
      
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

                            <TextField id="outlined-basic" label="City" variant="outlined" color='secondary' {...registerRegister("city")} />
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