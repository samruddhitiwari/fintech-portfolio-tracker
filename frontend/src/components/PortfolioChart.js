import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PortfolioChart = ({ portfolio }) => {
  const data = {
    labels: portfolio?.assets.map(asset => asset.symbol),
    datasets: [{
      label: "Investment Amount",
      data: portfolio?.assets.map(asset => asset.amount),
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
    }]
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-bold mb-3">📊 Portfolio Performance</h2>
      {portfolio ? (
        <Line data={data} />
      ) : (
        <p className="text-red-500">No portfolio data available.</p>
      )}
    </div>
  );
};

export default PortfolioChart;