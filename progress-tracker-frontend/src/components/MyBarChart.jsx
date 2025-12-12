import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";
import { useMonthProgress } from "../hooks/useMonthProgress";
import { BsAspectRatio } from "react-icons/bs";

const MyBarChart = () => {
  const { workFields } = useMonthProgress();
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={workFields}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis width={"auto"} />
      <Tooltip />
      <Legend />
      <Bar dataKey={"hours"} fill="#8884d8" />
    </BarChart>
  );
};

export default MyBarChart;
