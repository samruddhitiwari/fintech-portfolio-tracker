import { Server } from "socket.io";
import Portfolio from "./models/Portfolio.js"; // ✅ Ensure correct import

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("updatePortfolio", async ({ userId, assets }) => {
    try {
      const portfolio = await Portfolio.findOneAndUpdate(
        { userId },
        { assets },
        { new: true }
      );

      if (portfolio) {
        io.emit("portfolioUpdated", portfolio); // ✅ Broadcast update to all clients
        console.log("✅ Portfolio Updated:", portfolio);
      }
    } catch (error) {
      console.error("❌ Update Error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});