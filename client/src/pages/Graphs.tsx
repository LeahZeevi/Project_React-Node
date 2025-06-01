import type React from "react"
import { useEffect, useState } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { selectAllItems, setAllItems } from "../redux/slices/itemSlice"
import Item from "../interfaces/Items"
import { useGetAllItemsMutation } from "../redux/api/apiSllices/itemsApiSlice"
import { Users } from "../interfaces/Users"
import { selectUser } from "../redux/slices/userSlice"

// // נתונים לגרף שטח - הוצאות על בגדים לאורך זמן
const areaChartData = [
  { month: "ינואר", הוצאות: 500 },
  { month: "פברואר", הוצאות: 700 },
  { month: "מרץ", הוצאות: 400 },
  { month: "אפריל", הוצאות: 1200 },
  { month: "מאי", הוצאות: 800 },
  { month: "יוני", הוצאות: 600 },
]

// רכיב גרף עוגה מותאם אישית
interface CustomPieChartProps {
  myWardrobe: Item[];
}
const CustomPieChart: React.FC<CustomPieChartProps> = ({ myWardrobe }) => {
  const [tabValue, setTabValue] = useState(0)

  const seasonCountMap: Record<string, number> = {}

  myWardrobe.forEach((item) => {
    const session = item.session
    if (session) {
      seasonCountMap[session] = (seasonCountMap[session] || 0) + 1
    }
  })
  const seasonColors: Record<string, string> = {
    קיץ: "rgb(187, 2, 156)",
    כללי: "rgb(100, 5, 159)",
    חורף: "rgb(90, 13, 191)",
  }

  const pieChartData = Object.entries(seasonCountMap).map(([season, count]) => ({
    name: season,
    value: count,
    color: seasonColors[season] || "#ccc",
  }))
  return (
    <Card className="chart-card">
      <CardHeader title="פילוח ארון הבגדים" subheader="התפלגות פריטים לפי עונה" className="chart-header" />
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
                fill="  rgb(187,92, 156)"
                dataKey="value"
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
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
interface CustomBarChartProps {
  myWardrobe: Item[];
}
// רכיב גרף עמודות מותאם אישית
const CustomBarChart: React.FC<CustomBarChartProps> = ({ myWardrobe }) => {
  const [chartType, setChartType] = useState<"vertical" | "horizontal">("vertical")

  const categoryMap: Record<string, number> = {};
  myWardrobe.forEach((item) => {
    const category = item.categoryName || "ללא קטגוריה";
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  });

  const barChartData = Object.entries(categoryMap).map(([name, items]) => ({ name, items }));
  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as "vertical" | "horizontal")
  }

  return (
    <Card className="chart-card">
      <CardHeader
        title="פריטים לפי קטגוריה"
        subheader="כמות פריטים בארון לפי קטגוריה"
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
                <Bar dataKey="items" name="כמות פריטים" fill="rgb(90, 109, 213)" />
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
                <Bar dataKey="items" name="כמות פריטים" fill="rgb(234, 7, 223)" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

// רכיב גרף קווי מותאם אישית
interface CustomLineChartProps {
  myWardrobe: Item[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ myWardrobe }) => {
  const [chartType, setChartType] = useState<"line" | "area">("line");

  // const styleWearMap: Record<string, number> = {};

  // myWardrobe.forEach((item) => {
  //   const style = item.style || "ללא סגנון";
  //   const countWear = Number(item.countWear) || 0;

  //   styleWearMap[style] = (styleWearMap[style] || 0) + countWear;
  // });

  // const lineChartData = Object.entries(styleWearMap).map(([style, count]) => ({
  //   style,
  //   לבישות: count,
  // }));


  // const styleKeys = [...new Set(myWardrobe.map((item) => item.style).filter(Boolean))];

  // const wearRanges = [
  //   { label: "0", from: 0, to: 0 },
  //   { label: "1-5", from: 1, to: 5 },
  //   { label: "6-10", from: 6, to: 10 },
  //   { label: "11+", from: 11, to: Infinity },
  // ];

  // const groupedByRange: Record<string, Record<string, number>> = {};

  // wearRanges.forEach(({ label }) => {
  //   groupedByRange[label] = {};
  // });

  // myWardrobe.forEach((item) => {
  //   const style = item.style || "ללא סגנון";
  //   const count = Number(item.countWear) || 0;
  //   const range = wearRanges.find(r => count >= r.from && count <= r.to);

  //   if (range) {
  //     groupedByRange[range.label][style] = (groupedByRange[range.label][style] || 0) + 1;
  //   }
  // });

  // const lineChartData = Object.entries(groupedByRange).map(([rangeLabel, styleCounts]) => ({
  //   range: rangeLabel,
  //   ...styleCounts,
  // }));
  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as "line" | "area")
  }
  const sumByCategory = (items: Item[]) => {
    const map = new Map<string, number>();

    items.forEach(item => {
      const prev = map.get(item.categoryName) || 0;
      map.set(item.categoryName, prev + Number(item.countWear));
    });

    // הפוך למערך שמתאים ל־Recharts
    return Array.from(map.entries()).map(([category, count]) => ({
      category,
      countWear: count,
    }));
  };
  const itemsByCategory = sumByCategory(myWardrobe);

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
                data={itemsByCategory}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}

              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Line type="monotone" dataKey="ביסיק" stroke=" rgb(230, 31, 204)" name="ביסיק" />
                <Line type="monotone" dataKey="ספורט" stroke="rgb(200, 27, 227)" name="ספורט" />
                <Line type="monotone" dataKey=" ספורט אלגנט " stroke="rgb(144, 39, 219)" name=" ספורט אלגנט" />
                <Line type="monotone" dataKey="אלגנט" stroke="rgb(96, 94, 229)" name="  אלגנט" />
                <Line type="monotone" dataKey="11+" stroke="rgb(7, 41, 234)" name="אחר" /> */}
                <Line type="monotone" dataKey="countWear" stroke="rgb(234, 7, 200)" name="כמות לבישות" />

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
  const [tabValue, setTabValue] = useState(0)
  const allItems = useSelector(selectAllItems);
  const [myWardrobe, setMyWardrobe] = useState<Item[]>(allItems);
  const dispatch = useDispatch();
  const [getAllItems] = useGetAllItemsMutation();
  const user: Users = useSelector(selectUser);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const fetchWardrobe = async () => {
    if (myWardrobe.length === 0) {
      try {
        const response = await getAllItems(user._id).unwrap();
        dispatch(setAllItems(response));
        setMyWardrobe(response);
      } catch (err) {
        console.error('שגיאה בקבלת פריטים:', err);
      }
    }
  };

  useEffect(() => {
    fetchWardrobe();
  }, [allItems]);

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
            <CustomPieChart myWardrobe={myWardrobe} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomBarChart myWardrobe={myWardrobe} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomLineChart myWardrobe={myWardrobe} />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box className="single-chart-container">
          <CustomPieChart myWardrobe={myWardrobe} />
        </Box>
      )}

      {tabValue === 2 && (
        <Box className="single-chart-container">
          <CustomBarChart myWardrobe={myWardrobe} />
        </Box>
      )}

      {tabValue === 3 && (
        <Box className="single-chart-container">
          <CustomLineChart myWardrobe={myWardrobe} />
        </Box>
      )}
    </Box>
  )
}

export default Graphs
