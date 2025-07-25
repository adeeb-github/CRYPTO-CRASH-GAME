const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected"));

app.use("/api/wallet", require("./routes/WalletRoutes"));
app.use("/api/game", require("./routes/gameRoutes"));
require("./socket")(io);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is running ...",
	});
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
