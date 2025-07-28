const Bet = require("./models/Bet");
const User = require("./models/User");
const Round = require("./models/Round");
const { startGameLoop } = require("./game/engine");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // 🪙 PLACE BET
    socket.on("place_bet", async ({ userId, amount }) => {
      try {
        let user = await User.findOne({ username: userId });

        // If user does not exist, create a new one with default balance
        if (!user) {
          user = await User.create({
            username: userId,
            balance: 1000,
          });
          console.log("🆕 Created new user:", userId);
        }

        if (user.balance >= amount) {
          await User.updateOne({ username: userId }, { $inc: { balance: -amount } });
          await Bet.create({
            userId: user._id, // storing MongoDB ObjectId
            amount,
            isCashedOut: false,
          });
          socket.emit("bet_placed", { success: true });
        } else {
          socket.emit("bet_placed", { success: false, message: "Insufficient funds" });
        }
      } catch (err) {
        console.error("❌ Error placing bet:", err);
        socket.emit("bet_placed", { success: false, message: "Server error" });
      }
    });

    // 💸 CASHOUT
    socket.on("cashout", async ({ userId, multiplier }) => {
      try {
        const user = await User.findOne({ username: userId });
        if (!user) return;

        const bet = await Bet.findOne({ userId: user._id, isCashedOut: false });
        if (bet) {
          const payout = bet.amount * multiplier;
          await User.updateOne({ _id: user._id }, { $inc: { balance: payout } });

          bet.isCashedOut = true;
          bet.multiplier = multiplier;
          await bet.save();

          socket.emit("cashout_success", { amount: payout });
        }
      } catch (err) {
        console.error("❌ Error during cashout:", err);
      }
    });
  });

  startGameLoop(io);
};
