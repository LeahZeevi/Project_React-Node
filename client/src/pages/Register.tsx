import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { RegisterUserSchema, UserSchema } from "../schemas/UserSchema"
import axios from "axios"
import {
    Box, Typography, Button, TextField, Card, CardContent, Tabs, Tab, Select, MenuItem,
    FormControl, InputLabel, IconButton, InputAdornment, FormHelperText, Link, Fade, Grow, Alert,
    Autocomplete,
} from "@mui/material"
import { Visibility, VisibilityOff, Checkroom, } from "@mui/icons-material"
import "../css/Register.css"
import { LoginedUser, Users } from "../interfaces/Users"
import { useLoginMutation, useRegisterMutation } from "../redux/api/apiSllices/usersApiSlice"
import { setCurrentUser } from "../redux/slices/userSlice"
import ErrorPage from "./ErrorPage"
import NewAddition from "../components/NewAddition"
import LandingPage from "./LandingPage"


const Register = () => {
    const [cookies, setCookies] = useCookies(["token"]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [cities, setCities] = useState<Array<string>>([])
    const [send, setSend] = useState<boolean>(false)
    const [tabValue, setTabValue] = useState(0)
    const dispatch = useDispatch()
    const [registerUser] = useRegisterMutation();
    const [loginUser] = useLoginMutation()

    //Register form
    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        control: controlRegister,
        formState: { errors: errorsRegister },
        reset: resetRegister,
    } = useForm({
        mode: "onBlur",
        resolver: zodResolver(RegisterUserSchema),
    })

    // Login form
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLogin,
    } = useForm({
        mode: "onBlur",
        resolver: zodResolver(UserSchema),
    })

    // Fetch cities
    useEffect(() => {
        axios
            .get("http://localhost:3000/users/excel-column")
            .then((response) => {
                console.log(response.data)
                setCities(response.data)
            })
            .catch((error) => {
                setMessage("An unexpected error occurred. Please try again.");
                setIsError(true)
            })
    }, [])

    // Register submission
    const onSubmitRegister = async (newUser: { userName: string; city: string; email: string; password: string }) => {
        const userWithWardrobe: Users = { ...newUser, _id: "" }
        try {
            const response: { accessToken: string; user: Users } = await registerUser(userWithWardrobe).unwrap();
            console.log("response", response)
            const currentUser = response.user

            if (currentUser) {
                localStorage.setItem("user", JSON.stringify(currentUser))
                dispatch(setCurrentUser(currentUser))
            } else {
                console.log("currentUser is undefined, not saving to localStorage.")
            }
            setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 })
            setSend(true)
            resetRegister()
        } catch (error: any) {
            if (error.status === 400 || error.status === 409) {
                setMessage(error.data.message);
                setIsAlert(true);
            }
            else if (error?.status === 500) {
                setMessage("There is a server error. Please try again later.");
                setIsError(true);
            } else {
                setMessage("An unexpected error occurred. Please try again.");
                setIsError(true)
            }
        }

    }

    // Login submission
    const onSubmitLogin = async (user: LoginedUser) => {
        try {
            const response: { accessToken: string; user: Users } = await loginUser(user).unwrap()
            const currentUser = response.user
            localStorage.setItem("user", JSON.stringify(currentUser))
            dispatch(setCurrentUser(currentUser))
            setSend(true)
            timerSend(response.accessToken)
            resetLogin()
        } catch (error: any) {
            if (error?.status === 'FETCH_ERROR' || error?.message === 'Failed to fetch' || error?.name === 'TypeError') {
                setMessage("Unable to connect to the server. Please check your internet connection or try again later.");
                setIsError(true);
            } else if (error?.data?.message) {
                setMessage(error.data.message);
                setIsAlert(true);
            } else {
                setMessage("An unexpected error occurred. Please try again.");
                setIsAlert(true);
            }
        }

    }
    //Display of "You have successfully registered"
    const timerSend = (accessToken: string) => {
        const timer = setTimeout(() => {
            setCookies("token", accessToken, { path: "/", maxAge: 3600 * 24 * 7 })
        }, 4000);
        return () => clearTimeout(timer);
    }

    if (send) {
        return <NewAddition />
    }
    return (
        <>
            {isError ? <ErrorPage errorMessage={message} /> :
                (isBack ? <LandingPage /> :
                    (<Box className="auth-container">
                        <Box className="bg-element bg-element-1"></Box>
                        <Box className="bg-element bg-element-2"></Box>
                        <Box className="bg-element bg-element-3"></Box>
                        <Box className="grid-pattern"></Box>

                        <Box className="auth-content">
                            <Button onClick={() => setIsBack(true)} className="back-button">
                                ← חזרה
                            </Button>
                            <Box className="auth-logo-section">
                                <Box className="logo-container-small">
                                    <Box className="logo-blur"></Box>
                                    <Box className="logo-icon-small">
                                        <Checkroom sx={{ fontSize: 24, color: "white" }} />
                                    </Box>
                                </Box>
                                <Typography variant="h5" className="brand-title-small">
                                    WearTech
                                </Typography>
                            </Box>
                            <Grow in={true} timeout={800}>
                                <Card className="auth-card">
                                    <CardContent className="auth-card-content">
                                        <Box className="auth-header">
                                            <Typography variant="h4" className="auth-title">
                                                ברוכה הבאה!
                                            </Typography>
                                            <Typography variant="body1" className="auth-subtitle">
                                                הצטרפי לקהילת הנשים החכמות
                                            </Typography>
                                        </Box>

                                        <Box className="tabs-container">
                                            <Tabs
                                                value={tabValue}
                                                onChange={(_, newValue) => setTabValue(newValue)}
                                                className="custom-tabs"
                                                variant="fullWidth"
                                            >
                                                <Tab label="הרשמה" className="custom-tab" />
                                                <Tab label="התחברות" className="custom-tab" />
                                            </Tabs>
                                            {tabValue === 0 && (
                                                <Fade in={true} timeout={500}>
                                                    <Box className="tab-content">
                                                        <form onSubmit={handleSubmitRegister(onSubmitRegister as any)}>
                                                            <Box className="form-field">
                                                                <TextField fullWidth label="שם משתמש" placeholder="הכניסי שם משתמש" className="custom-textfield"
                                                                    {...registerRegister("userName")}
                                                                    error={!!errorsRegister.userName}
                                                                    helperText={typeof errorsRegister.userName?.message === "string" ? errorsRegister.userName.message : undefined}
                                                                />
                                                            </Box>
                                                            <Box className="form-field">
                                                                <TextField fullWidth label="אימייל" type="email" placeholder="example@email.com" className="custom-textfield"
                                                                    {...registerRegister("email")}
                                                                    error={!!errorsRegister.email}
                                                                    helperText={typeof errorsRegister.email?.message === "string" ? errorsRegister.email.message : undefined}
                                                                />
                                                            </Box>
                                                            <Box className="form-field">
                                                                <FormControl fullWidth className="custom-textfield">
                                                                    <Controller
                                                                        name="city"
                                                                        control={controlRegister}
                                                                        render={({ field }) => (
                                                                            <Autocomplete
                                                                                options={cities}
                                                                                freeSolo // אם תרצי לאפשר גם הקלדה חופשית ולא רק מהרשימה
                                                                                onChange={(_, value) => field.onChange(value)}
                                                                                value={field.value || ''}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        label="עיר"
                                                                                        error={!!errorsRegister.city}
                                                                                        helperText={errorsRegister.city?.message}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </Box>

                                                            <Box className="form-field">
                                                                <TextField fullWidth label="סיסמה" type={showPassword ? "text" : "password"} placeholder="בחרי סיסמה חזקה" className="custom-textfield"
                                                                    {...registerRegister("password")}
                                                                    error={!!errorsRegister.password}
                                                                    helperText={typeof errorsRegister.password?.message === "string" ? errorsRegister.password.message : undefined}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                                    className="password-toggle"
                                                                                >
                                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                />
                                                            </Box>

                                                            <Button type="submit" fullWidth className="submit-button">
                                                                צרי חשבון חדש
                                                            </Button>
                                                        </form>
                                                    </Box>
                                                </Fade>
                                            )}

                                            {/* Login Tab */}
                                            {tabValue === 1 && (
                                                <Fade in={true} timeout={500}>
                                                    <Box className="tab-content">
                                                        <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                                                            <Box className="form-field">
                                                                <TextField fullWidth label="שם משתמש" placeholder="הכניסי שם משתמש" className="custom-textfield"
                                                                    {...registerLogin("userName")}
                                                                    error={!!errorsLogin.userName}
                                                                    helperText={errorsLogin.userName?.message}
                                                                />
                                                            </Box>

                                                            <Box className="form-field">
                                                                <TextField fullWidth label="סיסמה" type={showPassword ? "text" : "password"} placeholder="הכניסי את הסיסמה שלך" className="custom-textfield"
                                                                    {...registerLogin("password")}
                                                                    error={!!errorsLogin.password}
                                                                    helperText={errorsLogin.password?.message}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                                    className="password-toggle"
                                                                                >
                                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                />
                                                            </Box>

                                                            {/* <Box className="forgot-password">
                                                                <Link href="#" className="forgot-link">
                                                                    שכחת סיסמה?
                                                                </Link>
                                                            </Box> */}

                                                            <Button type="submit" fullWidth className="submit-button">
                                                                התחברי
                                                            </Button>
                                                        </form>
                                                    </Box>
                                                </Fade>
                                            )}
                                        </Box>

                                        <Box className="terms-section">
                                            <Typography variant="body2" className="terms-text">
                                                בהרשמה את מסכימה ל
                                                <Link href="#" className="terms-link">
                                                    תנאי השימוש
                                                </Link>
                                                ול
                                                <Link href="#" className="terms-link">
                                                    מדיניות הפרטיות
                                                </Link>
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Box>
                    </Box>))}
            {isAlert && (<Box sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 9999, }}>
                <Alert severity="error">{message}</Alert>
            </Box>
            )}
        </>
    )
}
export default Register