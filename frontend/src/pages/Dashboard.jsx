import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import { getPortfolio } from "../utils/api";
import PortfolioChart from "../components/PortfolioChart";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!token) return;
      try {
        const response = await getPortfolio(token);
        setPortfolio(response.data);
      } catch (error) {
        console.error("Portfolio fetch failed:", error);
      }
    };
    fetchPortfolio();
  }, [token]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("portfolioUpdated", (updatedData) => {
      if (updatedData && updatedData.assets) { // ✅ Ensure valid data before updating state
        setPortfolio(updatedData);
      }
      console.log("🔄 Live Portfolio Update Received:", updatedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 text-gray-900">
        <h2 className="text-3xl font-bold mb-6">📊 Portfolio Dashboard</h2>

        {portfolio ? (
          <>
            <table className="table-auto bg-white shadow-md rounded-md p-4 w-3/4">
              <thead>
                <tr className="bg-gray-300">
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.assets.map((asset, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{asset.symbol}</td>
                    <td className="px-4 py-2">{asset.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Moved PortfolioChart inside the component */}
            <div className="w-full max-w-4xl mx-auto mt-6">
              <PortfolioChart portfolio={portfolio} />
            </div>
          </>
        ) : (
          <p className="text-red-500">No portfolio data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;