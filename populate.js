const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const users = [
  { name: "Alice", balance: 500 },
  { name: "Bob", balance: 1000 },
  { name: "Charlie", balance: 750 },
  { name: "David", balance: 1200 },
  { name: "Eve", balance: 300 }
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await User.deleteMany(); 
    const created = await User.insertMany(users);

    console.log("✅ Inserted Users:", created);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
