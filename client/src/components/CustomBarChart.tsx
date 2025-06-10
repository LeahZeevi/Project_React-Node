import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Item from "../interfaces/Items";

interface CustomBarChartProps {
  myWardrobe: Item[];
}

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
export default CustomBarChart;