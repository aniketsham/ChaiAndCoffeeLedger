"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DrinkSummaryChartProps {
  labels: string[];
  teaData: number[];
  coffeeData: number[];
}

export default function DrinkSummaryChart({
  labels,
  teaData,
  coffeeData,
}: DrinkSummaryChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Tea",
        data: teaData,
        backgroundColor: "rgba(37, 99, 235, 0.7)",
      },
      {
        label: "Coffee",
        data: coffeeData,
        backgroundColor: "rgba(234, 179, 8, 0.7)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Drink Consumption" },
    },
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <Bar data={data} options={options} />
    </div>
  );
}
