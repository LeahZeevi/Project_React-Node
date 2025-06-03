import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { UserSchema } from "../schemas/UserSchema"
import axios from "axios"
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  FormHelperText,
  Link,
  Fade,
  Grow,
} from "@mui/material"
import { Visibility, VisibilityOff, ArrowForward, Checkroom, AutoAwesome, Bolt, Palette } from "@mui/icons-material"
import "../css/Register2.css"

// Interfaces (you'll need to import these from your actual files)
interface Users {
  _id: string
  userName: string
  city: string
  email: string
  password: string
}

interface LoginedUser {
  userName: string
  password: string
}

// Mock schemas - replace with your actual schemas
import { z } from "zod"

const RegisterUserSchema = z.object({
  userName: z.string().min(2, "שם משתמש חייב להכיל לפחות 2 תווים"),
  city: z.string().min(1, "יש לבחור עיר"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
})



// Mock hooks - replace with your actual Redux hooks
const useRegisterMutation = () => [
  async (user: Users) => ({ unwrap: () => Promise.resolve({ accessToken: "mock-token", user }) }),
]

const useLoginMutation = () => [
  async (user: LoginedUser) => ({
    unwrap: () =>
      Promise.resolve({
        accessToken: "mock-token",
        user: { ...user, _id: "123", city: "תל אביב", email: "test@test.com" },
      }),
  }),
]

const setCurrentUser = (user: Users) => ({ type: "SET_CURRENT_USER", payload: user })

export default function Component() {
  const [showAuth, setShowAuth] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [cities, setCities] = useState<Array<string>>([])
  const [send, setSend] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState(0)

  const dispatch = useDispatch()
  const [registerUser] = useRegisterMutation()
  const [loginUser] = useLoginMutation()
  const [cookies, setCookies] = useCookies(["token"])

  // Register form
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
        console.error("שגיאה בקבלת ערי ישראל:", error)
      })
  }, [])

  // Register submission
  const onSubmitRegister = async (newUser: { userName: string; city: string; email: string; password: string }) => {
    const userWithWardrobe: Users = { ...newUser, _id: "" }
    console.log("1 - User data before registration:", userWithWardrobe, typeof userWithWardrobe)

    try {
      const response: { accessToken: string; user: Users } = await (await registerUser(userWithWardrobe)).unwrap()
      console.log("response.user", response.user._id)
      const currentUser = response.user

      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser))
      } else {
        console.log("currentUser is undefined, not saving to localStorage.")
      }

      setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 })
      setSend(true)
      resetRegister()
    } catch (error: any) {
      console.error("Registration error:", error)
      console.error("Registration error data:", error?.data)
      console.error("Registration error status:", error?.status)
    }
  }

  // Login submission
  const onSubmitLogin = async (user: LoginedUser) => {
    try {
      const response: { accessToken: string; user: Users } = await (await loginUser(user)).unwrap()
      const currentUser = response.user

      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser))
        console.log("User saved to localStorage:", JSON.stringify(currentUser))
        dispatch(setCurrentUser(currentUser))
      } else {
        console.log("currentUser is undefined, not saving to localStorage.")
      }

      setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 })
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    setSend(true)
    resetLogin()
  }

  // If user is logged in, show success
  if (send) {
    return (
      <Box className="success-container">
        <Fade in={true} timeout={1000}>
          <Box className="success-content">
            <Box className="success-icon">
              <AutoAwesome sx={{ fontSize: 48, color: "white" }} />
            </Box>
            <Typography variant="h3" className="success-title">
              ברוכה הבאה!
            </Typography>
            <Typography variant="h6" className="success-subtitle">
              ההרשמה הושלמה בהצלחה
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }

  if (!showAuth) {
    return (
      <Box className="landing-container">
        {/* Animated background elements */}
        <Box className="bg-element bg-element-1"></Box>
        <Box className="bg-element bg-element-2"></Box>
        <Box className="bg-element bg-element-3"></Box>

        {/* Grid pattern overlay */}
        <Box className="grid-pattern"></Box>

        {/* Floating elements */}
        <Box className="floating-dot floating-dot-1"></Box>
        <Box className="floating-dot floating-dot-2"></Box>
        <Box className="floating-dot floating-dot-3"></Box>

        <Box className="landing-content">
          <Grow in={true} timeout={1000}>
            <Box className="content-wrapper">
              {/* Logo and brand */}
              <Box className="logo-section">
                <Box className="logo-container">
                  <Box className="logo-blur"></Box>
                  <Box className="logo-icon">
                    <Checkroom sx={{ fontSize: 32, color: "white" }} />
                  </Box>
                </Box>
                <Typography variant="h4" className="brand-title">
                  WardrobeAI
                </Typography>
              </Box>

              {/* Main heading */}
              <Typography variant="h1" className="main-title">
                ארון הבגדים
                <br />
                <span className="gradient-text">החכם שלך</span>
              </Typography>

              {/* Subtitle */}
              <Typography variant="h5" className="subtitle">
                נהלי את ארון הבגדים שלך בצורה חכמה עם בינה מלאכותית מתקדמת.
                <br />
                קבלי המלצות אישיות, תכנני לוקים מושלמים וחסכי זמן יקר.
              </Typography>

              {/* Features */}
              <Box className="features-grid">
                <Fade in={true} timeout={1200}>
                  <Card className="feature-card">
                    <CardContent className="feature-content">
                      <Box className="feature-icon feature-icon-purple">
                        <AutoAwesome sx={{ fontSize: 24, color: "white" }} />
                      </Box>
                      <Typography variant="h6" className="feature-title">
                        בינה מלאכותית
                      </Typography>
                      <Typography variant="body2" className="feature-description">
                        המלצות אישיות מבוססות על הסגנון והמזג שלך
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>

                <Fade in={true} timeout={1400}>
                  <Card className="feature-card">
                    <CardContent className="feature-content">
                      <Box className="feature-icon feature-icon-blue">
                        <Bolt sx={{ fontSize: 24, color: "white" }} />
                      </Box>
                      <Typography variant="h6" className="feature-title">
                        ניהול חכם
                      </Typography>
                      <Typography variant="body2" className="feature-description">
                        ארגון אוטומטי של הבגדים לפי צבע, עונה וסגנון
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>

                <Fade in={true} timeout={1600}>
                  <Card className="feature-card">
                    <CardContent className="feature-content">
                      <Box className="feature-icon feature-icon-pink">
                        <Palette sx={{ fontSize: 24, color: "white" }} />
                      </Box>
                      <Typography variant="h6" className="feature-title">
                        לוקים מושלמים
                      </Typography>
                      <Typography variant="body2" className="feature-description">
                        יצירת קומבינציות מנצחות לכל אירוע ומזג אוויר
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Box>

              {/* CTA Button */}
              <Grow in={true} timeout={1800}>
                <Button
                  onClick={() => setShowAuth(true)}
                  className="cta-button"
                  size="large"
                  endIcon={<ArrowForward />}
                >
                  בואו נתחיל
                </Button>
              </Grow>

              <Typography variant="body2" className="bottom-text">
                הצטרפי לאלפי נשים שכבר משתמשות בפלטפורמה החכמה ביותר לניהול ארון בגדים
              </Typography>
            </Box>
          </Grow>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="auth-container">
      {/* Same animated background */}
      <Box className="bg-element bg-element-1"></Box>
      <Box className="bg-element bg-element-2"></Box>
      <Box className="bg-element bg-element-3"></Box>
      <Box className="grid-pattern"></Box>

      <Box className="auth-content">
        {/* Back button */}
        <Button onClick={() => setShowAuth(false)} className="back-button">
          ← חזרה
        </Button>

        {/* Logo */}
        <Box className="auth-logo-section">
          <Box className="logo-container-small">
            <Box className="logo-blur"></Box>
            <Box className="logo-icon-small">
              <Checkroom sx={{ fontSize: 24, color: "white" }} />
            </Box>
          </Box>
          <Typography variant="h5" className="brand-title-small">
            WardrobeAI
          </Typography>
        </Box>

        {/* Auth Card */}
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

                {/* Register Tab */}
                {tabValue === 0 && (
                  <Fade in={true} timeout={500}>
                    <Box className="tab-content">
                      <form onSubmit={handleSubmitRegister(onSubmitRegister as any)}>
                        <Box className="form-field">
                          <TextField
                            fullWidth
                            label="שם משתמש"
                            placeholder="הכניסי שם משתמש"
                            className="custom-textfield"
                            {...registerRegister("userName")}
                            error={!!errorsRegister.userName}
                            helperText={typeof errorsRegister.userName?.message === "string" ? errorsRegister.userName.message : undefined}
                          />
                        </Box>

                        <Box className="form-field">
                          <TextField
                            fullWidth
                            label="אימייל"
                            type="email"
                            placeholder="example@email.com"
                            className="custom-textfield"
                            {...registerRegister("email")}
                            error={!!errorsRegister.email}
                            helperText={typeof errorsRegister.email?.message === "string" ? errorsRegister.email.message : undefined}
                          />
                        </Box>

                        <Box className="form-field">
                          <FormControl fullWidth className="custom-textfield">
                            <InputLabel>עיר</InputLabel>
                            <Controller
                              name="city"
                              control={controlRegister}
                              render={({ field }) => (
                                <Select {...field} label="עיר">
                                  {cities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                      {city}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                             {errorsRegister.city && (
                              <FormHelperText error>{errorsRegister.root?.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Box>

                        <Box className="form-field">
                          <TextField
                            fullWidth
                            label="סיסמה"
                            type={showPassword ? "text" : "password"}
                            placeholder="בחרי סיסמה חזקה"
                            className="custom-textfield"
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
                          <TextField
                            fullWidth
                            label="שם משתמש"
                            placeholder="הכניסי שם משתמש"
                            className="custom-textfield"
                            {...registerLogin("userName")}
                            error={!!errorsLogin.userName}
                            helperText={errorsLogin.userName?.message}
                          />
                        </Box>

                        <Box className="form-field">
                          <TextField
                            fullWidth
                            label="סיסמה"
                            type={showPassword ? "text" : "password"}
                            placeholder="הכניסי את הסיסמה שלך"
                            className="custom-textfield"
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

                        <Box className="forgot-password">
                          <Link href="#" className="forgot-link">
                            שכחת סיסמה?
                          </Link>
                        </Box>

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
    </Box>
  )
}
