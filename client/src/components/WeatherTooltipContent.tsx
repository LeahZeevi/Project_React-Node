import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { Typography, Box, Chip } from "@mui/material"

interface Props {
  city: String
}
const apiKey = '47fa8cac82de9fb95d74187722119d68';  


const WeatherTooltipContent = ({ city }: Props) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setWeather(data.current_condition[0])
      } catch (err) {
        console.error("שגיאה בקבלת מזג אוויר", err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  if (loading) {
    return (
      <Box sx={{ p: 1, textAlign: "center" }}>
        <CircularProgress size={20} />
        <Typography variant="caption">טוען...</Typography>
      </Box>
    )
  }

  if (!weather) {
    return <Typography variant="body2">שגיאה בטעינת מזג האוויר</Typography>
  }

  return (
    <Box sx={{ textAlign: "center", p: 1, minWidth: 150 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {city}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {weather.weatherDesc[0].value}
      </Typography>
      <Chip
        label={`${weather.temp_C}°C`}
        size="small"
        sx={{ my: 1, backgroundColor: "#1976d2", color: "white" }}
      />
      <Typography variant="caption" color="textSecondary">
        מרגיש כמו {weather.FeelsLikeC}°
      </Typography>
    </Box>
  )
}

export default WeatherTooltipContent
