
import Item from "../interfaces/Items";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";
import { Card, CardHeader, CardContent, Box } from "@mui/material";

interface CustomPieChartProps {
  myWardrobe: Item[];
}
const CustomPieChart: React.FC<CustomPieChartProps> = ({ myWardrobe }) => {
  

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
export default CustomPieChart;