import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { filteredData } from "../../atoms/chartData";
import { useRecoilValue } from "recoil";
import { selectedBar } from "../../atoms/selectedBar";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

interface LineChartProps {
  title?: string; // Chart title
}

const LineChart: React.FC<LineChartProps> = () => {
  const filtered = useRecoilValue(filteredData);
  const selectedbar = useRecoilValue(selectedBar);

  const data: Record<string, any> = {};
  for (let i = 0; i < filtered.length; i++) {
    data[moment(filtered[i].day).format("Do MMM")] = filtered[i][selectedbar];
  }

  const labels = Object.keys(data);
  const dataPoints = Object.values(data);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: `Time Trend Analysis of ${selectedbar}` || "Time Trend",
        data: dataPoints,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.3,
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        type: "category" as const,
        title: {
          display: true,
          text: "Date --------->",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Units of Time Spent --------->",
        },
      },
    },
    onClick: () => {},
  };

  const handleDoubleClick = () => {
    const chartInstance = ChartJS.getChart("chart")!;
    chartInstance.resetZoom();
  };

  return (
    <div
      style={{ width: "100%", margin: "20px auto" }}
      className="linechart"
      onDoubleClick={handleDoubleClick}
    >
      <Line id="chart" data={lineChartData} options={lineChartOptions as any} />
    </div>
  );
};

export default LineChart;
