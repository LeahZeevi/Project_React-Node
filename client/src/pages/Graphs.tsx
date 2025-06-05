import type React from "react"
import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
} from "@mui/material"
import "../css/Graphs.css"
import { useDispatch, useSelector } from "react-redux"
import { selectAllItems, setAllItems } from "../redux/slices/itemSlice"
import Item from "../interfaces/Items"
import { Users } from "../interfaces/Users"
import { selectUser } from "../redux/slices/userSlice"
import {useGetAllItemsQuery} from "../redux/api/apiSllices/itemsApiSlice"
import CustomLineChart from "../components/CustomLineChart"
import CustomBarChart from "../components/CustomBarChart"
import CustomPieChart from "../components/CustomPieChart"

const Graphs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const allItems = useSelector(selectAllItems);
  const [myWardrobe, setMyWardrobe] = useState<Item[]>(allItems);
  const dispatch = useDispatch();
  const user: Users = useSelector(selectUser);
    const { data } = useGetAllItemsQuery(user._id);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }


    const fetchWardrobe = async () => {
        if (myWardrobe.length === 0) {
            try {
                const items = data ? data : [];
                dispatch(setAllItems(items));
            } catch (err) {
                console.error('שגיאה בקבלת פריטים:', err);
            }
        }
    };

    useEffect(() => {
        fetchWardrobe();
    }, [data]);

  useEffect(() => {
  }, [myWardrobe]);

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
