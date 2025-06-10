import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardHeader, CardContent, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import Item from "../interfaces/Items";

const areaChartData = [
  { month: "ינואר", הוצאות: 500 },
  { month: "פברואר", הוצאות: 700 },
  { month: "מרץ", הוצאות: 400 },
  { month: "אפריל", הוצאות: 1200 },
  { month: "מאי", הוצאות: 800 },
  { month: "יוני", הוצאות: 600 },
]

interface CustomLineChartProps {
  myWardrobe: Item[];
}
const CustomLineChart: React.FC<CustomLineChartProps> = ({ myWardrobe }) => {
    console.log(myWardrobe);
    
  const [chartType, setChartType] = useState<"line" | "area">("line");
  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as "line" | "area")
  }
  const sumByCategory = (items: Item[]) => {
    const map = new Map<string, number>();

    items.forEach(item => {
      const prev = map.get(item.categoryName) || 0;
      map.set(item.categoryName, prev + Number(item.countWear));
    });

   
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
export default CustomLineChart