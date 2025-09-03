const Round = require("../models/Round"); // make sure path is correct

let currentMultiplier = 1.0;
let crashPoint = Math.random() * 4 + 1.5; // Random crash multiplier

function getCurrentMultiplier() {
  return currentMultiplier;
}

function startGameLoop(io) {
  setInterval(() => {
    currentMultiplier += 0.01; // smoother increment
    io.emit("multiplier_update", { multiplier: currentMultiplier });

    if (currentMultiplier >= crashPoint) {
      io.emit("crashed", { crashPoint: currentMultiplier });
      Round.create({ crashMultiplier: currentMultiplier }); // save to DB

      // reset for next round
      currentMultiplier = 1.0;
      crashPoint = Math.random() * 4 + 1.5;
    }
  }, 100);
}

module.exports = { startGameLoop, getCurrentMultiplier };
