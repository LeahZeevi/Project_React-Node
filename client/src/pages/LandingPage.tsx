import { ArrowForward, AutoAwesome, Bolt, Checkroom, Palette } from "@mui/icons-material"
import { Box, Typography, Button, Card, CardContent, Fade, Grow } from "@mui/material"
import { useState } from "react"
import Register from "./Register";

const LandingPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <>
            {isRegister ? <Register /> :
                (<Box className="landing-container">
                
                    <Box className="bg-element bg-element-1"></Box>
                    <Box className="bg-element bg-element-2"></Box>
                    <Box className="bg-element bg-element-3"></Box>

                    <Box className="grid-pattern"></Box>

                    <Box className="floating-dot floating-dot-1"></Box>
                    <Box className="floating-dot floating-dot-2"></Box>
                    <Box className="floating-dot floating-dot-3"></Box>

                    <Box className="landing-content">
                        <Grow in={true} timeout={1000}>
                            <Box className="content-wrapper">

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

                             
                                <Typography variant="h1" className="main-title">
                                    ארון הבגדים
                                    <br />
                                    <span className="gradient-text">החכם שלך</span>
                                </Typography>

                              
                                <Typography variant="h5" className="subtitle">
                                    נהלי את ארון הבגדים שלך בצורה חכמה עם בינה מלאכותית מתקדמת.
                                    <br />
                                    קבלי המלצות אישיות, תכנני לוקים מושלמים וחסכי זמן יקר.
                                </Typography>

                          
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

                             
                                <Grow in={true} timeout={1800}>
                                    <Button
                                        onClick={() => setIsRegister(true)}
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
                </Box>)}
        </>
    )
}

export default LandingPage