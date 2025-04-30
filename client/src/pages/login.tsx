import { Button, TextField } from '@mui/material'
import '../css/login.css'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
 import UserSchema from '../schemas/UserSchema'
import {Users, PartialUser } from '../interfaces/Users';
import { useLoginMutation, useRegisterMutation } from '../redux/api/apiSllices/usersApiSlice';
import { useCookies } from 'react-cookie';
  
const Login = () => {
    const [openRegister, setOpenRegister] = useState<Boolean>(false);
    const [openLogin, setOpenLogin] = useState<Boolean>(false)
    const { register, handleSubmit, setValue, formState: { errors },reset } = useForm({ mode: "onBlur" ,resolver: zodResolver(UserSchema)});
    const [registerUser]=useRegisterMutation();
    const [loginUser]=useLoginMutation();
    const [cookies,setCookies]=useCookies(['token'])
    const token=cookies.token;

    const addNewUser = async (user:Users) => {
        try {
          const response = await registerUser(user);
          console.log(response);
          setCookies("token", token, { path: "/", maxAge: 3600*24*7});
        } catch (error) {
            console.log(error);
        }
      };

      const login = async (data: PartialUser): Promise<void> => {
        try {
          const response = await loginUser(data); // שלח את שני הערכים
          console.log(response);
          const token= response.data?.aaccessToken; // נניח שזה מה שהשרת מחזיר
          setCookies("token", token, { path: "/", maxAge: 3600 * 24 * 7 });
        } catch (error) {
          console.log(error);
        }
      };


    const onSubmitRegister = async(newUser:any) => {
     addNewUser(newUser)     
       setOpenRegister(false);
       reset()
    };
    //לבדוק טיפוס DATA
    const onSubmitLogin = (data:PartialUser) => {
        // console.log(data);
        // login(data)
        console.log("Ddddddddddddddddddd");
        
        setOpenLogin(false);
       reset()
    };
    return (
        <div className='container'>
            {openRegister &&
                <div className={`modal ${openRegister ? 'open' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={() => setOpenRegister(false)}>
                            ×
                        </span>
                        <form onSubmit={handleSubmit(onSubmitRegister)}>
                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
                            {errors.userName && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="City" variant="outlined" color='secondary' {...register("city")} />
                            {errors.city && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="Email" variant="outlined" color='secondary' {...register("email")} />
                            {errors.email && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="Password" variant="outlined" color='secondary' {...register("password")} />
                            {errors.password && <p style={{ color: "red" }}></p>}

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
                        <form onSubmit={handleSubmit(onSubmitLogin)}>
                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("userName")} />
                            {errors.userName && <p style={{ color: "red" }}></p>}

                            <TextField id="outlined-basic" label="User Name" variant="outlined" color='secondary' {...register("password")} />
                            {errors.password && <p style={{ color: "red" }}></p>}
                            {<Button variant="contained" color={"secondary"} type='submit' >
                                Send
                            </Button>}
                        </form>
                    </div>
                </div>
            }

            <Button variant="contained" onClick={() => setOpenRegister(true)}>הרשמה</Button>
            <Button variant="contained" onClick={() => setOpenLogin(true)}>התחברות</Button>
        </div>


    )
}
export default Login