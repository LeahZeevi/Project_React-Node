import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import "../css/Graphs.css"

// נתונים לגרף עוגה - פילוח ארון בגדים לפי קטגוריות
const pieChartData = [
  { name: "חולצות", value: 35, color: " rgb(187, 2, 156)"},
  { name: "חצאיות", value: 25, color: " rgb(117, 7, 99)" },
  { name: "שמלות", value: 15, color: " rgb(100, 5, 159)" },
  { name: "מכנסים", value: 20, color: " rgb(90, 13, 191)" },
  { name: "נעלים", value: 5, color: " rgb(51, 2, 187)" },
]

// נתונים לגרף עמודות - כמות פריטים לפי צבע
const barChartData = [
  { name: "שחור", items: 42 },
  { name: "לבן", items: 28 },
  { name: "כחול", items: 23 },
  { name: "אדום", items: 15 },
  { name: "ורוד", items: 12 },
  { name: "ירוק", items: 10 },
  { name: "צהוב", items: 8 },
]

// נתונים לגרף קווי - שימוש בפריטים לאורך זמן
const lineChartData = [
  { month: "ינואר", חולצות: 10, מכנסיים: 5, שמלות: 2 },
  { month: "פברואר", חולצות: 12, מכנסיים: 6, שמלות: 4 },
  { month: "מרץ", חולצות: 15, מכנסיים: 8, שמלות: 6 },
  { month: "אפריל", חולצות: 20, מכנסיים: 10, שמלות: 8 },
  { month: "מאי", חולצות: 18, מכנסיים: 12, שמלות: 10 },
  { month: "יוני", חולצות: 22, מכנסיים: 15, שמלות: 12 },
]

// נתונים לגרף שטח - הוצאות על בגדים לאורך זמן
const areaChartData = [
  { month: "ינואר", הוצאות: 500 },
  { month: "פברואר", הוצאות: 700 },
  { month: "מרץ", הוצאות: 400 },
  { month: "אפריל", הוצאות: 1200 },
  { month: "מאי", הוצאות: 800 },
  { month: "יוני", הוצאות: 600 },
]

// רכיב גרף עוגה מותאם אישית
const CustomPieChart: React.FC = () => {
  return (
    <Card className="chart-card">
      <CardHeader title="פילוח ארון הבגדים" subheader="התפלגות פריטים לפי קטגוריה" className="chart-header" />
      <CardContent>
        <Box className="chart-container" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${value} פריטים`} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

// רכיב גרף עמודות מותאם אישית
const CustomBarChart: React.FC = () => {
  const [chartType, setChartType] = useState<"vertical" | "horizontal">("vertical")

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as "vertical" | "horizontal")
  }

  return (
    <Card className="chart-card">
      <CardHeader
        title="פריטים לפי צבע"
        subheader="כמות הפריטים בארון לפי צבע"
        className="chart-header"
        action={
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>סוג תצוגה</InputLabel>
            <Select value={chartType} onChange={handleChange} label="סוג תצוגה">
              <MenuItem value="vertical">עמודות אנכיות</MenuItem>
              <MenuItem value="horizontal">עמודות אופקיות</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Box className="chart-container" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "vertical" ? (
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => `${value} פריטים`} />
                <Legend />
                <Bar dataKey="items" name="כמות פריטים" fill="#8884d8" />
              </BarChart>
            ) : (
              <BarChart
                layout="vertical"
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value: any) => `${value} פריטים`} />
                <Legend />
                <Bar dataKey="items" name="כמות פריטים" fill="#82ca9d" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

// רכיב גרף קווי מותאם אישית
const CustomLineChart: React.FC = () => {
  const [chartType, setChartType] = useState<"line" | "area">("line")

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as "line" | "area")
  }

  return (
    <Card className="chart-card">
      <CardHeader
        title={chartType === "line" ? "שימוש בפריטים לאורך זמן" : "הוצאות על בגדים"}
        subheader={chartType === "line" ? "כמה פעמים השתמשת בכל קטגוריה" : "הוצאות חודשיות על בגדים"}
        className="chart-header"
        action={
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>סוג גרף</InputLabel>
            <Select value={chartType} onChange={handleChange} label="סוג גרף">
              <MenuItem value="line">גרף קווי</MenuItem>
              <MenuItem value="area">גרף שטח</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent>
        <Box className="chart-container" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="חולצות" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="מכנסיים" stroke="#82ca9d" />
                <Line type="monotone" dataKey="שמלות" stroke="#ffc658" />
              </LineChart>
            ) : (
              <AreaChart
                data={areaChartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `₪${value}`} />
                <Area type="monotone" dataKey="הוצאות" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

// רכיב ראשי שמציג את כל הגרפים
const Graphs: React.FC = () => {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box className="charts-container">
      <Paper className="charts-header">
        <Typography variant="h4" component="h1" className="charts-title">
          ניתוח ארון הבגדים שלך
        </Typography>
        <Typography variant="subtitle1" className="charts-subtitle">
          נתונים וסטטיסטיקות על ארון הבגדים שלך
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className="chart-tabs"
        >
          <Tab label="כל הגרפים" />
          <Tab label="פילוח קטגוריות" />
          <Tab label="פריטים לפי צבע" />
          <Tab label="שימוש לאורך זמן" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3} className="charts-grid">
          <Grid item xs={12} md={4}>
            <CustomPieChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomBarChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomLineChart />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box className="single-chart-container">
          <CustomPieChart />
        </Box>
      )}

      {tabValue === 2 && (
        <Box className="single-chart-container">
          <CustomBarChart />
        </Box>
      )}

      {tabValue === 3 && (
        <Box className="single-chart-container">
          <CustomLineChart />
        </Box>
      )}
    </Box>
  )
}

export default Graphs
