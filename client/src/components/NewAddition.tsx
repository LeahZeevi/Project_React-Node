import { AutoAwesome } from "@mui/icons-material";
import { Box, Typography, Fade } from "@mui/material"
const NewAddition = () => {
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
export default NewAddition;